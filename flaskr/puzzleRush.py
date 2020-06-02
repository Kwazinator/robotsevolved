from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional, get_raw_jwt
import json

bp = Blueprint('puzzleRush', __name__)

@bp.route('/puzzlerush',methods=('GET','POST'))
@jwt_optional
def puzzlerush():
    print('here')
    data = request.get_json()
    print(data)
    difficulty = data['difficulty']
    action = data['action']
    user_id = get_jwt_identity()
    print(user_id)
    if action == 'start':
        print('here23232323')
        data = PuzzleRushService().start_puzzle(user_id,difficulty)
        games = data[0]
        p_id = data[1]
        return jsonify(games=json.dumps(games),p_id=p_id)