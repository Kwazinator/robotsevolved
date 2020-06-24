from flaskr.db import get_db
from flaskr.dataaccess.entities.PuzzleRush import PuzzleRush
#from random_word import RandomWords
import uuid
import datetime


class PuzzleRushDAO:

    def __init__(self):
        pass

    def check_game_valid(self,p_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """
            SELECT p_id
            FROM puzzle_rush
            WHERE p_id = %s and CURRENT_TIMESTAMP() <= TIMESTAMPADD(minute, +5, p_start_time)""",
            (p_id,))
        row = cursor.fetchone()
        if row is None:
            return False
        else:
            return True

    def start_puzzle(self, user_id, difficulty):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO puzzle_rush (user_id,difficulty) VALUES (%s,%s)',(user_id,difficulty))
            db.commit()
            lastrowid = cursor.lastrowid
            return lastrowid
        except Exception as e:
            print(e)
            print('error in PuzzleRushDAO start_puzzle')
        finally:
            pass

    def get_puzzle_rush(self, p_id):
        cursor = get_db().cursor()
        cursor.execute('SELECT * FROM puzzle_rush WHERE p_id=%s', (p_id,))
        row = cursor.fetchone()
        if row is not None:
            return PuzzleRush(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
        else:
            return None

    def match_game_to_puzzle(self,p_id,g_id):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO puzzle_rush_to_generated_games (g_id,pr_id) VALUES (%s,%s)',(g_id,p_id))
            db.commit()
            return 'completed'
        except Exception as e:
            print(e)
            return 'failed'
        finally:
            pass

    def increment_score(self, p_id):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('UPDATE puzzle_rush SET score = score + 1 WHERE p_id=%s',(p_id,))
            db.commit()
            return 'completed'
        except Exception as e:
            print(e)
            return 'failed'
        finally:
            pass

    def end_puzzle_rush_game(self, p_id, totalMoves, differenceFrom):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('UPDATE puzzle_rush SET totalMoves=%s,differenceFrom=%s WHERE p_id=%s',(totalMoves,differenceFrom,p_id))
            db.commit()
            return 'completed'
        except Exception as e:
            print(e)
            return 'failed'
        finally:
            pass
