from flaskr.dataaccess.entities.Game import Game
from flaskr.dataaccess.UserDAO import UserDAO
from flaskr.dataaccess.GameDAO import GameDAO
from flask_jwt_extended import create_refresh_token, create_access_token
import datetime

class UserService:

    def __init__(self):
        pass

    def change_settings(self,userID, LineDir):
        return UserDAO().change_settings(userID,LineDir)

    def get_user_games_view(self,userID):
        return UserDAO().get_user_games_view(userID)

    def get_user_solutions_view(self,userID):
        return UserDAO().get_user_solutions_view(userID)

    def get_user_puzzlerush_view(self,userID):
        return UserDAO().get_user_puzzlerush_view(userID)

    def change_name(self, user_id, username):
        return UserDAO().change_username(user_id, username)

    def insert_user(self,username,logintype, accountID, profilePicture, email, activeFlag):
        return UserDAO().insert_user(username,logintype, accountID, profilePicture, email, activeFlag)

    def get_user_by_logintype(self,accountID,logintype):
        return UserDAO().get_user_by_logintype(accountID,logintype)


    def is_daily_started(self, user_id, dc_id):
        return UserDAO().is_daily_started(user_id, dc_id)

    def start_daily(self, user_id, dc_id):
        return UserDAO().start_daily(user_id, dc_id)

    def get_user(self,userID):
        return UserDAO().get_user(userID)

    def delete_user(self,userID):
        return UserDAO().delete_user(userID)

    def create_jwt(self, userID):
        access_token = create_access_token(identity=userID, expires_delta=datetime.timedelta(weeks=80))
        refresh_token = create_refresh_token(identity=userID, expires_delta=datetime.timedelta(weeks=104))
        jwt = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
        return jwt

    def vote_Puzzle_Action(self,vote,user_id,puzzleid,action):
        hasvoted = UserDAO().has_user_voted(puzzleid,user_id)
        if hasvoted and action=='remove':
            UserDAO().delete_vote_user(user_id,puzzleid)
            return {'votes': GameDAO().get_likes_game(puzzleid)}
        elif not hasvoted and action=='create':
            UserDAO().insert_vote_user(vote,user_id,puzzleid)
            return {'votes': GameDAO().get_likes_game(puzzleid)}
        else:
            return {'votes': 'wrong request parameters for Voting in UserService.vote_Puzzle_Action'}



    def change_username(self,user_id,username):
        if (UserDAO().username_not_taken(username,user_id)):
            if (len(username) < 2):
                return 'must be at least 2 characters'
            else:
                return UserDAO().change_username(user_id, username)
        else:
            return 'Username has been taken'

    def get_daily_time(self, userID, dc_id):
        return UserDAO().get_daily_time(userID, dc_id)