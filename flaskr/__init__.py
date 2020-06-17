
import os
from flask import Flask, request, jsonify, url_for, redirect, flash, session, current_app
from flask_jwt_extended import JWTManager
from flask_dance.consumer import oauth_authorized
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.spotify import make_spotify_blueprint, spotify
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_jwt_extended import set_access_cookies, set_refresh_cookies, unset_jwt_cookies, unset_refresh_cookies, get_jwt_identity, jwt_required
import json



def create_app(test_config=None):

    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    with open("credentials/JWTSecretKeys.txt", 'r') as f:
        data = f.read()
    app.config.from_mapping(
        SECRET_KEY=data,
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config['JWT_COOKIE_SECURE'] = False
    app.config['JWT_SESSION_COOKIE'] = False
    jwt_manager = JWTManager(app)

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

    '''facebook_bp = make_facebook_blueprint(
        client_id = '',
        client_secret = '',
        #redirect_url = ''
        scope='email'
    )
    app.register_blueprint(facebook_bp,url_prefix='/login')
'''
    with open("credentials/GoogleAPIkeys.txt", 'r') as f:
        data = f.read()
    info = data.splitlines()
    google_bp = make_google_blueprint(
        client_id=info[0],
        client_secret=info[1],
        scope=["https://www.googleapis.com/auth/userinfo.email", "openid", "https://www.googleapis.com/auth/userinfo.profile"],
    )
    app.register_blueprint(google_bp, url_prefix='/login')
    # ensure the instance folder exists
    ''' 
    @oauth_authorized.connect_via(facebook_bp)
    def facebook_logged_in(blueprint, token):
        if facebook.authorized:
            fb=facebook.get('me?fields=id,email,name,picture').json()
            return auth.new_facebook_login(fb['id'], fb['name'], fb['email'], fb['picture']['data']['url'])
    '''
    from . import auth
    app.register_blueprint(auth.bp)

    @oauth_authorized.connect_via(google_bp)
    def logged_in(blueprint, token):
        resp_json = google.get("/oauth2/v2/userinfo").json()
        return auth.new_google_login(resp_json["name"], token["id_token"], resp_json["email"], resp_json['picture'], resp_json['id'])


    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    from . import db
    db.init_app(app)



    from . import index
    app.register_blueprint(index.bp)

    from . import puzzleRush
    app.register_blueprint(puzzleRush.bp)

    @jwt_manager.expired_token_loader
    def my_expired_token_callback():
        current_app.logger.warning('expired_loader activated with JWT token\n')
        if 'access_token_cookie' in request.cookies or 'refresh_token_cookie' in request.cookies:
            flash("Access Token has expired")
        if len(request.url) >= 16 and ('invite' in request.url or 'submit' in request.url):
            index = request.url.find('potm.rocks')
            link = request.url[index + 11:]
            session['url_saved'] = link
        if 'AJAX' in request.headers:
            current_app.logger.warning('AJAX called in expired')
            session.clear()
            response = redirect(url_for('index.index'))
            unset_refresh_cookies(response)
            unset_jwt_cookies(response)
            return response
        session.clear()
        response = redirect(url_for('index.index'))
        unset_refresh_cookies(response)
        unset_jwt_cookies(response)
        return response

    @jwt_manager.invalid_token_loader
    def my_invalid_token_callback(msg):
        current_app.logger.warning('invalid_loader activated with JWT token\n')
        if 'access_token_cookie' in request.cookies or 'refresh_token_cookie' in request.cookies:
            flash("Access Token is invalid")
        if len(request.url) >= 16 and ('invite' in request.url or 'submit' in request.url):
            index = request.url.find('potm.rocks')
            link = request.url[index + 11:]
            session['url_saved'] = link
        if 'AJAX' in request.headers:
            current_app.logger.warning('AJAX called in invalid')
            return jsonify(redirect=url_for('index.index')), 200
        session.clear()
        response = redirect(url_for('index.index'))
        unset_refresh_cookies(response)
        unset_jwt_cookies(response)
        return redirect(url_for('index.index'), 302)

    @jwt_manager.unauthorized_loader
    def my_unauthorized_callback(msg):
        current_app.logger.warning('unauthorized_loader activated with JWT token\n')
        if 'access_token_cookie' in request.cookies or 'refresh_token_cookie' in request.cookies:
            flash("Unauthorized")
        if len(request.url) >= 16 and ('invite' in request.url or 'submit' in request.url):
            index = request.url.find('potm.rocks')
            link = request.url[index + 11:]
            session['url_saved'] = link
        if 'AJAX' in request.headers:
            current_app.logger.warning('AJAX called in unauthorized')
            return jsonify(redirect=url_for('index.index')), 200
        session.clear()
        response = redirect(url_for('index.index'))
        unset_refresh_cookies(response)
        unset_jwt_cookies(response)
        return redirect(url_for('index.index'), 302)

    return app
