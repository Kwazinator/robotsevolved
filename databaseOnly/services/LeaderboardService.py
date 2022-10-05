from flaskr.dataaccess.LeaderboardDAO import LeaderboardDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re
from flaskr.solutionChecker import checkSolution

class LeaderboardService:

    def __init__(self):
        pass

    def get_daily_challenge_leaderboard(self):
        return LeaderboardDAO().get_daily_challenge_leaderboard()

    def get_find_game_leaderboard(self):
        return LeaderboardDAO().get_find_game_leaderboard()

    def get_puzzle_rush_leaderboard(self):
        return LeaderboardDAO().get_puzzle_rush_leaderboard()