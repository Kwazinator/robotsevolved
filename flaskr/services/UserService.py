from flaskr.dataaccess.GameDAO import GameDAO
from flaskr.dataaccess.entities.Game import Game
import json
import datetime
from dateutil.relativedelta import relativedelta
from flask import current_app
import re

class UserService:

    def __init__(self):
        pass

    def insert_user(self,userID,logintype, accountID, profilePicture, email, activeFlag):
        return UserDAO().insert_game(userID,logintype, accountID, profilePicture, email, activeFlag)

    def get_user(self,userID):
        return UserDAO().get_user(userId)

    def delete_user(self,userID)
        return UserDAO().delete_user(userID)