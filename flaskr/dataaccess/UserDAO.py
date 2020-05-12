from flaskr.db import get_db
from flaskr.dataaccess.entities.User import User
#from random_word import RandomWords
from flaskr.dataaccess.entities.Solutions import Solutions
import uuid

class UserDAO:

    def __init__(self):
        pass

    def insert_user(self,username, logintype, accountID, profilePicture, email, activeFlag):
        try:
            db = get_db()
            cursor = db.cursor()
            row = cursor.execute('INSERT INTO user (username, logintype, accountID, profilePicture, email, activeFlag) VALUES (?,?,?,?,?,?)',(username, logintype, accountID, profilePicture, email, activeFlag))
            db.commit()
            return cursor.lastrowid #return the userID that was created
        except Exception as e:
            print('Error in UserDAO().insert_user')
            print(e)
        finally:
            pass

    def get_user(self,userID):
        cursor = get_db().cursor()
        row = cursor.execute('SELECT * from user WHERE userID=?',(userID,)).fetchone()
        return User(row[0],row[1],row[2],row[3],row[4],row[5],row[6])

    def delete_user(self, userID):
        cursor = get_db().cursor()
        row = cursor.execute("UPDATE user SET activeFlag = 'N' WHERE userID=?", (userID,)).fetchone()
        return


    def get_user_by_logintype(self,accountID,logintype):
        cursor = get_db().cursor()
        row = cursor.execute("SELECT * from user WHERE accountID=? and logintype=?", (accountID,logintype)).fetchone()
        if row is not None:
            return User(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
        else:
            return None