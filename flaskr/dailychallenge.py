from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional, get_raw_jwt
import json

bp = Blueprint('dailychallenge', __name__)

@bp.route('/dailychallenge',methods=('GET','POST'))
@jwt_optional
def daily_challenge():
    data = request.get_json()
    userID = get_jwt_identity()
    if (userID is not None):
        value = GeneratorService().insert_daily_challenge_submit(data['score'], userID, json.dumps(data['solutiondata']), data['name'],
                                                         data['dc_id'])
    else:
        value = GeneratorService().insert_daily_challenge_submit(data['score'], 1, json.dumps(data['solutiondata']), data['name'],
                                                         data['dc_id'])
    return value

@bp.route('/dailychallengehighscores',methods=('GET','POST'))
@jwt_optional
def daily_challenge_highscores():
    dc_id = request.args['dc_id']
    highscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    return jsonify(highscores=highscores)