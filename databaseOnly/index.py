from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify, make_response, current_app, session, send_file
)
from flaskr.services.GameService import GameService
from flaskr.services.UserService import UserService
from flaskr.services.PuzzleRushService import PuzzleRushService
from flaskr.services.GeneratorService import GeneratorService
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt,unset_jwt_cookies, unset_refresh_cookies
import json
import re
import flaskr.auth as auth
from flaskr.solutionChecker import checkSolution
from werkzeug.exceptions import HTTPException



bp = Blueprint('index', __name__)


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


def processwalls(walls):
    toreturn = list()
    for wall in walls:
        try:
            if wall['opacity'] == 1:
                toreturn.append(wall)
        except Exception as e:
            print('wall not found with opacity')
        finally:
            pass
    return toreturn

def get_games_search(numPuzzles,Offset,searchterm,filter,userID):
    if filter == 'None':
        gameslist = GameService().get_games_by_search(numPuzzles,Offset,searchterm,userID)
        highscoreslist = list()
        if gameslist is not None:
            for game in gameslist:
                highscoreslist.append(GameService().get_highscores(game['uri'],False))
        return (gameslist,highscoreslist)
    elif filter == 'MostPlayed':
        gameslist = GameService().get_games_by_search_most_played(numPuzzles, Offset, searchterm,userID)
        highscoreslist = list()
        if gameslist is not None:
            for game in gameslist:
                highscoreslist.append(GameService().get_highscores(game['uri'],False))
        return (gameslist, highscoreslist)
    elif filter == 'Highest':
        gameslist = GameService().get_games_by_search_highest_score(numPuzzles, Offset, searchterm,userID)
        highscoreslist = list()
        if gameslist is not None:
            for game in gameslist:
                highscoreslist.append(GameService().get_highscores(game['uri'],False))
        return (gameslist, highscoreslist)
    elif filter == 'MostLiked':
        gameslist = GameService().get_games_by_search_most_liked(numPuzzles, Offset, searchterm, userID)
        highscoreslist = list()
        if gameslist is not None:
            for game in gameslist:
                highscoreslist.append(GameService().get_highscores(game['uri'],False))
        return (gameslist, highscoreslist)


def get_learned_games():
    gameslist = [13,12,31,24,13,25,11,13,14,15,32,26]
    returnlist = list()
    for game in gameslist:
        returnlist.append(GameService().get_game(game).serialize())
    return json.dumps(returnlist)




@bp.route('/',endpoint='index')
@jwt_required(optional=True)
def index():
    userID = get_jwt_identity()
    if (userID is None):
        return auth.anon_user_login()
    user = UserService().get_user(get_jwt_identity())
    if (user is None):
        session.clear()
        response = redirect(url_for('index.index'))
        unset_refresh_cookies(response)
        unset_jwt_cookies(response)
        return response
    user = user.serialize()
    dc_id = GeneratorService().get_daily_challenge_id()
    isStarted = UserService().is_daily_started(userID, dc_id)

    loggedin = 'No'
    learngameslist = get_learned_games()
    metatagcontent = "Ricochet Robots online game, Competetive board game Insipred by Ricochet Robots"
    urlformeta = "http://robotsevolved.com"
    if (user['logintype'] != 'anon'):
        loggedin = 'Yes'
    if (user['logintype'] == 'anon' and user['username'] == ''):
        experiencedUser = 'No'
    else:
        experiencedUser = 'Yes'
    return render_template('index.html',isDailyStarted=isStarted,urlformeta=urlformeta,dchighscores = json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id)),metatagcontent=metatagcontent,learngameslist=learngameslist, loggedin=loggedin, user=json.dumps(user), gamedata=json.dumps({'uri': ''}), highscores='[]', uri='',experiencedUser=experiencedUser)

@bp.route('/about',endpoint='about')
def about():
    return 'yolo'

@bp.route('/testvotingadd',endpoint='testvoteingadd')
@jwt_required()
def testvoteingadd():
    vote = 'Y'
    uri = '4c7e3adad3934e91990434700e7a3a45'
    user_id = 2
    action = 'create'
    gamefromuri = GameService().get_game_uri(uri)
    response = UserService().vote_Puzzle_Action(vote,user_id,gamefromuri['id'],action)
    return response

@bp.route('/testvotingremove',endpoint='testvoteingremove')
@jwt_required()
def testvoteingremove():
    vote = 'Y'
    uri = '4c7e3adad3934e91990434700e7a3a45'
    user_id = 2
    action = 'remove'
    gamefromuri = GameService().get_game_uri(uri)
    response = UserService().vote_Puzzle_Action(vote,user_id,gamefromuri['id'],action)
    return response

@bp.route('/getProfileData',endpoint='getProfileData')
@jwt_required()
def getProfileData():
    userID = get_jwt_identity()
    gamesview = json.dumps(GameService().get_games_profile_view(userID))
    puzzlerushview = json.dumps(PuzzleRushService().get_puzzle_rush_profile_view(userID))
    solutionsview = json.dumps(GameService().get_solutions_profile_view(userID))
    return jsonify(gamesview=gamesview,puzzlerushview=puzzlerushview,solutionsview=solutionsview)

@bp.route('/getDailyChallengeHistory',endpoint='getdailyChallengehistory')
def getdailychallengehistory():
    daily_challenge_history = json.dumps(GeneratorService().get_daily_challenge_history())
    return jsonify(daily_challenge_history)



@bp.route('/getFindGameData', methods=('GET','POST'),endpoint='getFindGameData')
def getFindGameData():
    uri = request.args['uri']
    gamefromuri = GameService().get_game_uri(uri)
    return jsonify(game=json.dumps(gamefromuri))

@bp.route('/userUpdate', methods=('GET','POST'),endpoint='user_update')
@jwt_required()
def user_update():
    userID = get_jwt_identity()
    data = request.get_json()
    return UserService().change_username(userID,trimstring(data['newuser']))

@bp.route('/settingsChange', methods=('GET','POST'),endpoint='settingsChange')
@jwt_required()
def settingsChange():
    userID = get_jwt_identity()
    data = request.get_json()
    if data['LineDirections'] == 'Y' or data['LineDirections'] == 'N':
        UserService().change_settings(userID,data['LineDirections'])
    return 'OK'

@bp.route('/play/<uri>',endpoint='play')
@jwt_required(optional=True)
def play(uri):
    dc_id = GeneratorService().get_daily_challenge_id()
    userID = get_jwt_identity()
    if (userID is None):
        return auth.anon_user_login()
    user = UserService().get_user(get_jwt_identity())
    if (user is None):
        session.clear()
        response = redirect(url_for('index.index'))
        unset_refresh_cookies(response)
        unset_jwt_cookies(response)
        return response
    user = user.serialize()
    loggedin = 'No'
    if (user['logintype'] != 'anon'):
        loggedin = 'Yes'
    else:
        userID = 1
    if (user['logintype'] == 'anon' and user['username'] == ''):
        experiencedUser = 'No'
    else:
        experiencedUser = 'Yes'
    gamefromuri = GameService().get_game_uri_from_user_id(uri,userID)
    if 'g_id' not in gamefromuri.keys():
        highscores = json.dumps(GameService().get_highscores(uri))
        authorname = gamefromuri['authorname']
        name = gamefromuri['name']
    else:
        highscores = '[]'
        authorname = ' Random Generated'
        name = gamefromuri['g_difficulty']
    data = json.dumps(gamefromuri)
    learngameslist = get_learned_games()
    metatagcontent = "Play Ricochet Robots Puzzle\n" + "Created by: " + str(authorname) + '\n' + str(name)
    urlformeta = "http://robotsevolved.com/play/" + str(uri)
    isStarted = UserService().is_daily_started(userID, dc_id)
    return render_template('index.html',urlformeta=urlformeta,isDailyStarted=isStarted, dchighscores=json.dumps(GeneratorService().get_daily_challenge_highscores(dc_id)), metatagcontent=metatagcontent,learngameslist=learngameslist,loggedin=loggedin, user=json.dumps(user), gamedata=data, highscores=highscores, uri=uri,experiencedUser=experiencedUser)

@bp.route('/submitpuzzle', methods=('GET','POST'),endpoint='submitpuzzle')
@jwt_required(optional=True)
def submitpuzzle():
    data = request.get_json()
    userID = get_jwt_identity()
    try:
        puzzledata = {
            'buildMode': False,
            'boardState': data['puzzledata']['boardState'],
            'copiedToClipboard': False,
            'createMode': 'No',
            'gameWon': False,
            'goal': data['puzzledata']['goal'],
            'height': data['puzzledata']['height'],
            'highscores': [],
            'moveHistory': [],
            'playerStart': data['puzzledata']['playerStart'],
            'playerState': data['puzzledata']['playerState'],
            'robotSelected': 0,
            'showBoardResetPanelModal': False,
            'wallHorizontal': processwalls(data['puzzledata']['wallHorizontal']),
            'wallVerticle': processwalls(data['puzzledata']['wallVerticle']),
            'width': data['puzzledata']['width'],
            'coloredGoals': data['puzzledata']['coloredGoals']
        }
        if 'type' in data:
            typeof = data['type']
        else:
            typeof = 'type'
    except Exception as e:
        print('error in puzzledata submission')
        print(e)
        return 'Error in processing the data'
    finally:
        pass
    if userID is None:
        userID = 1
    if (GameService().check_same_game(json.dumps(puzzledata)) == 1 and checkSolution(json.dumps(data['moveHistory']),json.dumps(puzzledata),len(data['moveHistory']))):
        uri = GameService().insert_game(trimstring(data['name']), typeof, 'description', userID, trimstring(data['authorname']), 1, json.dumps(puzzledata))
        return jsonify(uri=uri)
    else:
        return jsonify(uri='GameAlreadyExists')

@bp.route('/updatehighscores', methods=('GET','POST'),endpoint='updatehighscores')
def updatehighscores():
    uri = request.args['uri']
    highscores = json.dumps(GameService().get_highscores(uri))
    return jsonify(highscores=highscores)

@bp.route('/submithighscore', methods=('GET','POST'),endpoint='submithighscores')
@jwt_required(optional=True)
def submithighscore():
    data = request.get_json()
    userID = get_jwt_identity()
    if userID is None:
        userID = 1
    user = UserService().get_user(userID).serialize()
    if (user['logintype'] == 'anon' and user['username'] == ''):
        UserService().change_username(userID,trimstring(data['name']))
    rtnMessage = GameService().insert_highscore(trimstring(data['name']),userID,'test',json.dumps(data['solutiondata']),data['highscore'],data['uri'])
    return rtnMessage

@bp.route('/search', methods=('GET','POST'),endpoint='search')
@jwt_required(optional=True)
def search():
    data = request.get_json()
    searchterm = trimstring(data['search'])
    filter = data['filter']
    offset = data['offset']
    if ('numGames' in data):
        numGames = data['numGames']
    else:
        numGames = 16
    userID = get_jwt_identity()
    if userID is None:
        userID = 1
    get_games_data_value = get_games_search(numGames,offset,searchterm,filter,userID)
    return jsonify(highscoreslist=json.dumps(get_games_data_value[1]),gameslist=json.dumps(get_games_data_value[0]))


@bp.route('/randomgame', methods=('GET',),endpoint='randomgame')
@jwt_required(optional=True)
def randomgame():
    difficulty = request.args['difficulty']
    type = request.args['type']
    game = PuzzleRushService().get_random_game(difficulty,type)
    return jsonify(game=json.dumps(game))

@bp.route('/likepuzzle', methods=('POST',),endpoint='likepuzzles')
@jwt_required()
def likepuzzles():
    data = request.get_json()
    vote = data['vote']
    uri = data['uri']
    action = data['action']
    user_id = get_jwt_identity()
    gamefromuri = GameService().get_game_uri(uri)
    response = UserService().vote_Puzzle_Action(vote,user_id,gamefromuri['id'],action)
    return jsonify(votes=response['votes'])

@bp.errorhandler(Exception)
def handle_exception(e):
    # pass through HTTP errors
    print(e)
    # now you're handling non-HTTP exceptions only
    return render_template("502_generic.html", e=e), 502
