import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import os
import pandas as pd
import matplotlib.pyplot as plt 
import base64
from PIL import Image
import io
import math 
from math import sqrt
import urllib
import cv2

np.random.seed(1337)

m = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4", output_shape=[1280],
                   trainable=False),  # Can be True, see below.
    tf.keras.layers.Dense(100, activation='softmax')
])
m.build([None, 224, 224, 3])  # Batch input shape.

def MLModel(reference, drawing):
    #OPENCV Edge detection

    edges = cv2.Canny(reference, 90, 100)
    reference = cv2.bitwise_not(edges)

    edges = cv2.Canny(drawing, 90, 100)
    drawing = cv2.bitwise_not(edges)

    helper = TensorVector(reference)
    vector = helper.process()
    helper = TensorVector(drawing)
    vector2 = helper.process()

    print(vector)
    print(vector2)
    return cosineSim(vector, vector2)


def convertBase64(FileName):
    """
    Return the Numpy array for a image 
    """
    with open(FileName, "rb") as f:
        data = f.read()
        
    res = base64.b64encode(data)
    
    base64data = res.decode("UTF-8")
    
    imgdata = base64.b64decode(base64data)
    
    image = Image.open(io.BytesIO(imgdata))
    
    return np.array(image)

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

