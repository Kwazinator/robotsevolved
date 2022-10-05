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

    def getPuzzles (self, upper_bound, lower_bound, numPuzzles,type):
        cursor = get_db().cursor()
        puzzleList = list()
        cursor.execute(
            'SELECT g_id FROM generated_games WHERE g_name = %s AND g_moves BETWEEN %s AND %s order by RAND() LIMIT %s',
            (type, lower_bound, upper_bound, numPuzzles))
        idlist = list()
        for row in cursor.fetchall():
            idlist.append(row[0])
        for id in idlist:
            cursor.execute('SELECT * FROM generated_games WHERE g_id=%s', (id,))
            row = cursor.fetchone()
            puzzleList.append(Gen(row[0], row[1], row[2], row[3], row[4], row[5], row[6]).serialize())
        return puzzleList

    def get_daily_challenge_puzzledata(self,dc_id):
        cursor = get_db().cursor()
        cursor.execute("""SELECT gg.g_puzzledata from generated_games gg where gg.g_id IN ((SELECT g_id1 FROM daily_challenge WHERE dc_id = %s),(SELECT g_id2 FROM daily_challenge WHERE dc_id = %s),(SELECT g_id3 FROM daily_challenge WHERE dc_id = %s),(SELECT g_id4 FROM daily_challenge WHERE dc_id = %s))""",
                       (dc_id,dc_id,dc_id,dc_id))
        return cursor.fetchall()



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
            cursor.execute('INSERT INTO daily_challenge_submit (score,user_id,solutiondata,name,dc_id,playerStateList,completed) VALUES (%s,%s,%s,%s,%s,%s,1)',(score, userid, solutiondata, name, dc_id,playerStateList))
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
        cursor.execute('''SELECT dcs.dcs_id,dcs.score,dcs.user_id,dcs.solutiondata,dcs.name,dcs.dc_id,TIMEDIFF(submitted,startTime),dcs.playerStateList,u.logintype FROM daily_challenge_submit dcs
                          JOIN user u on dcs.user_id = u.user_id
                          WHERE dc_id=%s and completed = 1
                          ORDER by score ASC, TIMEDIFF(submitted,startTime) ASC''',(dc_id,))
        for row in cursor.fetchall():
            if row[8] == 'anon':
                userID = 1
            else:
                userID = row[2]
            print(row[6])
            seconds = row[6].seconds
            hours = seconds//3600
            minutes = (seconds//60)%60
            seconds = seconds % 60
            if hours == 0:
                hours = ''
            else:
                hours = str(hours) + ':'
            if minutes <= 9 and hours != '':
                minutes = '0' + str(minutes)
            if seconds <= 9:
                seconds = '0' + str(seconds)
            highscores.append(Daily_Challenge_Solution(row[0], row[1], userID, row[3], row[4], row[5],hours + (str(minutes) + ':' + str(seconds)),row[7]).serialize())
        return highscores

    def get_daily_challenge_moves(self,dc_id,user_id):
        cursor = get_db().cursor()
        cursor.execute('SELECT solutiondata,playerStateList FROM daily_challenge_submit WHERE dc_id=%s and user_id=%s and completed = 1 LIMIT 1',
                       (dc_id,user_id))
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            print(row[0])
            print(row[1])
            return (row[0],row[1])

    def get_daily_challenge_winners(self):
        cursor = get_db().cursor()
        userlistandcrowns = {}
        cursor.execute('''  SELECT COUNT(u.user_id ) as Crowns, u.user_id, u.username FROM daily_challenge_submit dcs
                            JOIN user u on dcs.user_id =u.user_id
                            WHERE dcs.user_id = (SELECT user_id FROM daily_challenge_submit WHERE dc_id=dcs.dc_id ORDER by score ASC, TIMEDIFF(submitted,startTime) ASC LIMIT 1) and u.user_id <> 1 and dcs.dc_id <>
                                (select
                                    max(daily_challenge.dc_id)
                                from
                                    daily_challenge
                                where
                                    (now() >= daily_challenge.created))
                            group by u.user_id
                            ORDER by Crowns desc''')
        for row in cursor.fetchall():
            userlistandcrowns.update({row[1]: row[0]})
        return userlistandcrowns

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
            return Daily_Challenge_Solution(row[0], row[1], row[2], row[3], row[4], row[5],(row[6]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[7])

    def update_daily_challenge_submit(self,score, userid, solutiondata, name, dc_id,playerStateList):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('UPDATE daily_challenge_submit SET score=%s,solutiondata=%s,name=%s,submitted=CURRENT_TIMESTAMP,playerStatelist=%s,completed=1 WHERE user_id=%s AND dc_id=%s',(score, solutiondata, name,playerStateList, userid, dc_id))
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

    def get_last_daily_evolution(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('Select g_id1,created from daily_evolution ORDER BY created desc LIMIT 1')
            row = cursor.fetchone()
            print(row[1])
            return row[1]
        except Exception as e:
            print(e)
        finally:
            pass

    def insert_daily_evolution(self, date, id1, id2, id3, id4, type):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO daily_evolution (created, g_id1, g_id2, g_id3, g_id4, type) VALUES (%s,%s,%s,%s,%s,%s)',
                (date, id1, id2, id3, id4, type))
            db.commit()
            return None
        except Exception as e:
            print(e)
        finally:
            pass


    def get_last_daily_challenge(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT g_id1,created from daily_challenge ORDER BY created desc LIMIT 1')
            row = cursor.fetchone()
            cursor.execute('SELECT g_name from generated_games where g_id=%s',(row[0],))
            row2 = cursor.fetchone()
            return (row[1],row2[0])
        except Exception as e:
            print(e)
        finally:
            pass
