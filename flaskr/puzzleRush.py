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
    data = request.get_json()
    difficulty = data['difficulty']
    action = data['action']
    type = data['type']
    user_id = get_jwt_identity()
    if action == 'start':
        data = PuzzleRushService().start_puzzle(user_id,difficulty,type)
        games = data[0]
        p_id = data[1]
        return jsonify(games=json.dumps(games),p_id=p_id)



@bp.route('/puzzlerushgetmore',methods=('GET','POST'))
@jwt_optional
def puzzlerushgetmore():
    p_id = request.args['p_id']
    pr_entity = PuzzleRushService().get_puzzle_rush(p_id)
    user_id = get_jwt_identity()
    games = PuzzleRushService().get_games_for_puzzle_rush(p_id,4,pr_entity.difficulty,pr_entity.type)
    return jsonify(games=json.dumps(games))

'''@bp.route('/finishpuzzlerush',methods=('GET','POST'))
@jwt_optional
def puzzlerush():
    p_id = request.args['p_id']
    PuzzleRushService().get_puzzle_rush_data(p_id)
    
    user_id = get_jwt_identity()
    if action == 'start':
        data = PuzzleRushService().start_puzzle(user_id,difficulty)
        games = data[0]
        p_id = data[1]
        return jsonify(games=json.dumps(games),p_id=p_id)'''

@bp.route('/puzzlerushsubmit', methods=('GET','POST'))
@jwt_optional
def puzzlerushsubmit():
    data = request.get_json()
    p_id = data['p_id']
    gameid = data['g_id']
    solution = data['moveHistory']
    PuzzleRushService().submit_solution_rush(p_id,gameid,solution)
    return jsonify(result='okay')

@bp.route('/puzzlerushend', methods=('GET','POST'))
@jwt_optional
def puzzlerushend():
    data = request.get_json()
    p_id = data['p_id']
    totalMoves = data['totalMoves']
    differenceFrom = data['differenceFrom']
    PuzzleRushService().end_puzzle_rush_game(p_id,totalMoves,differenceFrom)
    return jsonify(result='okay')