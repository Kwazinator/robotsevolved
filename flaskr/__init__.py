
import os
from flask import Flask, request, jsonify, url_for, redirect, flash, session, current_app

def create_app(test_config=None):

    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=b'\x80\xfc):r\xd6\x86\x1bp\x14\xc1\x9ezo\x05M',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    app.config['PROPAGATE_EXCEPTIONS'] = True
    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    from . import db
    db.init_app(app)



    from . import index
    app.register_blueprint(index.bp)

    return app
