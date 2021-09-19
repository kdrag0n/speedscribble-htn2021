import base64
import io
import math
import os
import urllib
from math import sqrt

import cv2
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image

np.random.seed(1337)

m = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4", output_shape=[1280],
                   trainable=False),  # Can be True, see below.
    tf.keras.layers.Dense(100, activation='softmax')
])
m.build([None, 224, 224, 3])  # Batch input shape.

def buf_to_image(buf):
    return cv2.imdecode(np.frombuffer(buf, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)

def evaluate_similarity(reference, drawing):
    #OPENCV Edge detection

    reference = buf_to_image(reference)
    edges = cv2.Canny(reference, 90, 100)
    reference = cv2.bitwise_not(edges)

    drawing = buf_to_image(drawing)
    edges = cv2.Canny(drawing, 90, 100)
    drawing = cv2.bitwise_not(edges)

    helper = TensorVector(reference)
    vector = helper.process()
    helper = TensorVector(drawing)
    vector2 = helper.process()

    print(vector)
    print(vector2)
    return cosineSim(vector, vector2)

class TensorVector(object):

    def __init__(self, file=None):
        self.file = file

    def process(self):
        img = tf.convert_to_tensor(self.file, dtype=tf.float32)
        img = tf.io.decode_jpeg(img)
        img = tf.image.resize_with_pad(img, 224, 224)
        img = tf.image.convert_image_dtype(img,tf.float32)[tf.newaxis, ...]
        features = m(img)
        feature_set = np.squeeze(features)
        return list(feature_set)
    
def cosineSim(a1,a2):
    sum = 0
    suma1 = 0
    sumb1 = 0
    for i,j in zip(a1, a2):
        suma1 += i * i
        sumb1 += j*j
        sum += i*j
    cosine_sim = sum / ((sqrt(suma1))*(sqrt(sumb1)))
    return cosine_sim

