from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.UserDAO import UserDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re
from flaskr.solutionChecker import checkSolution

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
            gamedata = GenDAO().get_puzzle_by_id(game)
            gamedata['g_solutiondata'] = ''
            returnlist.append(gamedata)
        return returnlist

    def insert_daily_challenge(self, date,id1,id2,id3,id4,bestScore):
        return GenDAO().insert_daily_challenge(date,id1,id2,id3,id4,bestScore)

    def insert_daily_challenge_submit(self, score, userid, solutiondata, name, dc_id, playerStateList):
        submitted = GenDAO().check_current_daily_submit(userid,dc_id)
        solutioncheck = json.loads(solutiondata)

        #dc_gamedata = GenDAO().get_daily_challenge_puzzledata(dc_id)
        #for index, solution in enumerate(solutioncheck):
            #if (not checkSolution(json.dumps(solution),dc_gamedata[index][0],len(solution))):
                #return 'something went wrong'
        if (GenDAO().get_daily_challenge_id() == dc_id):
            if userid == 1:
                return GenDAO().insert_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
            elif submitted is not None and submitted.score > score:
                return GenDAO().update_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
            elif submitted is None:
                return GenDAO().insert_daily_challenge_submit(score, userid, solutiondata, name, dc_id,playerStateList)
            else:
                return 'already submitted'
        return 'something went wrong'

    def get_daily_challenge_highscores(self, dc_id):
        userlist = GenDAO().get_daily_challenge_winners()
        highscores = GenDAO().get_daily_challenge_highscores(dc_id)
        highscoreslist = list()
        for score in highscores:
            if score['user_id'] != 1:
                if userlist.get(score['user_id'])!=None:
                    score['wins'] = userlist[score['user_id']]
                else:
                    score['wins'] = 0
                highscoreslist.append({**score,**UserDAO().get_user_metadata(score['user_id'])})
            else:
                highscoreslist.append({**score,**UserDAO().get_user_metadata(score['user_id'])})
        return highscoreslist

    def get_daily_challenge_winners(self):
        return GenDAO().get_daily_challenge_winners()

    def get_daily_challenge_id(self):
        return GenDAO().get_daily_challenge_id()

    def get_daily_challenge_moves(self,dc_id, user_id):
        return GenDAO().get_daily_challenge_moves(dc_id,user_id)

    def get_daily_challenge_history(self):
        return GenDAO().get_daily_challenge_history()

    def get_last_daily_challenge(self):
        return GenDAO().get_last_daily_challenge()