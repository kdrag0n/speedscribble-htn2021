from pathlib import Path

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dragon@localhost:5432/htndraw'

    app.config['SQLALCHEMY_DATABASE_URI'] = 'cockroachdb://root@localhost:26257/htndraw'
    app.config['FRONTEND_BASE_URL'] = 'http://localhost:3000'
    #app.config['API_BASE_URL'] = 'http://localhost:5000'
    app.config['API_BASE_URL'] = 'https://billy-moscow-empirical-particularly.trycloudflare.com'
    app.config['IMAGES_DIR'] = f'{Path().absolute()}/images'

    db.init_app(app)

    from .views import main
    app.register_blueprint(main)
    db.create_all(app=app)

    return app
