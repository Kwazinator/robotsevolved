from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional, get_raw_jwt
import json
import re

bp = Blueprint('dailychallenge', __name__)



def deEmojify(text):
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text)

def trimstring(stringtotrim):
    if len(stringtotrim) > 32:
        stringtotrim = stringtotrim[:32]
    return deEmojify(stringtotrim).rstrip()

@bp.route('/dailychallenge',methods=('GET','POST'))
@jwt_optional
def daily_challenge():
    data = request.get_json()
    userID = get_jwt_identity()
    if (userID is not None):
        value = GeneratorService().insert_daily_challenge_submit(data['score'], userID, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dc_id'], json.dumps(data['playerStateList']))
    else:
        value = GeneratorService().insert_daily_challenge_submit(data['score'], 1, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dc_id'], json.dumps(data['playerStateList']))
    return value

@bp.route('/dailychallengehighscores',methods=('GET','POST'))
@jwt_optional
def daily_challenge_highscores():
    dc_id = request.args['dc_id']
    highscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    dc_id = GeneratorService().get_daily_challenge_id()
    return jsonify(dc_id=dc_id, highscores=highscores)


@bp.route('/getDailyChallengeData',methods=('GET','POST'))
@jwt_optional
def get_daily_challenge_data():
    userID = get_jwt_identity()
    dc_id = GeneratorService().get_daily_challenge_id()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_movesList = None
    dc_playerList = None
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    if (userID is not None):
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]
    return jsonify(dc_playerList=dc_playerList,dc_movesList=dc_movesList, dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist)