
import os
from flask import Flask
import json



def create_app(test_config=None):

    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    with open("credentials/DatabaseConnectionString.txt", 'r') as f:
        data = f.read()
    data = json.loads(data)


    app.config['MYSQL_USER'] = data['DB_USERNAME']
    app.config['MYSQL_PASSWORD'] = data['DB_PASSWORD']
    app.config['MYSQL_HOST'] = data['DB_HOST']
    app.config['MYSQL_DB'] = data['DB_NAME']


    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    from . import db
    db.init_app(app)

    return app