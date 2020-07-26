from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
from flaskr.services.UserService import UserService
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
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


def get_games_search(numPuzzles,Offset,searchterm):
    gameslist = GameService().get_games_by_search(numPuzzles,Offset,searchterm)
    highscoreslist = list()
    if gameslist is not None:
        for game in gameslist:
            highscoreslist.append(GameService().get_highscores(game['uri']))
    return (gameslist,highscoreslist)


def get_learned_games():
    gameslist = [13,12,31,24,13,25,11,13,14,15,32,26]
    returnlist = list()
    for game in gameslist:
        returnlist.append(GameService().get_game(game).serialize())
    return json.dumps(returnlist)



@bp.route('/')
@jwt_optional
def index():
    get_games_data_value = get_games_data(50,0)
    userID = get_jwt_identity()
    user = None
    dc_movesList = None
    dc_playerList = None
    loggedin = 'No'
    learngameslist = get_learned_games()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_id = GeneratorService().get_daily_challenge_id()
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    metatagcontent = "Competetive board game Insipred by Ricochet Robots"
    urlformeta = "http://robotsevolved.com"
    if (userID is not None):
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]
    return render_template('index.html',urlformeta=urlformeta,metatagcontent=metatagcontent,dc_playerList=dc_playerList,dc_movesList=dc_movesList,dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist,learngameslist=learngameslist, loggedin=loggedin, user=json.dumps(user), gamedata=json.dumps({'uri': ''}), highscores='[]', uri='')

@bp.route('/about')
def about():
    return 'yolo'

@bp.route('/getFindGames')
def getFindGames():
    get_games_data_value = get_games_data(50, 0)
    return jsonify(gameslist=json.dumps(get_games_data_value[0]), highscoreslist=json.dumps(get_games_data_value[1]))


@bp.route('/getProfileData')
@jwt_required
def getProfileData():
    userID = get_jwt_identity()
    gamesview = json.dumps(GameService().get_games_profile_view(userID))
    puzzlerushview = json.dumps(PuzzleRushService().get_puzzle_rush_profile_view(userID))
    solutionsview = json.dumps(GameService().get_solutions_profile_view(userID))
    return jsonify(gamesview=gamesview,puzzlerushview=puzzlerushview,solutionsview=solutionsview)

@bp.route('/getDailyChallengeHistory')
def getdailychallengehistory():
    daily_challenge_history = json.dumps(GeneratorService().get_daily_challenge_history())
    return jsonify(daily_challenge_history)


@bp.route('/settingsChange', methods=('GET','POST'))
@jwt_required
def settingsChange():
    userID = get_jwt_identity()
    data = request.get_json()
    UserService().change_settings(userID,data['LineDirections'])
    return 'OK'

@bp.route('/play/<uri>')
@jwt_optional
def play(uri):
    gamefromuri = GameService().get_game_uri(uri)
    if 'g_id' not in gamefromuri.keys():
        highscores = json.dumps(GameService().get_highscores(uri))
        authorname = gamefromuri['authorname']
        name = gamefromuri['name']
    else:
        highscores = '[]'
        authorname = ' Random Generated'
        name = gamefromuri['g_difficulty']
    data = json.dumps(gamefromuri)
    get_games_data_value = get_games_data(50,0)
    userID = get_jwt_identity()
    user = None
    dc_movesList = None
    dc_playerList = None
    loggedin = 'No'
    learngameslist = get_learned_games()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_id = GeneratorService().get_daily_challenge_id()
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    metatagcontent = "Play Ricochet Robots Puzzle\n" + "Created by: " + authorname + '\n' + name
    urlformeta = "http://robotsevolved.com/play/" + uri
    if (userID is not None):
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]
    return render_template('index.html',urlformeta=urlformeta,metatagcontent=metatagcontent,dc_playerList=dc_playerList,dc_movesList=dc_movesList, dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist,learngameslist=learngameslist,loggedin=loggedin, user=json.dumps(user), gamedata=data, highscores=highscores, uri=uri, gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/submitpuzzle', methods=('GET','POST'))
@jwt_optional
def submitpuzzle():
    data = request.get_json()
    userID = get_jwt_identity()
    if userID is None:
        userID = 1
    if (GameService().check_same_game(json.dumps(data['puzzledata'])) == 1):
        uri = GameService().insert_game(data['name'], 'type', 'description', userID, data['authorname'], 1, json.dumps(data['puzzledata']))
        return jsonify(uri=uri)
    else:
        return jsonify(uri='GameAlreadyExists')

@bp.route('/updatehighscores', methods=('GET','POST'))
def updatehighscores():
    uri = request.args['uri']
    highscores = json.dumps(GameService().get_highscores(uri))
    return jsonify(highscores=highscores)

@bp.route('/submithighscore', methods=('GET','POST'))
@jwt_optional
def submithighscore():
    data = request.get_json()
    userID = get_jwt_identity()
    if userID is None:
        userID = 1
    rtnMessage = GameService().insert_highscore(data['name'],userID,'test','test',data['highscore'],data['uri'])
    return rtnMessage

@bp.route('/userCreate', methods={'GET', 'POST'})
def userCreate():
    data = request.get_json()
    UserService().insert_user(data['userId'], data['logintype'], data['accountId'], data['profilePicture'], data['email'])
    return 'OK'

@bp.route('/userDelete', methods={'GET', 'POST'})
def userDelete():
    data = request.get_json()
    UserService().delete_user(data['userID'])
    return 'OK'

@bp.route('/search', methods=('GET','POST'))
def search():
    data = request.get_json()
    searchterm = data['search']
    offset = data['offset']
    get_games_data_value = get_games_search(20,offset,searchterm)
    return jsonify(highscoreslist=json.dumps(get_games_data_value[1]),gameslist=json.dumps(get_games_data_value[0]))




@bp.route('/randomgame', methods=('GET',))
@jwt_optional
def randomgame():
    difficulty = request.args['difficulty']
    type = request.args['type']
    game = PuzzleRushService().get_random_game(difficulty,type)
    return jsonify(game=json.dumps(game))