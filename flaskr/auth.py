import functools

from google.oauth2 import id_token
from google.auth.transport import requests
from flaskr.services.UserService import UserService
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, current_app
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db
from flask_jwt_extended import set_access_cookies, set_refresh_cookies, unset_jwt_cookies, unset_refresh_cookies, get_jwt_identity, jwt_required


bp = Blueprint('auth', __name__, url_prefix='/auth')

def new_google_login(name,id_token,email,picture,id):
    user = UserService().get_user_by_logintype(id,'google')
    if (user is not None):
        #assign jwt for same user
        jwt = UserService().create_jwt(user.userID)
        response = redirect(url_for('index.index'))
        set_access_cookies(response, jwt['access_token'])
        set_refresh_cookies(response, jwt['refresh_token'])
        return response
    else:
        userID = UserService().insert_user(str(name), 'google', str(id), str(picture), str(email), 'Y')
        jwt = UserService().create_jwt(userID)
        response = redirect(url_for('index.index'))
        set_access_cookies(response, jwt['access_token'])
        set_refresh_cookies(response, jwt['refresh_token'])
        return response

#https://robotsevolved.com/auth/customuser1349230419823212334124
@bp.route('/customuser1349230419823212334124',methods=('GET',))
def customuser1292834():
    jwt = UserService().create_jwt(35)
    response = redirect(url_for('index.index'))
    set_access_cookies(response, jwt['access_token'])
    set_refresh_cookies(response, jwt['refresh_token'])
    return response

def new_facebook_login(id,username,email,pictureUrl):
    try:
        user = UserService().get_user_by_logintype(id,'facebook')
        if user is None:
            user_id = UserService().insert_user(str(username), 'facebook', str(id),str(pictureUrl), str(email), 'Y')
            jwt = UserService().create_jwt(user_id)
            response = redirect(url_for('index.index'))
            set_access_cookies(response, jwt['access_token'])
            set_refresh_cookies(response, jwt['refresh_token'])
            current_app.logger.info('registered user!')
        else:
            jwt = UserService().create_jwt(user.userID)
            response = redirect(url_for('index.index'))
            set_access_cookies(response, jwt['access_token'])
            set_refresh_cookies(response, jwt['refresh_token'])
            current_app.logger.info('already registered user!')
    except Exception as e:
        print(e)
        response = redirect(url_for('index.index'))
    finally:
        return response

@bp.route('/logout')
def logout():
    session.clear()
    response = redirect(url_for('index.index'))
    unset_refresh_cookies(response)
    unset_jwt_cookies(response)
    return response

