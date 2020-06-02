from flaskr.db import get_db
from flaskr.dataaccess.entities.Gen import Gen
#from random_word import RandomWords
import uuid

class GenDAO:

    def __init__(self):
        pass

    def getPuzzles (self, upper_bound, lower_bound, numPuzzles):
        cursor = get_db().cursor()
        puzzleList = list()
        for row in cursor.execute('SELECT * FROM generated_games where g_moves between ? and ? order by random() LIMIT ?', (lower_bound, upper_bound, numPuzzles)).fetchall():
            puzzleList.append(Gen(row[0], row[1], row[2], row[3], row[4], row[5],row[6]).serialize())
        return puzzleList

    def insertPuzzles(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata):
        try:
            db = get_db()
            cursor = db.cursor()
            uri = uuid.uuid4().hex
            print(uri)
            cursor.execute('INSERT INTO generated_games (g_name, g_difficulty, g_puzzledata, g_uri, g_moves,g_solutiondata) VALUES (?,?,?,?,?,?)',(g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata))
            db.commit()
            return uri
        except Exception as e:
            print('Error in GenDAO().insertPuzzles')
            print(e)
        finally:
            pass