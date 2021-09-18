from flask import Blueprint, jsonify, request
import urllib
from urllib.request import urlopen
import json
from .models import Entry, Game
from app import db

from . import ML

main = Blueprint('main', __name__)




@main.route('/imageMatching', methods=['POST'])
def parse():
    query = request.get_json()['query']
    reference = request.files['reference']
    drawing = request.files['drawing']
    return jsonify({"Similarity": ML.MLModel(reference, drawing)})
