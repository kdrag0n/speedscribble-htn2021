from flask import Blueprint, jsonify, request
import urllib
from urllib.request import urlopen
import json
from .models import Entry, Game
from app import db

main = Blueprint('main', __name__)




@main.route('/imageMatching', methods=['POST'])
def parse():
    query = request.get_json()['query']
    file = request.files['image']

    return jsonify("")