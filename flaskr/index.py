from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
from flaskr.services.UserService import UserService
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional, get_raw_jwt

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
@jwt_optional
def index():
    get_games_data_value = get_games_data(30,121)
    userID = get_jwt_identity()
    user = None
    loggedin = 'No'
    if (userID is not None):
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
    return render_template('index.html',loggedin=loggedin, user=json.dumps(user), gamedata=json.dumps({'uri': ''}), highscores='[]', highscoreslist=json.dumps(get_games_data_value[1]), uri='',gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/about')
def about():
    return 'yolo'


@bp.route('/play/<uri>')
@jwt_optional
def play(uri):
    data = json.dumps(GameService().get_game_uri(uri))
    highscores = json.dumps(GameService().get_highscores(uri))
    get_games_data_value = get_games_data(30,112)
    userID = get_jwt_identity()
    user = None
    loggedin = 'No'
    if (userID is not None):
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
    return render_template('index.html',loggedin=loggedin, user=json.dumps(user), gamedata=data, highscores=highscores,highscoreslist=json.dumps(get_games_data_value[1]), uri=uri, gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/submitpuzzle', methods=('GET','POST'))
def submitpuzzle():
    data = request.get_json()
    if (GameService().check_same_game(json.dumps(data['puzzledata'])) == 1):
        uri = GameService().insert_game(data['name'], 'type', 'description', 1, 'test', 1,json.dumps(data['puzzledata']))
        return jsonify(uri=uri)
    else:
        return jsonify(uri='GameAlreadyExists')

@bp.route('/updatehighscores', methods=('GET','POST'))
def updatehighscores():
    uri = request.args['uri']
    highscores = json.dumps(GameService().get_highscores(uri))
    return jsonify(highscores=highscores)

@bp.route('/submithighscore', methods=('GET','POST'))
def submithighscore():
    data = request.get_json()
    rtnMessage = GameService().insert_highscore(data['name'],'test','test','test',data['highscore'],data['uri'])
    return rtnMessage

@bp.route('/userCreate', methods={'GET', 'POST'})
def userCreate():
    data = request.get_json()
    print(data)
    UserService().insert_user(data['userId'], data['logintype'], data['accountId'], data['profilePicture'], data['email'])
    return 'OK'

@bp.route('/userDelete', methods={'GET', 'POST'})
def userDelete():
    data = request.get_json()
    print(data)
    UserService().delete_user(data['userID'])
    return 'OK'

@bp.route('/search', methods=('GET','POST'))
def search():
    data = request.get_json()
    print(json.dumps(data,indent=4))
    #
    #fill a list of Solution objects and return the List. Currently just returning current games, so it wont work.
    #
    #Could modify method get_games_data to also take a search term and run a new query, OR create a new method that uses
    #a search term like get_games_search_term(numGames,offset,searchterm)
    get_games_data_value = get_games_data(30,112)
    return jsonify(highscoreslist=json.dumps(get_games_data_value[1]),gameslist=json.dumps(get_games_data_value[0]))


@bp.route('/databasedownload', methods=('GET',))
@jwt_required
def databasedownload():
    if (get_jwt_identity() == 1 or get_jwt_identity() == 2):
        return send_file('../instance/flaskr.sqlite')
    else:
        return 404