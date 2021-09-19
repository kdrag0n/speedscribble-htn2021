import platform
from pathlib import Path
import logging

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'cockroachdb://root@localhost:26257/htndraw'
    if platform.node() == 'htn21':
        app.config['FRONTEND_BASE_URL'] = 'https://speedscribble.tech'
        app.config['API_BASE_URL'] = 'https://api.speedscribble.tech'
    else:
        app.config['FRONTEND_BASE_URL'] = 'http://localhost:3000'
        #app.config['API_BASE_URL'] = 'http://localhost:5000'
        app.config['API_BASE_URL'] = 'https://billy-moscow-empirical-particularly.trycloudflare.com'
    app.config['IMAGES_DIR'] = f'{Path().absolute()}/images'

    db.init_app(app)

    from .views import main
    app.register_blueprint(main)
    db.create_all(app=app)

    return app
