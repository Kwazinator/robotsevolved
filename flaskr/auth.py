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
    print(name)
    print(id_token)
    print(email)
    print(picture)
    print(id)
    return

