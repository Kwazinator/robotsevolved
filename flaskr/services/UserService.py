from flaskr.dataaccess.entities.Game import Game
from flaskr.dataaccess.UserDAO import UserDAO
from flask_jwt_extended import create_refresh_token, create_access_token
import datetime

class UserService:

    def __init__(self):
        pass

    def get_user_games_view(self,userID):
        return UserDAO().get_user_games_view(userID)

    def get_user_solutions_view(self,userID):
        return UserDAO().get_user_solutions_view(userID)

    def get_user_puzzlerush_view(self,userID):
        return UserDAO().get_user_puzzlerush_view(userID)


    def insert_user(self,username,logintype, accountID, profilePicture, email, activeFlag):
        return UserDAO().insert_user(username,logintype, accountID, profilePicture, email, activeFlag)

    def get_user_by_logintype(self,accountID,logintype):
        return UserDAO().get_user_by_logintype(accountID,logintype)

    def get_user(self,userID):
        return UserDAO().get_user(userID)

    def delete_user(self,userID):
        return UserDAO().delete_user(userID)

    def create_jwt(self, userID):
        access_token = create_access_token(identity=userID, expires_delta=datetime.timedelta(weeks=32))
        refresh_token = create_refresh_token(identity=userID, expires_delta=datetime.timedelta(weeks=52))
        jwt = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
        return jwt