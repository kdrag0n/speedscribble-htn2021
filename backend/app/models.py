from . import db

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    positions = db.Column(db.String(500))
    board = db.Column(db.String(500))
    nextSteps = db.Column(db.String(50))
    turn = db.Column(db.String(10))

class Game(db.Model):
    __bind_key__ = 'games'
    link = db.Column(db.String(100), primary_key=True)
