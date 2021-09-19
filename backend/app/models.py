from . import db


class Game(db.Model):
    id = db.Column(db.Text, primary_key=True, nullable=False)
    reference_image = db.Column(db.Text, nullable=False)
    time_limit = db.Column(db.Integer, nullable=False)
    started = db.Column(db.Boolean, nullable=False, default=False)
    started_at = db.Column(db.DateTime)
    winner_player_id = db.Column(db.Text)
    finished = db.Column(db.Boolean, nullable=False, default=False)
    next_game_id = db.Column(db.Text, nullable=False)

class Player(db.Model):
    id = db.Column(db.Text, primary_key=True, nullable=False)
    game_id = db.Column(db.Text, nullable=False)
    online = db.Column(db.Boolean, nullable=False)

class Drawing(db.Model):
    id = db.Column(db.Text, primary_key=True, nullable=False)
    game_id = db.Column(db.Text, nullable=False)
    player_id = db.Column(db.Text, nullable=False)
    image = db.Column(db.LargeBinary, nullable=False)
    similarity = db.Column(db.Float, nullable=False)
