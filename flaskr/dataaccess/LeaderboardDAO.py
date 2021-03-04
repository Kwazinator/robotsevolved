from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.v_dailyChallenge_leaderboard import v_dailyChallenge_leaderboard
from flaskr.dataaccess.entities.v_findGame_leaderboard import v_findGame_leaderboard
from flaskr.dataaccess.entities.v_puzzle_rush_leaderboard import v_puzzle_rush_leaderboard
from flaskr.dataaccess.entities.Daily_Challenge_History_View import Daily_Challenge_History_View
from flaskr.dataaccess.entities.Daily_Challenge_Solution import Daily_Challenge_Solution
#from random_word import RandomWords
import uuid
from datetime import timedelta
import random

class LeaderboardDAO:

    def __init__(self):
        pass

    def get_daily_challenge_leaderboard(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * from v_dailyChallenge_leaderboard')
            DCLlist = list()
            for row in cursor.fetchall():
                DCLlist.append(v_dailyChallenge_leaderboard(*row).serialize())
            return DCLlist
        except Exception as e:
            print(e)
            print('error in ddaily challenge leaderboard fetching')
        finally:
            pass

    def get_find_game_leaderboard(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * from v_findGame_leaderboard')
            FGLlist = list()
            for row in cursor.fetchall():
                FGLlist.append(v_findGame_leaderboard(*row).serialize())
            return FGLlist
        except Exception as e:
            print(e)
            print('error in find game leaderboard fetching')
        finally:
            pass

    def get_puzzle_rush_leaderboard(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * from v_puzzle_rush_leaderboard')
            PRLlist = list()
            data = cursor.fetchall()
            return v_puzzle_rush_leaderboard(data).serialize()
        except Exception as e:
            print(e)
            print('error in v_puzzle_rush leaderboard fetching')
        finally:
            pass
