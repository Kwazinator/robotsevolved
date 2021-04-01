from flaskr.db import get_db
from flaskr.dataaccess.entities.User import User
from flaskr.dataaccess.entities.UserMetadata import UserMetadata
from flaskr.dataaccess.entities.GamesProfileView import GamesProfileView
from flaskr.dataaccess.entities.SolutionsProfileView import SolutionsProfileView
from flaskr.dataaccess.entities.PuzzleRushStatsProfileView import PuzzleRushStatsProfileView
#from random_word import RandomWords
from flaskr.dataaccess.entities.Solutions import Solutions
import uuid

class UserDAO:

    def __init__(self):
        pass


    def change_settings(self,userID,LineDir):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute("UPDATE user SET LineDirFlag=%s WHERE user_id=%s",(LineDir,userID))
            db.commit()
            return 'OK'
        except Exception as e:
            print('Error in UserDAO().insert_user')
            print(e)
        finally:
            pass


    def insert_user(self,username, logintype, accountID, profilePicture, email, activeFlag):
        try:
            db = get_db()
            cursor = db.cursor()
            row = cursor.execute('INSERT INTO user (username, logintype, accountID, profilePicture, email, activeFlag,OGname) VALUES (%s,%s,%s,%s,%s,%s,%s)',(username, logintype, accountID, profilePicture, email, activeFlag,username))
            db.commit()
            return cursor.lastrowid #return the userID that was created
        except Exception as e:
            print('Error in UserDAO().insert_user')
            print(e)
        finally:
            pass

    def get_user(self,userID):
        cursor = get_db().cursor()
        cursor.execute('SELECT * from user WHERE user_id=%s', (userID,))
        row = cursor.fetchone()
        if row is not None:
            return User(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
        else:
            return None

    def delete_user(self, userID):
        cursor = get_db().cursor()
        cursor.execute("UPDATE user SET activeFlag = 'N' WHERE user_id=%s", (userID,))
        row = cursor.fetchone()
        return

    def change_username(self, user_id, username):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute("UPDATE user SET username=%s WHERE user_id=%s",(username,user_id))
            db.commit()
            return 'OK'
        except Exception as e:
            print('Error in UserDAO().change_username')
            print(e)
        finally:
            pass

    def get_user_metadata(self,user_id):
        cursor = get_db().cursor()
        cursor.execute('''select crowns from Robots.v_findGame_leaderboard where WinnerUserID =%s''', (user_id,))
        row = cursor.fetchone()
        if row is None:
            find_game = 0
        else:
            find_game = row[0]
        cursor.execute('''select crowns from Robots.v_dailyChallenge_leaderboard vdc where user_id=%s''',(user_id,))
        row = cursor.fetchone()
        if row is None:
            daily = 0
        else:
            daily = row[0]
        cursor.execute('''SELECT count(wcs_id) from weekly_challenge_submit where user_id = %s and score = 100 and completed = 1''',(user_id,))
        row = cursor.fetchone()
        if row is None:
            weekly = 0
        else:
            weekly = row[0]
        return UserMetadata(user_id,find_game,daily,weekly).serialize()


    def has_user_voted(self,puzzleid,user_id):
        cursor = get_db().cursor()
        cursor.execute('SELECT user_id from vote WHERE user_id=%s and game_id=%s', (user_id,puzzleid))
        row = cursor.fetchone()
        if row is not None:
            return True
        else:
            return False


    def delete_vote_user(self,user_id,puzzleid):
        try:
            db = get_db()
            cursor = db.cursor()
            cursor.execute("DELETE from vote WHERE user_id=%s and game_id=%s",(user_id,puzzleid))
            db.commit()
            return 'OK'
        except Exception as e:
            print('Error in UserDAO().delete vote user')
            print(e)
        finally:
            pass



    def insert_vote_user(self,vote,user_id,puzzleid):
        try:
            db = get_db()
            cursor = db.cursor()
            row = cursor.execute('INSERT INTO vote (user_id, game_id, votedata) VALUES (%s,%s,%s)',(user_id,puzzleid,vote))
            db.commit()
            return cursor.lastrowid #return the userID that was created
        except Exception as e:
            print('Error in UserDAO().insert vote user')
            print(e)
        finally:
            pass


    def get_user_by_logintype(self,accountID,logintype):
        cursor = get_db().cursor()
        cursor.execute("SELECT * from user WHERE accountID=%s and logintype=%s", (accountID, logintype))
        row = cursor.fetchone()
        if row is not None:
            return User(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
        else:
            return None

    def username_not_taken(self,username,user_id):
        cursor = get_db().cursor()
        cursor.execute("SELECT * from user WHERE username=%s or OGname=%s and user_id!=%s", (username,username,user_id))
        row = cursor.fetchone()
        if row is not None:
            return False
        else:
            return True