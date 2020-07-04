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
    gameslist = [13,12,24,25,11,14,15,26]
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
    gamesview = None
    solutionsview = None
    puzzlerushview = None
    dc_movesList = None
    dc_playerList = None
    dc_moves=None
    loggedin = 'No'
    learngameslist = get_learned_games()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_id = GeneratorService().get_daily_challenge_id()
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    if (userID is not None):
        #gamesview = json.dumps(UserService().get_user_games_view(userID))
        #solutionsview = json.dumps(UserService().get_user_solutions_view(userID))
        #puzzlerushview = json.dumps(UserService().get_user_puzzlerush_view(userID))
        #Start test data
        gamesviewlist = list()
        solutionsview = list()
        gamesviewlist.append(GameService().get_game(2).serialize())
        gamesview = json.dumps(gamesviewlist)
        game1 = GameService().get_game(2).serialize()
        game1["highscore"] = 4
        game1["HSname"] = "Kyle Kwasniewski"
        game1["ProfilePicture"] = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&psig=AOvVaw27J8nyH6FuCgEtiqJp9Y7N&ust=1592512074629000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjo5PTXieoCFQAAAAAdAAAAABAD"
        solutionsview.append(game1)
        game2 = GameService().get_game(3).serialize()
        game2["highscore"] = 20
        game2["HSname"] = "DSchultz"
        game2["ProfilePicture"] = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&psig=AOvVaw27J8nyH6FuCgEtiqJp9Y7N&ust=1592512074629000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjo5PTXieoCFQAAAAAdAAAAABAD"
        solutionsview.append(game2)
        solutionsview = json.dumps(solutionsview)
        puzzlerushview = {
            "bestscore": 21,
            "averagescoreday": 8.92,
            "averagescoreweek": 6.78,
            "averagescoremonth": 5.92,
            "bestscorepercentile": .7,
            "percentilescoreday": .8,
            "percentilescoreweek": .7,
            "percentilescoremonth": .6,
            "bestaveragediff": 40,
            "averagediffvalday": 26,
            "averagediffvalweek": 19,
            "averagediffvalmonth": 17,
            "percentilediffvalday": .8,
            "percentilediffvalweek": .7,
            "percentilediffvalmonth": .6,
            "bestdiffvalpercentile": .9
        }
        puzzlerushview = json.dumps(puzzlerushview)
        #end test data
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        gamesview = json.dumps(GameService().get_games_profile_view(userID))
        puzzlerushview = json.dumps(PuzzleRushService().get_puzzle_rush_profile_view(userID))
        solutionsview = json.dumps(GameService().get_solutions_profile_view(userID))
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]
    return render_template('index.html',dc_playerList=dc_playerList,dc_movesList=dc_movesList,dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist,learngameslist=learngameslist, gamesview=gamesview,solutionsview=solutionsview,puzzlerushview=puzzlerushview,loggedin=loggedin, user=json.dumps(user), gamedata=json.dumps({'uri': ''}), highscores='[]', highscoreslist=json.dumps(get_games_data_value[1]), uri='',gameslist=json.dumps(get_games_data_value[0]))

@bp.route('/about')
def about():
    return 'yolo'


@bp.route('/play/<uri>')
@jwt_optional
def play(uri):
    data = json.dumps(GameService().get_game_uri(uri))
    highscores = json.dumps(GameService().get_highscores(uri))
    get_games_data_value = get_games_data(50,0)
    userID = get_jwt_identity()
    user = None
    gamesview = None
    solutionsview = None
    dc_movesList = None
    dc_playerList = None
    puzzlerushview = None
    loggedin = 'No'
    learngameslist = get_learned_games()
    dailychallengelist = json.dumps(GeneratorService().get_daily_puzzles())
    dc_id = GeneratorService().get_daily_challenge_id()
    dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id))
    if (userID is not None):
        #gamesview = json.dumps(UserService().get_user_games_view(userID))
        #solutionsview = json.dumps(UserService().get_user_solutions_view(userID))
        #puzzlerushview = json.dumps(UserService().get_user_puzzlerush_view(userID))
        #Start test data
        gamesviewlist = list()
        solutionsview = list()


        gamesviewlist.append(GameService().get_game(2).serialize())
        gamesview = json.dumps(gamesviewlist)
        game1 = GameService().get_game(2).serialize()
        game1["highscore"] = 4
        game1["HSname"] = "Kyle Kwasniewski"
        game1["ProfilePicture"] = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&psig=AOvVaw27J8nyH6FuCgEtiqJp9Y7N&ust=1592512074629000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjo5PTXieoCFQAAAAAdAAAAABAD"
        solutionsview.append(game1)
        game2 = GameService().get_game(3).serialize()
        game2["highscore"] = 20
        game2["HSname"] = "DSchultz"
        game2["ProfilePicture"] = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&psig=AOvVaw27J8nyH6FuCgEtiqJp9Y7N&ust=1592512074629000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjo5PTXieoCFQAAAAAdAAAAABAD"
        solutionsview.append(game2)
        solutionsview = json.dumps(solutionsview)
        puzzlerushview = {
            "bestscore": 21,
            "averagescoreday": 8.92,
            "averagescoreweek": 6.78,
            "averagescoremonth": 5.92,
            "bestscorepercentile": .7,
            "percentilescoreday": .8,
            "percentilescoreweek": .7,
            "percentilescoremonth": .6,
            "bestaveragediff": 40,
            "averagediffvalday": 26,
            "averagediffvalweek": 19,
            "averagediffvalmonth": 17,
            "percentilediffvalday": .8,
            "percentilediffvalweek": .7,
            "percentilediffvalmonth": .6,
            "bestdiffvalpercentile": .9
        }
        puzzlerushview = json.dumps(puzzlerushview)
        gamesview = json.dumps(GameService().get_games_profile_view(userID))
        puzzlerushview = json.dumps(PuzzleRushService().get_puzzle_rush_profile_view(userID))
        solutionsview = json.dumps(GameService().get_solutions_profile_view(userID))
        #end test data
        user = UserService().get_user(get_jwt_identity()).serialize()
        loggedin = 'Yes'
        dc_moves = GeneratorService().get_daily_challenge_moves(dc_id,userID)
        if dc_moves is not None:
            dc_movesList = dc_moves[0]
            dc_playerList = dc_moves[1]

    return render_template('index.html',dc_playerList=dc_playerList,dc_movesList=dc_movesList, dchighscores=dchighscores,dc_id=dc_id,dailyChallengeGameslist=dailychallengelist,learngameslist=learngameslist, gamesview=gamesview,puzzlerushview=puzzlerushview,solutionsview=solutionsview,loggedin=loggedin, user=json.dumps(user), gamedata=data, highscores=highscores,highscoreslist=json.dumps(get_games_data_value[1]), uri=uri, gameslist=json.dumps(get_games_data_value[0]))

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
    game = PuzzleRushService().get_random_game(difficulty)
    return jsonify(game=json.dumps(game))