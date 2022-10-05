from flaskr.dataaccess.GameDAO import GameDAO
from flaskr.dataaccess.entities.Game import Game
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.UserDAO import UserDAO
from flaskr.solutionChecker import checkSolution
import json
import datetime
from flask import current_app
import re

class GameService:

    def __init__(self):
        pass

    def insert_game(self,name, type, description, authorid, authorname, difficulty, puzzledata):
        return GameDAO().insert_game(name,type,description,authorid,authorname,difficulty,puzzledata)

    def get_game(self,gameid):
        return GameDAO().get_game(gameid)

    def check_same_game(self,puzzledata):
        return GameDAO().check_same_game(puzzledata)

    def get_games_by_search(self,numPuzzles,Offset,searchterm,userID):
        return GameDAO().get_games_by_search(numPuzzles,Offset,searchterm,userID)

    def get_games_by_search_most_played(self,numPuzzles,Offset,searchterm,userID):
        return GameDAO().get_games_by_search_most_played(numPuzzles,Offset,searchterm,userID)
        
    def get_games_by_search_most_liked(self,numPuzzles,Offset,searchterm,userID):
        return GameDAO().get_games_by_search_most_liked(numPuzzles,Offset,searchterm,userID)

    def get_games_by_search_highest_score(self,numPuzzles,Offset,searchterm,userID):
        return GameDAO().get_games_by_search_highest_score(numPuzzles,Offset,searchterm,userID)


    def insert_highscore(self,name,userid,authorname,solutiondata,highscore,uri):
        row = GameDAO().get_game_uri(uri)
        game = Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8])
        if checkSolution(solutiondata,game.puzzledata,highscore):
            scoreList = GameDAO().get_highscores(game.id)
            UpdateUserScore = False
            rtnMessage = ""
            userSubmitted = False
            idtoupdate = None
            for Solution in scoreList:
                if (Solution['numMoves'] == highscore and Solution['comment'] == name and userid == 1):
                    return "Duplicate highscore cannot be submitted."
                if (Solution['numMoves'] >= highscore and Solution['userid'] == userid and userid != 1):
                    UpdateUserScore = True
                    idtoupdate = Solution['id']
                if (Solution['userid'] == userid):
                    userSubmitted = True
            gameid = game.id
            if (UpdateUserScore):
                GameDAO().increment_plays(gameid)
                return GameDAO().update_highscore(idtoupdate,gameid, name, userid, authorname, solutiondata, highscore)
            else:
                if (not userSubmitted or userid==1):
                    GameDAO().increment_plays(gameid)
                    GameDAO().insert_highscore(gameid, name, userid, authorname, solutiondata, highscore)
                    rtnMessage = "Submitted"
                    return rtnMessage
                else:
                    return 'not a higher score'
        else:
            return 'not a valid submission'


    def get_game_uri_from_user_id(self,uri,user_id):
        row = GameDAO().get_game_uri_from_user_id(uri,user_id)
        if row is None:
            generated = GenDAO().get_game_uri(uri)
            if generated is None:
                return {'uri': ''}
            return Gen(generated[0], generated[1], generated[2], generated[3], generated[4], generated[5],
                       generated[6]).serialize()
        else:
            return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],'',row[10],row[11],row[12]).serialize()


    def get_game_uri(self,uri):
        row = GameDAO().get_game_uri(uri)
        if row is None:
            generated = GenDAO().get_game_uri(uri)
            if generated is None:
                return {'uri': ''}
            return Gen(generated[0],generated[1],generated[2],generated[3],generated[4],generated[5],generated[6]).serialize()
        else:
            return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],'',row[10]).serialize()

    def get_highscores(self,uri,metadata=True):
        row = GameDAO().get_game_uri(uri)
        game = Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        highscores = GameDAO().get_highscores(game.id)
        if metadata:
            newhighscores = list()
            for highscore in highscores:
                metadata = UserDAO().get_user_metadata(highscore['userid'])
                newhighscores.append({**highscore,**metadata})
            return newhighscores
        else:
            return highscores

    def get_all_games(self,numGames,offset):
        return GameDAO().get_all_games(numGames,offset)

    def get_games_profile_view(self, user_id):
        return GameDAO().get_games_profile_view(user_id)

    def get_solutions_profile_view(self,user_id):
        return GameDAO().get_solutions_profile_view(user_id)