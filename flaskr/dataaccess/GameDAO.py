from flaskr.db import get_db
from flaskr.dataaccess.entities.Game import Game
from flaskr.dataaccess.entities.GamesProfileView import GamesProfileView
#from random_word import RandomWords
from flaskr.dataaccess.entities.SolutionsProfileView import SolutionsProfileView
from flaskr.dataaccess.entities.Solutions import Solutions
import uuid
from datetime import timedelta

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

    def get_likes_game(self,puzzleid):
        try:
            cursor = get_db().cursor()
            cursor.execute("SELECT count(vote_id) from vote WHERE game_id=%s", (puzzleid,))
            row = cursor.fetchone()
            return row[0]
        except Exception as e:
            print('Error in get_likes_game')
            print(e)
            return 0
        finally:
            pass

    def increment_plays(self,gameid):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('UPDATE game SET plays=plays+1 WHERE game_id=%s',(gameid,))
            db.commit()
        except Exception as e:
            print('Error in GameDAO().insert_game')
            print(e)
        finally:
            pass

    def get_game(self,gameid):
        cursor = get_db().cursor()
        cursor.execute('SELECT * from game WHERE game_id=%s',(gameid,))
        row = cursor.fetchone()
        return Game(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],(row[9] - timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[10])

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
            'UPDATE solutions SET solutiondata=%s,numMoves=%s,created=CURRENT_TIMESTAMP WHERE solutions_id=%s',
            (solutiondata,highscore,solution_id))
        db.commit()
        return "Completed"

    def insert_highscore(self,gameid,name,userid,authorname,solutiondata,highscore):
        db = get_db()
        cursor = db.cursor()
        row = cursor.execute('INSERT INTO solutions (gameid,comment,userid,authorname,solutiondata,numMoves) VALUES (%s,%s,%s,%s,%s,%s)',(gameid,name,userid,authorname,solutiondata,highscore))
        db.commit()
        return

    def get_game_uri_from_user_id(self,uri,user_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT game_id as GAMEID,name,type,description,authorid,authorname,difficulty,puzzledata,uri,created,plays,(SELECT count(vote_id) from vote WHERE game_id=GAMEID) as votes,(SELECT votedata from vote WHERE game_id=GAMEID and user_id=%s) from game where uri=%s',(user_id,uri))
        row = cursor.fetchone()
        return row

    def get_game_uri(self,uri):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT * from game where uri=%s',(uri,))
        row = cursor.fetchone()
        return row

    def get_games_by_search(self,numPuzzles,Offset,searchterm,userID):
        db = get_db()
        cursor = db.cursor()
        games = list()
        searchterm = ''.join(('%', searchterm, '%'))
        cursor.execute("SELECT game_id as GAMEID,name,type,description,authorid,authorname,difficulty,uri,created,plays,(SELECT count(vote_id) from vote WHERE game_id=GAMEID) as votes,(SELECT votedata from vote WHERE game_id=GAMEID and user_id=%s) as hasvoted from game WHERE name LIKE %s AND type='type' OR authorname LIKE %s AND type='type' ORDER BY created DESC LIMIT %s OFFSET %s",(userID,searchterm,searchterm,numPuzzles,Offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], '',row[7],row[8].strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[9],row[10],row[11]).serialize())
            return games
        else:
            return games

    def get_games_by_search_most_played(self,numPuzzles,Offset,searchterm,userID):
        db = get_db()
        cursor = db.cursor()
        games = list()
        searchterm = ''.join(('%', searchterm, '%'))
        cursor.execute("SELECT game_id as GAMEID,name,type,description,authorid,authorname,difficulty,uri,created,plays,(SELECT count(vote_id) from vote WHERE game_id=GAMEID) as votes,(SELECT votedata from vote WHERE game_id=GAMEID and user_id=%s) as hasvoted from game WHERE name LIKE %s AND type='type' OR authorname LIKE %s AND type='type' ORDER BY plays DESC LIMIT %s OFFSET %s",(userID,searchterm,searchterm,numPuzzles,Offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], '',row[7],(row[8]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[9],row[10],row[11]).serialize())
            return games
        else:
            return games
            
    def get_games_by_search_most_liked(self,numPuzzles,Offset,searchterm,userID):
        db = get_db()
        cursor = db.cursor()
        games = list()
        searchterm = ''.join(('%', searchterm, '%'))
        cursor.execute("SELECT game_id as GAMEID,name,type,description,authorid,authorname,difficulty,uri,created,plays,(SELECT count(vote_id) from vote WHERE game_id=GAMEID) as votes,(SELECT votedata from vote WHERE game_id=GAMEID and user_id=%s) as hasvoted from game WHERE name LIKE %s AND type='type' OR authorname LIKE %s AND type='type' ORDER BY votes DESC LIMIT %s OFFSET %s",(userID,searchterm,searchterm,numPuzzles,Offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], '',row[7],(row[8]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[9],row[10],row[11]).serialize())
            return games
        else:
            return games

    def get_games_by_search_highest_score(self, numPuzzles, Offset, searchterm,userID):
        db = get_db()
        cursor = db.cursor()
        games = list()
        searchterm = ''.join(('%', searchterm, '%'))
        cursor.execute(
            """SELECT g.game_id as GAMEID,g.name,g.type,g.description,g.authorid,g.authorname,g.difficulty,g.uri,g.created,g.plays,(SELECT count(vote_id) from vote WHERE game_id=GAMEID) as votes,(SELECT votedata from vote WHERE game_id=GAMEID and user_id=%s) as hasvoted,MIN(s.numMoves) from game g
                JOIN solutions s ON g.game_id = s.gameid 
                WHERE g.name LIKE %s AND type='type' OR
                g.authorname LIKE %s AND type='type'
                GROUP BY g.game_id
                ORDER BY s.numMoves DESC LIMIT %s OFFSET %s""",
            (userID,searchterm, searchterm, numPuzzles, Offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], '', row[7],
                                  (row[8] - timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),
                                  row[9],row[10],row[11]).serialize())
            return games
        else:
            return games

    def get_highscores(self,id):
        db = get_db()
        cursor = db.cursor()
        highscores = list()
        cursor.execute('''SELECT s.*,u.logintype from solutions s
                          JOIN user u on u.user_id = s.userid
                          WHERE s.gameid = %s ORDER BY numMoves,created ASC''', (id,))
        for row in cursor.fetchall():
            if row[8] == 'anon':
                userID = 1
            else:
                userID = row[3]
            highscores.append(Solutions(row[0],row[1],row[2],userID,row[4],row[5],row[6],(row[7] - timedelta(hours=4)).strftime('%b %d, %Y %I:%M%p').lstrip("0").replace(" 0", " ")).serialize())
        return highscores

    def get_all_games(self, numGames,offset):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute("SELECT game_id,name,type,description,authorid,authorname,difficulty,uri,created,plays from game WHERE type='type' ORDER BY created DESC LIMIT %s OFFSET %s",(numGames,offset))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(Game(row[0], row[1], row[2], row[3], row[4], row[5], row[6], '',row[7],(row[8]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[9]).serialize())
            return games
        else:
            return games

    def get_games_profile_view(self,user_id):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute('''
        select min(numMoves), u.user_id as UserID, u.username as Username, u.profilePicture as profilePicture, g.game_id, g.name as GameName, g.puzzledata, g.created, g.uri, g.plays,(SELECT count(vote_id) from vote WHERE game_id=g.game_id) as votes,(SELECT votedata from vote WHERE game_id=g.game_id and user_id=%s) as hasvoted
        from solutions s right join
        game g on s.gameid = g.game_id left join
        `user` u on u.user_id = s.userid
        where authorid = %s
        group by g.game_id
        ''',(user_id,user_id))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(GamesProfileView(row[0], row[1], row[2], row[3], row[4], row[5], row[6], (row[7]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[8],row[9],row[10],row[11]).serialize())
            return games
        else:
            return games


    def get_solutions_profile_view(self,user_id):
        db = get_db()
        cursor = db.cursor()
        games = list()
        cursor.execute('''
        select min(numMoves), g.game_id, g.name as GameName, g.puzzledata, g.created, g.uri,
		(SELECT se.solutions_id from solutions se where gameid = g.game_id ORDER BY numMoves,created ASC LIMIT 1) as WinnerSolutionID,
		(SELECT seo.userid from solutions seo WHERE solutions_id=WinnerSolutionID) as WinnerUserID,
		(SELECT sed.comment from solutions sed WHERE solutions_id=WinnerSolutionID) as WinnerUsername,
		(SELECT see.created from solutions see WHERE solutions_id=WinnerSolutionID) as WinnerCreated,
		(SELECT count(vote_id) from vote WHERE game_id=g.game_id) as votes,
		(SELECT votedata from vote WHERE game_id=g.game_id and user_id=%s) as hasvoted
        from solutions s right join
        game g on s.gameid = g.game_id left join
        `user` u on u.user_id = s.userid
        where s.userid = %s
        group by g.game_id ORDER by created DESC
        ''',(user_id,user_id))
        query = cursor.fetchall()
        if query is not None:
            for row in query:
                games.append(SolutionsProfileView(row[0], row[1], row[2], row[3], (row[4]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "), row[5],row[6],row[7],row[8],(row[9]- timedelta(hours=4)).strftime('%b %d, %Y %I%p').lstrip("0").replace(" 0", " "),row[10],row[11]).serialize())
            return games
        else:
            return games