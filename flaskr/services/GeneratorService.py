from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re

class GeneratorService:

    def __init__(self):
        pass

    def getPuzzles(self, upper_bound, lower_bound, numPuzzles):
        return GenDAO().getPuzzles(upper_bound, lower_bound, numPuzzles)

    def insert_puzzle(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata):
        return GenDAO().insertPuzzles(g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata)

    def get_puzzle_by_id(self,id):
        return GenDAO().get_puzzle_by_id(id)

    def get_daily_puzzles(self):
        returnlist = list()
        for game in GenDAO().get_daily_puzzles():
            returnlist.append(GenDAO().get_puzzle_by_id(game))
        return returnlist

    def insert_daily_challenge_submit(self, score, userid, solutiondata, name, dc_id, playerStateList):
        submitted = GenDAO().check_current_daily_submit(userid,dc_id)
        if userid == 1:
            return GenDAO().insert_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
        elif submitted is not None and submitted.score > score:
            return GenDAO().update_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
        elif submitted is None:
            return GenDAO().insert_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
        else:
            return 'already submitted'

    def get_daily_challenge_highscores(self, dc_id):
        return GenDAO().get_daily_challenge_highscores(dc_id)

    def get_daily_challenge_id(self):
        return GenDAO().get_daily_challenge_id()

    def get_daily_challenge_moves(self,dc_id, user_id):
        return GenDAO().get_daily_challenge_moves(dc_id,user_id)