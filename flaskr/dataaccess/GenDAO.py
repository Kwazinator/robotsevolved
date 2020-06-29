from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.Daily_Challenge_Solution import Daily_Challenge_Solution
#from random_word import RandomWords
import uuid

class GenDAO:

    def __init__(self):
        pass

    def getPuzzles (self, upper_bound, lower_bound, numPuzzles):
        cursor = get_db().cursor()
        puzzleList = list()
        cursor.execute('SELECT * FROM generated_games WHERE g_name = %s AND g_moves BETWEEN %s AND %s order by RAND() LIMIT %s',
                       ('algo',lower_bound, upper_bound, numPuzzles))
        for row in cursor.fetchall():
            puzzleList.append(Gen(row[0], row[1], row[2], row[3], row[4], row[5],row[6]).serialize())
        return puzzleList

    def insertPuzzles(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata):
        try:
            db = get_db()
            cursor = db.cursor()
            uri = uuid.uuid4().hex
            print(uri)
            cursor.execute('INSERT INTO generated_games (g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata) VALUES (%s,%s,%s,%s,%s,%s)',(g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata))
            db.commit()
            return uri
        except Exception as e:
            print('Error in GenDAO().insertPuzzles')
            print(e)
        finally:
            pass

    def get_puzzle_by_id(self, id):
        cursor = get_db().cursor()
        cursor.execute('SELECT * FROM generated_games WHERE g_id=%s',
                       (id,))
        row = cursor.fetchone()
        return Gen(row[0], row[1], row[2], row[3], row[4], row[5],row[6]).serialize()

    def get_daily_puzzles(self):
        cursor = get_db().cursor()
        cursor.execute('SELECT * FROM daily_challenge WHERE CURRENT_TIMESTAMP() <= TIMESTAMPADD(day, +1, created) ORDER by created ASC')
        row = cursor.fetchone()
        return (row[2],row[3],row[4],row[5])

    def insert_daily_challenge_submit(self, score, userid, solutiondata, name, dc_id):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO daily_challenge_submit (score,user_id,solutiondata,name,dc_id) VALUES (%s,%s,%s,%s,%s)',(score, userid, solutiondata, name, dc_id))
            db.commit()
        except Exception as e:
            print('Error in GenDAO().insert_daily_challenge_submit')
            print(e)
        finally:
            return 'OK'

    def get_daily_challenge_highscores(self,dc_id):
        cursor = get_db().cursor()
        highscores = list()
        cursor.execute('SELECT * FROM daily_challenge_submit WHERE dc_id=%s ORDER by score ASC',(dc_id,))
        for row in cursor.fetchall():
            highscores.append(Daily_Challenge_Solution(row[0], row[1], row[2], row[3], row[4], row[5]).serialize())
        return highscores
