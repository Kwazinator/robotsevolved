from flaskr.db import get_db
from flaskr.dataaccess.entities.Game import Game
from flaskr.dataaccess.entities.GamesProfileView import GamesProfileView
#from random_word import RandomWords
from flaskr.dataaccess.entities.SolutionsProfileView import SolutionsProfileView
from flaskr.dataaccess.entities.Solutions import Solutions
import uuid

class GameDAO:

    def __init__(self):
        pass

    def insert_game(self,name, type, description, authorid, authorname, difficulty, puzzledata):
        try:
            db = get_db()
            cursor = db.cursor()
            #r = RandomWords()
            #uri = str(r.get_random_word())
            uri = uuid.uuid4().hex
            print(uri)
            cursor.execute('INSERT INTO game (name,type, description, authorid, authorname, difficulty, puzzledata,uri) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)',(name, type, description, authorid, authorname, difficulty, puzzledata,uri))
            db.commit()
            return uri
        except Exception as e:
            print('Error in GameDAO().insert_game')
            print(e)
        finally:
            pass

    def get_game(self,gameid):
        cursor = get_db().cursor()
        cursor.execute('SELECT * from game WHERE game_id=%s',(gameid,))
        row = cursor.fetchone()
        return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "))

    def check_same_game(self,puzzledata):
        cursor = get_db().cursor()
        cursor.execute('SELECT * from game WHERE puzzledata=%s',(puzzledata,))
        row = cursor.fetchone()
        if row is None:
            return 1
        else:
            return 0

    def update_highscore(self,solution_id,gameid, name, userid, authorname, solutiondata, highscore):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute(
            'UPDATE solutions SET solutiondata=%s,numMoves=%s WHERE solutions_id=%s',
            (solutiondata,highscore,solution_id))
        db.commit()
        return "Completed"

    def insert_highscore(self,gameid,name,userid,authorname,solutiondata,highscore):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('INSERT INTO solutions (gameid,comment,userid,authorname,solutiondata,numMoves) VALUES (%s,%s,%s,%s,%s,%s)',(gameid,name,userid,authorname,solutiondata,highscore))
        db.commit()
        return

    def get_game_uri(self, uri):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT * from game where uri=%s',(uri,))
        row = cursor.fetchone()
        return row

    def get_games_by_search(self,numPuzzles,Offset,searchterm):
        db = get_db()
        cursor = db.cursor()
        games = list()
        searchterm = ''.join(('%',searchterm,'%'))
        cursor.execute("SELECT * from game WHERE name LIKE %s AND type='type' OR authorname LIKE %s ORDER BY created DESC LIMIT %s OFFSET %s",(searchterm,searchterm,numPuzzles,Offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7],row[8],row[9].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " ")).serialize())
            return games
        else:
            return games

    def get_highscores(self,id):
        db = get_db()
        cursor = db.cursor()
        highscores = list()
        cursor.execute('SELECT * from solutions where gameid = %s ORDER BY numMoves ASC', (id,))
        for row in cursor.fetchall():
            highscores.append(Solutions(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " ")).serialize())
        return highscores

    def get_all_games(self, numGames,offset):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute("SELECT * from game WHERE type='type' ORDER BY created DESC LIMIT %s OFFSET %s",(numGames,offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7],row[8],row[9].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " ")).serialize())
            return games
        else:
            return games

    def get_games_profile_view(self,user_id):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute('''
        select min(numMoves), u.user_id as UserID, u.username as Username, u.profilePicture as profilePicture, g.game_id as gameID, g.name as GameName, g.puzzledata, g.created, g.uri
        from solutions s right join
        game g on s.gameid = g.game_id left join
        `user` u on u.user_id = s.userid
        where authorid = %s
        group by g.game_id
        ''',(user_id,))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(GamesProfileView(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[8]).serialize())
            return games
        else:
            return games


    def get_solutions_profile_view(self,user_id):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute('''
        select min(numMoves), g.game_id as gameID, g.name as GameName, g.puzzledata, g.created, g.uri
        from solutions s right join
        game g on s.gameid = g.game_id left join
        `user` u on u.user_id = s.userid
        where s.userid = %s
        group by g.game_id
        ''',(user_id,))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(SolutionsProfileView(row[0], row[1], row[2], row[3], row[4].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "), row[5]).serialize())
            return games
        else:
            return games