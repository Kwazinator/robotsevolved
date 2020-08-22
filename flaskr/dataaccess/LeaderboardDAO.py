from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
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
                DCLlist.append(Daily_Challenge_History_View(*row).serialize())
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
                FGLlist.append(Daily_Challenge_History_View(*row).serialize())
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
            for row in cursor.fetchall():
                PRLlist.append(Daily_Challenge_History_View(*row).serialize())
            return PRLlist
        except Exception as e:
            print(e)
            print('error in v_puzzle_rush leaderboard fetching')
        finally:
            pass
