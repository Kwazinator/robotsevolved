from flaskr.dataaccess.GameDAO import GameDAO
from flaskr.dataaccess.entities.Game import Game
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

    def insert_highscore(self, name,userid,authorname,solutiondata,highscore,uri):
        row = GameDAO().get_game_uri(uri)
        game = Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8])
        gameid = game.id
        return GameDAO().insert_highscore(gameid,name,userid,authorname,solutiondata,highscore)

    def get_game_uri(self,uri):
        row = GameDAO().get_game_uri(uri)
        if row is None:
            return {'uri': ''}
        else:
            return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7]).serialize()

    def get_highscores(self,uri):
        row = GameDAO().get_game_uri(uri)
        game = Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        return GameDAO().get_highscores(game.id)

    def get_all_games(self,numGames,offset):
        return GameDAO().get_all_games(numGames,offset)