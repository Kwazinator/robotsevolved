from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.wc_Solution import wc_Solution
from flaskr.dataaccess.entities.Daily_Challenge_History_View import Daily_Challenge_History_View
from flaskr.dataaccess.entities.Daily_Challenge_Solution import Daily_Challenge_Solution
#from random_word import RandomWords
from flaskr.dataaccess.GenDAO import GenDAO
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

    def get_wc_id(self):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT wc_id FROM weekly_challenge WHERE CURRENT_TIMESTAMP() <= TIMESTAMPADD(day, +7, created) ORDER by created ASC LIMIT 1')
            row = cursor.fetchone()
            return row[0]
        except Exception as e:
            print(e)
            return 1
        finally:
            pass

    def get_wc_puzzles(self,wc_id):
        try:
            db = get_db()
            cursor = db.cursor()
            puzzlelist= list()
            cursor.execute('SELECT g_id from generated_games where g_weekly = %s',(wc_id,))
            for puzzle in cursor.fetchall():
                puzzlelist.append(GenDAO().get_puzzle_by_id(puzzle[0]))
            return puzzlelist
        except Exception as e:
            print(e)
        finally:
            pass

    def get_wc_highscores(self,wc_id):
        try:
            db = get_db()
            cursor = db.cursor()
            highscores = list()
            cursor.execute('''
            SELECT wcs.*,u.logintype
            FROM weekly_challenge_submit wcs
            JOIN user u on wcs.user_id = u.user_id
            WHERE wc_id=%s and completed and display
            ORDER by score ASC, submitted ASC
            ''',(wc_id,))
            for row in cursor.fetchall():
                highscores.append(wc_Solution(*row).serialize())
            return highscores
        except Exception as e:
            print(e)
        finally:
            pass

    def get_wc_moves(self,wc_id,userID):
        cursor = get_db().cursor()
        cursor.execute('''
            SELECT solutiondata,playerstatelist,gamesWon FROM weekly_challenge_submit WHERE wc_id = %s and user_id = %s LIMIT 1
        ''',(wc_id,userID))
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            return(row[0],row[1],row[2])


    def get_wc_winners(self):
        db = get_db()
        cursor = db.cursor()
        userlistandcrowns = {}
        cursor.execute('''  SELECT COUNT(u.user_id ) as Crowns, u.user_id, u.username FROM weekly_challenge_submit wcs
                            JOIN user u on wcs.user_id = u.user_id
                            WHERE score=100 and completed = 1
                            group by wcs.wcs_id
                            ORDER by Crowns desc''')
        for row in cursor.fetchall():
            userlistandcrowns.update({row[1]: row[0]})
        return userlistandcrowns

    def has_submitted(self,userID,wc_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
        select * from weekly_challenge_submit
        where user_id = %s and wc_id = %s
        ''',(userID,wc_id))
        row = cursor.fetchone()
        if row is None:
            return False
        else:
            return True

    def is_completed(self, userID, wc_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
                select score,completed from weekly_challenge_submit
                where user_id = %s and wc_id = %s
                ''', (userID, wc_id))
        row = cursor.fetchone()
        return [row[1],row[0]]

    def update_submit_answer(self,score,userID, solutiondata, name, wc_id,playerStateList,completed,display,gamesWon):
        db = get_db()
        cursor = db.cursor()
        if display is None:
            if name is None:
                cursor.execute('''
                UPDATE weekly_challenge_submit
                SET score=%s,solutiondata=%s,playerStateList=%s,completed=%s,gamesWon=%s
                WHERE user_id=%s and wc_id=%s
                ''',(score,solutiondata,playerStateList,completed,gamesWon,userID,wc_id))
            else:
                cursor.execute('''
                                UPDATE weekly_challenge_submit
                                SET score=%s,solutiondata=%s,name=%s,playerStateList=%s,completed=%s,gamesWon=%s
                                WHERE user_id=%s and wc_id=%s
                                ''', (score, solutiondata,name, playerStateList, completed,gamesWon, userID, wc_id))
        elif display == 1:
            if name is None:
                cursor.execute('''
                            UPDATE weekly_challenge_submit
                            SET score=%s,solutiondata=%s,playerStateList=%s,completed=%s,display=%s,gamesWon=%s
                            WHERE user_id=%s and wc_id=%s
                            ''', (score, solutiondata, playerStateList, completed, display,gamesWon,userID, wc_id))
            else:
                cursor.execute('''
                                        UPDATE weekly_challenge_submit
                                        SET score=%s,solutiondata=%s,name=%s,playerStateList=%s,completed=%s,display=%s,gamesWon=%s
                                        WHERE user_id=%s and wc_id=%s
                                        ''',
                               (score, solutiondata, name, playerStateList, completed, display,gamesWon, userID, wc_id))
        db.commit()
        return

    def insert_submit_answer(self,score,userID, solutiondata, name, wc_id,playerStateList,completed,display,gamesWon):
        db = get_db()
        cursor = db.cursor()
        if display is None:
            if name is None:
                cursor.execute('''
                        INSERT INTO weekly_challenge_submit (score,user_id,solutiondata,wc_id,playerStateList,completed,gamesWon)
                        VALUES (%s,%s,%s,%s,%s,%s,%s)
                        ''', (score, userID, solutiondata, wc_id, playerStateList, completed,gamesWon))
            else:
                cursor.execute('''
                                        INSERT INTO weekly_challenge_submit (score,user_id,solutiondata,name,wc_id,playerStateList,completed,gamesWon)
                                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
                                        ''', (score, userID, solutiondata, name,wc_id, playerStateList, completed,gamesWon))
        else:
            if name is None:
                cursor.execute('''
                                        INSERT INTO weekly_challenge_submit (score,user_id,solutiondata,wc_id,playerStateList,completed,display,gamesWon)
                                        VALUES (%s,%s,%s,%s,%s,%s,%s.%s)
                                        ''', (score, userID, solutiondata, wc_id, playerStateList, completed,display,gamesWon))
            else:
                cursor.execute('''
                                        INSERT INTO weekly_challenge_submit (score,user_id,solutiondata,name,wc_id,playerStateList,completed,display,gamesWon)
                                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                                        ''', (score, userID, solutiondata,name, wc_id, playerStateList, completed,display,gamesWon))
        db.commit()
        return
