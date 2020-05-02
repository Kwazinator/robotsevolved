from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
import json

bp = Blueprint('index', __name__)

@bp.route('/')
def index():
    return render_template('index.html',gamedata=json.dumps({'uri': ''}), highscores='[]',uri='')

@bp.route('/about')
def about():
    return 'yolo'

@bp.route('/play/<uri>')
def play(uri):
    data = json.dumps(GameService().get_game_uri(uri))
    highscores = json.dumps(GameService().get_highscores(uri))
    return render_template('index.html',gamedata=data, highscores=highscores,uri=uri)

@bp.route('/submitpuzzle', methods=('GET','POST'))
def submitpuzzle():
    data = request.get_json()
    print(data)
    if (GameService().check_same_game(json.dumps(data['puzzledata'])) == 1):
        uri = GameService().insert_game(data['name'], 'type', 'description', 1, 'test', 1,json.dumps(data['puzzledata']))
        return jsonify(uri=uri)
    else:
        return jsonify(uri='thisdidnotworkforsomereason')

@bp.route('/submithighscore', methods=('GET','POST'))
def submithighscore():
    data = request.get_json()
    print(data)
    GameService().insert_highscore(data['name'],'test','test','test',data['highscore'],data['uri'])
    return 'OK'