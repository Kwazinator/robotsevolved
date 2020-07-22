from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.Daily_Challenge_History_View import Daily_Challenge_History_View
from flaskr.dataaccess.entities.Daily_Challenge_Solution import Daily_Challenge_Solution
#from random_word import RandomWords
import uuid
from datetime import timedelta
import random

class GenDAO:

    def __init__(self):
        pass

    def getPuzzles (self, upper_bound, lower_bound, numPuzzles):
        cursor = get_db().cursor()
        puzzleList = list()
        cursor.execute(
            'SELECT g_id FROM generated_games WHERE g_name = %s AND g_moves BETWEEN %s AND %s order by RAND() LIMIT %s',
            ('algo', lower_bound, upper_bound, numPuzzles))
        idlist = list()
        for row in cursor.fetchall():
            idlist.append(row[0])
        for id in idlist:
            cursor.execute('SELECT * FROM generated_games WHERE g_id=%s', (id,))
            row = cursor.fetchone()
            puzzleList.append(Gen(row[0], row[1], row[2], row[3], row[4], row[5], row[6]).serialize())
        return puzzleList

    def insert_daily_challenge(self,date,id1,id2,id3,id4,bestScore):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            'INSERT INTO daily_challenge (created, g_id1, g_id2, g_id3, g_id4,bestScore) VALUES (%s,%s,%s,%s,%s,%s)',
            (date,id1,id2,id3,id4,bestScore))
        db.commit()
        return None

    def insertPuzzles(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata):
        try:
            db = get_db()
            cursor = db.cursor()
            uri = uuid.uuid4().hex
            cursor.execute('INSERT INTO generated_games (g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata) VALUES (%s,%s,%s,%s,%s,%s)',(g_name, g_difficulty, g_puzzledata, uri, g_moves, g_solutiondata))
            db.commit()
            return cursor.lastrowid
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
        cursor.execute('SELECT * FROM daily_challenge WHERE CURRENT_TIMESTAMP() <= TIMESTAMPADD(day, +1, created) ORDER by created ASC LIMIT 1')
        row = cursor.fetchone()
        return (row[2],row[3],row[4],row[5])

    def insert_daily_challenge_submit(self, score, userid, solutiondata, name, dc_id,playerStateList):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO daily_challenge_submit (score,user_id,solutiondata,name,dc_id,playerStateList) VALUES (%s,%s,%s,%s,%s,%s)',(score, userid, solutiondata, name, dc_id,playerStateList))
            db.commit()
            return 'OK'
        except Exception as e:
            print('error in insert daily challenge submit')
            print(e)
        finally:
            pass


    def get_game_uri(self,uri):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * from generated_games WHERE g_id=(SELECT g_id from generated_games where g_uri=%s)',(uri,))
            return cursor.fetchone()
        except Exception as e:
            print('error in insert daily challenge submit')
            print(e)
        finally:
            pass


    def get_daily_challenge_highscores(self,dc_id):
        cursor = get_db().cursor()
        highscores = list()
        cursor.execute('SELECT * FROM daily_challenge_submit WHERE dc_id=%s ORDER by score ASC, submitted ASC',(dc_id,))
        for row in cursor.fetchall():
            highscores.append(Daily_Challenge_Solution(row[0], row[1], row[2], row[3], row[4], row[5],(row[6] - timedelta(hours=4)).strftime('%I:%M:%S %p').lstrip("0").replace(" 0", " "),row[7]).serialize())
        return highscores

    def get_daily_challenge_moves(self,dc_id,user_id):
        cursor = get_db().cursor()
        cursor.execute('SELECT solutiondata,playerStateList FROM daily_challenge_submit WHERE dc_id=%s and user_id=%s LIMIT 1',
                       (dc_id,user_id))
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            return (row[0],row[1])

    def get_daily_challenge_winners(self, dc_id):
        cursor = get_db().cursor()
        userlist = list()
        cursor.execute('''SELECT user_id FROM daily_challenge_submit dcs WHERE score=(SELECT MIN(score) FROM daily_challenge_submit dcs2 WHERE dcs2.dc_id = dcs.dc_id) AND dcs.dc_id != %s GROUP BY dcs.dc_id''',(dc_id,))
        for row in cursor.fetchall():
            userlist.append(row[0])
        return userlist

    def get_daily_challenge_id(self):
        try:
            cursor = get_db().cursor()
            cursor.execute('SELECT dc_id FROM daily_challenge WHERE CURRENT_TIMESTAMP() <= TIMESTAMPADD(day, +1, created) ORDER by created ASC LIMIT 1')
            row = cursor.fetchone()
            return row[0]
        except Exception as e:
            print(e)
            return 1
        finally:
            pass

    def check_current_daily_submit(self,userid,dc_id):
        cursor = get_db().cursor()
        cursor.execute('SELECT * FROM daily_challenge_submit WHERE dc_id=%s AND user_id=%s ORDER by score ASC LIMIT 1', (dc_id,userid))
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            return Daily_Challenge_Solution(row[0], row[1], row[2], row[3], row[4], row[5],row[6].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[7])

    def update_daily_challenge_submit(self,score, userid, solutiondata, name, dc_id,playerStateList):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('UPDATE daily_challenge_submit SET score=%s,solutiondata=%s,name=%s,submitted=CURRENT_TIMESTAMP,playerStatelist=%s WHERE user_id=%s AND dc_id=%s',(score, solutiondata, name,playerStateList, userid, dc_id))
            db.commit()
            return 'OK'
        except Exception as e:
            print('error in update_daily_challenge_submit')
            print(e)
        finally:
            pass

    def get_daily_challenge_history(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * from v_daily_history')
            DCHlist = list()
            for row in cursor.fetchall():
                DCHlist.append(Daily_Challenge_History_View(*row).serialize())
            return DCHlist
        except Exception as e:
            print(e)
            print('error in daily challenge history fetching')
        finally:
            pass