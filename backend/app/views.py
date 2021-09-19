from flask import Blueprint, jsonify, request
import urllib
from urllib.request import urlopen
import json
from .models import Entry, Game
from app import db
import numpy as np
import cv2

from . import ML

main = Blueprint('main', __name__)

@main.route('/api/v1/get_similarity', methods=['POST'])
def parse():
    query = request.get_json()['query']
    reference = np.fromstring(request.files['reference'])
    drawing = np.fromstring(request.files['drawing'])

    reference = cv2.imdecode(reference, cv2.IMREAD_COLOR)
    drawing = cv2.imdecode(drawing, cv2.IMREAD_COLOR)
    reference = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)
    drawing = cv2.cvtColor(drawing, cv2.COLOR_BGR2GRAY)


    return jsonify({"Similarity": ML.MLModel(reference, drawing)})
