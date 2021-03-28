from flaskr.dataaccess.UserDAO import UserDAO
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
                highscoreslist.append({**score,**UserDAO().get_user_metadata(score['user_id'])})
            else:
                highscoreslist.append({**score,**UserDAO().get_user_metadata(score['user_id'])})
        return highscoreslist

    def get_wc_moves(self,wc_id,userID):
        return WC_DAO().get_wc_moves(wc_id,userID)

    def has_submitted(self, userID,wc_id):
        return WC_DAO().has_submitted(userID,wc_id)

    def submit_answer(self,score,userID, solutiondata, name, wc_id,playerStateList,completed,display,gamesWon):
        if self.has_submitted(userID,wc_id):
            completedinDB = WC_DAO().is_completed(userID,wc_id)
            if completedinDB[0] == 0 and completed == 0 or completed == 1:
                if completedinDB[0] == 1 and completedinDB[1] <= score:
                    return None
                return WC_DAO().update_submit_answer(score,userID, solutiondata, name, wc_id,playerStateList,completed,display,gamesWon)
        else:
            return WC_DAO().insert_submit_answer(score,userID, solutiondata, name, wc_id,playerStateList,completed,display,gamesWon)
