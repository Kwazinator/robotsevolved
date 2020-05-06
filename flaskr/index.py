from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
import json

bp = Blueprint('index', __name__)

def get_games_data(numMoves,Offset):
    gameslist = GameService().get_all_games(numMoves, Offset)  # get_all_games(numGames,offset)
    highscoreslist = list()
    if gameslist is not None:
        for game in gameslist:
            highscoreslist.append(GameService().get_highscores(game['uri']))
    return (gameslist,highscoreslist)



@bp.route('/')
def index():
    get_games_data_value = get_games_data(30,0)
    return render_template('index.html',gamedata=json.dumps({'uri': ''}), highscores='[]', highscoreslist=json.dumps(get_games_data_value[1]), uri='',gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/about')
def about():
    return 'yolo'

@bp.route('/play/<uri>')
def play(uri):
    data = json.dumps(GameService().get_game_uri(uri))
    highscores = json.dumps(GameService().get_highscores(uri))
    get_games_data_value = get_games_data(30,0)
    return render_template('index.html',gamedata=data, highscores=highscores,highscoreslist=json.dumps(get_games_data_value[1]), uri=uri, gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/submitpuzzle', methods=('GET','POST'))
def submitpuzzle():
    data = request.get_json()
    if (GameService().check_same_game(json.dumps(data['puzzledata'])) == 1):
        uri = GameService().insert_game(data['name'], 'type', 'description', 1, 'test', 1,json.dumps(data['puzzledata']))
        return jsonify(uri=uri)
    else:
        return jsonify(uri='thisdidnotworkforsomereason')

@bp.route('/submithighscore', methods=('GET','POST'))
def submithighscore():
    data = request.get_json()
    GameService().insert_highscore(data['name'],'test','test','test',data['highscore'],data['uri'])
    return 'OK'