from flaskr.db import get_db
from flaskr.dataaccess.entities.PuzzleRush import PuzzleRush
#from random_word import RandomWords
import uuid

class PuzzleRushDAO:

    def __init__(self):
        pass

    def start_puzzle(self, user_id, difficulty):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO puzzle_rush (user_id,difficulty) VALUES (?,?)',(user_id,difficulty))
            db.commit()
            return cursor.lastrowid
        except Exception as e:
            print(e)
            print('error in PuzzleRushDAO start_puzzle')
        finally:
            pass

    def get_puzzle_rush(self, p_id):
        cursor = get_db().cursor()
        row = cursor.execute('SELECT * FROM puzzle_rush WHERE p_id=?',(p_id,)).fetchone()
        if row is not None:
            return PuzzleRush(row[0],row[1],row[2],row[3],row[4])
        else:
            return None

    def match_game_to_puzzle(self,p_id,g_id):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO puzzle_rush_to_generated_games (g_id,pr_id) VALUES (?,?)',(g_id,p_id))
            db.commit()
            return 'completed'
        except Exception as e:
            print(e)
            return 'failed'
        finally:
            pass
