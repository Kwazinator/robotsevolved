from flaskr.db import get_db
from flaskr.dataaccess.entities.PuzzleRush import PuzzleRush
from flaskr.dataaccess.entities.Gen import Gen
from flaskr.dataaccess.entities.PuzzleRushStatsProfileView import PuzzleRushStatsProfileView
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
            SELECT pr_id
            FROM puzzle_rush
            WHERE pr_id = %s and CURRENT_TIMESTAMP() <= TIMESTAMPADD(minute, +5, p_start_time)""",
            (p_id,))
        row = cursor.fetchone()
        if row is None:
            return False
        else:
            return True

    def start_puzzle(self, user_id, difficulty,type):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('INSERT INTO puzzle_rush (user_id,difficulty,type) VALUES (%s,%s,%s)',(user_id,difficulty,type))
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
        cursor.execute('SELECT * FROM puzzle_rush WHERE pr_id=%s', (p_id,))
        row = cursor.fetchone()
        if row is not None:
            return PuzzleRush(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        else:
            return None

    def get_puzzle_rush_profile_view(self, user_id):
        cursor = get_db().cursor()
        cursor.execute('''
        select
        (select MAX(score) from puzzle_rush pr1 where difficulty='easy' and user_id=%s and type='classic' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='medium' and user_id=%s and type='classic' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='hard' and user_id=%s and type='classic' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='Exteremely Hard' and user_id=%s and type='classic' and totalMoves is not null),
        (select MAX(score) from puzzle_rush pr1 where difficulty='easy' and user_id=%s and type='algo' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='medium' and user_id=%s and type='algo' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='hard' and user_id=%s and type='algo' and totalMoves is not null),
        (select MAX(score) from puzzle_rush where difficulty='Exteremely Hard' and user_id=%s and type='algo' and totalMoves is not null),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush pr1 where difficulty='easy' and user_id=%s and totalMoves is not null and type='classic'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='medium' and user_id=%s and totalMoves is not null and type='classic'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='hard' and user_id=%s and totalMoves is not null and type='classic'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='Exteremely Hard' and user_id=%s and totalMoves is not null and type='classic'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush pr1 where difficulty='easy' and user_id=%s and totalMoves is not null and type='algo'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='medium' and user_id=%s and totalMoves is not null and type='algo'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='hard' and user_id=%s and totalMoves is not null and type='algo'),
        (select MAX(score * 7 - differenceFrom) from puzzle_rush where difficulty='Exteremely Hard' and user_id=%s and totalMoves is not null and type='algo')
        ''', (user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id,user_id))
        row = cursor.fetchone()
        if row is not None:
            return PuzzleRushStatsProfileView(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13],row[14],row[15]).serialize()
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
            cursor.execute('UPDATE puzzle_rush SET score = score + 1 WHERE pr_id=%s',(p_id,))
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
            cursor.execute('UPDATE puzzle_rush SET totalMoves=%s,differenceFrom=%s WHERE pr_id=%s',(totalMoves,differenceFrom,p_id))
            db.commit()
            return 'completed'
        except Exception as e:
            print(e)
            return 'failed'
        finally:
            pass
    def get_random_game(self, difficulty,type):
        cursor = get_db().cursor()
        cursor.execute('SELECT g_id FROM generated_games WHERE g_difficulty=%s and g_name=%s order by RAND() LIMIT 1',(difficulty,type))
        row = cursor.fetchone()
        cursor.execute('SELECT * FROM generated_games WHERE g_id=%s',(row[0],))
        row = cursor.fetchone()
        return Gen(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).serialize()

