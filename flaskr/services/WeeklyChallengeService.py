from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.WC_DAO import WC_DAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re
from flaskr.solutionChecker import checkSolution

class WeeklyChallengeService:

    def __init__(self):
        pass

    def insert_weekly_challenge(self, datetime, totalMoves):
        return WC_DAO().insert_weekly_challenge(datetime,totalMoves)

    def insert_puzzle(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata, WC_ID):
        return WC_DAO().insertPuzzles(g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata, WC_ID)

    def get_wc_id(self):
        return WC_DAO().get_wc_id()

    def get_wc_puzzles(self,wc_id):
        return WC_DAO().get_wc_puzzles(wc_id)

    def get_wc_highscores(self,wc_id):
        userlist = WC_DAO().get_wc_winners()
        highscores = WC_DAO().get_wc_highscores(wc_id)
        highscoreslist = list()
        for score in highscores:
            if score['logintype'] != 'anon':
                if userlist.get(score['user_id']) != None:
                    score['wins'] = userlist[score['user_id']]
                else:
                    score['wins'] = 0
                highscoreslist.append(score)
            else:
                highscoreslist.append(score)
        return highscoreslist

    def get_wc_moves(self,wc_id,userID):
        return WC_DAO().get_wc_moves(wc_id,userID)