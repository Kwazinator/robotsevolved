from flaskr.db import get_db
from flaskr.dataaccess.entities.Game import Game
from random_word import RandomWords
from flaskr.dataaccess.entities.Solutions import Solutions

class GameDAO:

    def __init__(self):
        pass

    def insert_game(self,name, type, description, authorid, authorname, difficulty, puzzledata):
        try:
            db = get_db()
            cursor = db.cursor()
            r = RandomWords()
            uri = str(r.get_random_word()) + str(r.get_random_word())
            print(uri)
            cursor.execute('INSERT INTO game (name,type, description, authorid, authorname, difficulty, puzzledata,uri) VALUES (?,?,?,?,?,?,?,?)',(name, type, description, authorid, authorname, difficulty, puzzledata,uri))
            db.commit()
            return uri
        except Exception as e:
            print('Error in GameDAO().insert_game')
            print(e)
        finally:
            pass

    def get_game(self,gameid):
        cursor = get_db().cursor()
        row = cursor.execute('SELECT * from game WHERE id=?',(gameid,)).fetchone()
        return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])

    def check_same_game(self,puzzledata):
        cursor = get_db().cursor()
        row = cursor.execute('SELECT * from game WHERE puzzledata=?',(puzzledata,)).fetchone()
        if row is None:
            return 1
        else:
            return 0

    def insert_highscore(self,gameid,name,userid,authorname,solutiondata,highscore):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('INSERT INTO solutions (gameid,comment,userid,authorname,solutiondata,numMoves) VALUES (?,?,?,?,?,?)',(gameid,name,userid,authorname,solutiondata,highscore))
        db.commit()
        return

    def get_game_uri(self, uri):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('SELECT * from game where uri=?',(uri,)).fetchone()
        return row

    def get_highscores(self,id):
        db = get_db()
        cursor = db.cursor()
        highscores = list()
        for row in cursor.execute('SELECT * from solutions where gameid = ? ORDER BY numMoves ASC',(id,)).fetchall():
            highscores.append(Solutions(row[0],row[1],row[2],row[3],row[4],row[5],row[6]).serialize())
        return highscores