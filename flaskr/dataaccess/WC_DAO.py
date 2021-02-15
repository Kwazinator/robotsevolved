from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.Daily_Challenge_History_View import Daily_Challenge_History_View
from flaskr.dataaccess.entities.Daily_Challenge_Solution import Daily_Challenge_Solution
#from random_word import RandomWords
import uuid
from datetime import timedelta
import random



class WC_DAO:

    def __init__(self):
        pass

    def insert_weekly_challenge(self, datetime, totalMoves):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            'INSERT INTO weekly_challenge (bestScore,created) VALUES (%s,%s)',
            (totalMoves,datetime))
        db.commit()
        return cursor.lastrowid

    def insertPuzzles(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata, WC_ID):
        try:
            db = get_db()
            cursor = db.cursor()
            uri = uuid.uuid4().hex
            cursor.execute('INSERT INTO generated_games (g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata, g_weekly) VALUES (%s,%s,%s,%s,%s,%s,%s)',(g_name, g_difficulty, g_puzzledata, uri, g_moves, g_solutiondata,WC_ID))
            db.commit()
            return cursor.lastrowid
        except Exception as e:
            print('Error in GenDAO().insertPuzzles')
            print(e)
        finally:
            pass