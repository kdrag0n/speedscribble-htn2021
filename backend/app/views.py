import io
import os
import random
import time
import uuid
from datetime import datetime

from flask import (Blueprint, abort, current_app, jsonify, request, safe_join,
                   send_file, send_from_directory)
from gcloud import storage

from app import db

from . import ml
from .models import *

main = Blueprint('main', __name__)

images = os.listdir('images')

GCS_BUCKET = 'speedscribble-htn'
client = storage.Client(project='htn21-326500')
bucket = client.get_bucket('speedscribble-htn')

@main.after_request
def set_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@main.route('/assets/reference_images/<path>')
def get_reference_image(path):
    return send_from_directory(current_app.config['IMAGES_DIR'], path)

@main.route('/assets/drawing_images/<path>')
def get_drawing_image(path):
    drawing_id = path.replace('.png', '')
    drawing = Drawing.query.filter_by(id=drawing_id).first()
    if not drawing:
        abort(404)

    return send_file(
        io.BytesIO(drawing.image),
        mimetype='image/png',
        attachment_filename='drawing.png',
    )

@main.route('/api/v1/create_game', methods=['POST'])
def create_game():
    game_id = request.args.get('id')
    if not game_id:
        game_id = str(uuid.uuid4())

    # Ignore duplicate create request
    if Game.query.filter_by(id=game_id).first() is None:
        reference = random.choice(images)
        game = Game(
            id=game_id,
            reference_image=reference,
            time_limit=30,
            next_game_id=str(uuid.uuid4()),
        )
        db.session.add(game)
        db.session.commit()

    return jsonify({
        'url': f'{current_app.config["FRONTEND_BASE_URL"]}/play/{game_id}'
    })

@main.route('/api/v1/game/<game_id>/info', methods=['GET'])
def get_game_info(game_id):
    game = Game.query.filter_by(id=game_id).first()
    if not game:
        abort(404)
    players = Player.query.filter_by(game_id=game_id).all()
    drawings = Drawing.query.filter_by(game_id=game_id).all()

    assets_base = f'{current_app.config["API_BASE_URL"]}/assets'
    return jsonify({
        'time_limit': game.time_limit,
        'reference_image_url': f'{assets_base}/reference_images/{game.reference_image}',
        'next_game_id': game.next_game_id,

        'players': len(players),
        'started': game.started,
        'started_at': game.started_at,
        'finished': game.finished,

        'winner': game.winner_player_id,
        'drawings': {
            drawing.player_id: {
                'url': f'https://{GCS_BUCKET}.storage.googleapis.com/{drawing.id}.png',
                'similarity': drawing.similarity,
            }
            for drawing in drawings
        },
    })

@main.route('/api/v1/game/<game_id>/new_player', methods=['POST'])
def new_player(game_id):
    game = Game.query.filter_by(id=game_id).first()
    if not game:
        abort(404)
    if game.started or game.finished:
        abort(400)

    player_id = str(uuid.uuid4())
    player = Player(id=player_id, game_id=game_id, online=True)
    db.session.add(player)
    db.session.commit()

    return jsonify({
        'id': player_id,
    })

@main.route('/api/v1/game/<game_id>/start', methods=['POST'])
def start_game(game_id):
    game = Game.query.filter_by(id=game_id).first()
    if not game:
        abort(404)
    players = Player.query.filter_by(game_id=game_id).all()
    if len(players) < 2:
        abort(400)
    if game.started:
        return jsonify({})

    game.started = True
    game.started_at = datetime.now()
    db.session.commit()

    return jsonify({})

@main.route('/api/v1/game/<game_id>/submit_drawing', methods=['POST', 'OPTIONS'])
def submit_drawing(game_id):
    if request.method == 'OPTIONS':
        return jsonify({})

    player_id = request.args.get('player')
    image = request.get_data(cache=False)
    game = Game.query.filter_by(id=game_id).first()
    if not game:
        abort(404)
    if game.finished or not game.started:
        abort(400)

    # Block submissions 10 sec after game finish
    #if (datetime.now() - game.started_at).seconds() >= 10:
    #    abort(400)

    # Read reference
    with open(safe_join('images', game.reference_image), 'rb') as f:
        reference = f.read()

    # ML
    similarity = ml.evaluate_similarity(reference, image)

    # Upload to GCS
    drawing_id = str(uuid.uuid4())
    blob = bucket.blob(f'{drawing_id}.png')
    blob.upload_from_file(io.BytesIO(image), size=len(image))

    drawing = Drawing(id=drawing_id, game_id=game_id, player_id=player_id, similarity=similarity)
    db.session.add(drawing)

    # Not the first submission = game finished
    all_drawings = set(Drawing.query.filter_by(game_id=game_id).all() + [drawing])
    if len(all_drawings) >= 2:
        winner = max(all_drawings, key=lambda d: d.similarity)
        game.winner_player_id = winner.player_id
        game.finished = True

    db.session.commit()

    return jsonify({
        'id': drawing_id,
    })
