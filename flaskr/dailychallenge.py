from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flaskr.services.WeeklyChallengeService import WeeklyChallengeService
from flaskr.services.UserService import UserService
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
import json
import flaskr.auth as auth
import re
import datetime

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
@jwt_required(optional=True)
def daily_challenge():
    data = request.get_json()
    userID = get_jwt_identity()
    if (userID is None):
        return auth.anon_user_login()
    user = UserService().get_user(get_jwt_identity()).serialize()
    if (user['logintype'] != 'anon'):
        value = GeneratorService().insert_daily_challenge_submit(data['score'], userID, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dc_id'], json.dumps(data['playerStateList']))
    else:
        UserService().change_name(userID, trimstring(data['name']))
        value = GeneratorService().insert_daily_challenge_submit(data['score'], userID, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dc_id'], json.dumps(data['playerStateList']))
    return value


@bp.route('/dailyevolution',methods=('GET','POST'))
@jwt_required(optional=True)
def daily_evolution():
    data = request.get_json()
    userID = get_jwt_identity()
    if (userID is None):
        return auth.anon_user_login()
    user = UserService().get_user(get_jwt_identity()).serialize()
    if (user['logintype'] != 'anon'):
        value = GeneratorService().insert_daily_evolution_submit(data['score'], userID, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dce_id'], json.dumps(data['playerStateList']))
    else:
        UserService().change_name(userID, trimstring(data['name']))
        value = GeneratorService().insert_daily_evolution_submit(data['score'], userID, json.dumps(data['solutiondata']), trimstring(data['name']),
                                                         data['dce_id'], json.dumps(data['playerStateList']))
    return value

@bp.route('/dailychallengehighscores',methods=('GET','POST'))
@jwt_required(optional=True)
def daily_challenge_highscores():
    dc_id = request.args['dc_id']
    highscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    dc_id = GeneratorService().get_daily_challenge_id()
    return jsonify(dc_id=dc_id, highscores=highscores)

@bp.route('/dailyevolutionhighscores',methods=('GET','POST'))
@jwt_required(optional=True)
def daily_evolution_highscores():
    dce_id = request.args['dce_id']
    highscores = json.dumps(GeneratorService().get_daily_evolution_highscores(dce_id))
    dce_id = GeneratorService().get_daily_evolution_id()
    print(dce_id)
    print(highscores)
    return jsonify(dce_id=dce_id, highscores=highscores)


@bp.route('/getDailyChallengeData',methods=('GET','POST'))
@jwt_required(optional=True)
def get_daily_challenge_data():
    userID = get_jwt_identity()
    dc_id = GeneratorService().get_daily_challenge_id()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_movesList = None
    dc_playerList = None
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))

    isStarted = UserService().is_daily_started(userID, dc_id)
    if not isStarted:
        UserService().start_daily(userID, dc_id)
        daily_start_timer_seconds = 2
        daily_start_timer_minutes = 0
    else:
        daily_start_timer = UserService().get_daily_time(userID, dc_id)
        total_seconds = daily_start_timer.seconds
        daily_start_timer_minutes = total_seconds//60
        daily_start_timer_seconds = total_seconds%60
    if (userID is not None):
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]
    return jsonify(dc_playerList=dc_playerList,dc_movesList=dc_movesList, dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist, daily_start_timer_minutes=daily_start_timer_minutes, daily_start_timer_seconds=daily_start_timer_seconds)

@bp.route('/weeklychallengehighscores',methods=('GET','POST'))
@jwt_required(optional=True)
def get_wc_highscores():
    wc_id = request.args['wc_id']
    highscores = json.dumps(WeeklyChallengeService().get_wc_highscores(wc_id))
    wc_id = WeeklyChallengeService().get_wc_id()
    return jsonify(wc_id=wc_id, highscores=highscores)

@bp.route('/getWCData',methods=('GET','POST'))
@jwt_required(optional=True)
def get_wc_data():
    userID = get_jwt_identity()
    wc_id = WeeklyChallengeService().get_wc_id()
    wclist = json.dumps(WeeklyChallengeService().get_wc_puzzles(wc_id))
    wc_movesList = None
    wc_playerList = None
    wc_gamesWon = None
    data = WeeklyChallengeService().get_wc_highscores(wc_id)
    wchighscores = json.dumps(data)
    if (userID is not None):
        wc_moves = WeeklyChallengeService().get_wc_moves(wc_id,userID)
        if wc_moves is not None:
            wc_movesList = wc_moves[0]
            wc_playerList = wc_moves[1]
            wc_gamesWon = wc_moves[2]
    return jsonify(wc_playerList=wc_playerList,wc_movesList=wc_movesList, wchighscores=wchighscores,wc_id=wc_id,weeklyChallengeGameslist=wclist,wc_gamesWon=wc_gamesWon)

@bp.route('/weeklychallengesubmit',methods=('POST','GET'))
@jwt_required()
def weekly_challenge_submit():
    userID = get_jwt_identity()
    wc_id = WeeklyChallengeService().get_wc_id()
    data = request.get_json()
    try:
        display = data['display']
    except Exception as e:
        display = None
    finally:
        pass
    try:
        name = data['name']
    except Exception as e:
        name = None
    finally:
        pass
    WeeklyChallengeService().submit_answer(data['score'],userID, json.dumps(data['solutiondata']), name, wc_id,json.dumps(data['playerStateList']),data['completed'],display,json.dumps(data['gamesWon']))
    return 'OK'

@bp.route('/getDailyEvolutionData',methods=('POST','GET'))
@jwt_required(optional=True)
def get_dce_data():
    userID = get_jwt_identity()
    dce_id = GeneratorService().get_daily_evolution_id()
    dailyevolutionlist = json.dumps(GeneratorService().get_daily_evolution_puzzles())
    dce_movesList = None
    dce_playerList = None
    dcehighscores = json.dumps(GeneratorService().get_daily_evolution_highscores(dce_id))

    isStarted = UserService().is_daily_evolution_started(userID, dce_id)
    if not isStarted:
        UserService().start_evolution(userID, dce_id)
        evolution_start_timer_seconds = 2
        evolution_start_timer_minutes = 0
    else:
        evolution_start_timer = UserService().get_daily_evolution_time(userID, dce_id)
        total_seconds = evolution_start_timer.seconds
        evolution_start_timer_minutes = total_seconds // 60
        evolution_start_timer_seconds = total_seconds % 60
    if (userID is not None):
        dce_moves = GeneratorService().get_daily_evolution_moves(dce_id, userID)
        if dce_moves is not None:
            dce_movesList = dce_moves[0]
            dce_playerList = dce_moves[1]
    return jsonify(dce_playerList=dce_playerList, dce_movesList=dce_movesList, dcehighscores=dcehighscores, dce_id=dce_id,
                   dailyEvolutionGameslist=dailyevolutionlist, daily_start_timer_minutes=evolution_start_timer_minutes,
                   daily_start_timer_seconds=evolution_start_timer_seconds)
