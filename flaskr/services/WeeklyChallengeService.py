from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.WC_DAO import WC_DAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re
from flaskr.solutionChecker import checkSolution

class WeeklyChallengeService:

    def __init__(self):
        pass

    def insert_weekly_challenge(self, datetime, totalMoves):
        return WC_DAO().insert_weekly_challenge(datetime,totalMoves)

    def insert_puzzle(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata, WC_ID):
        return WC_DAO().insertPuzzles(g_name, g_difficulty, g_puzzledata, g_uri, g_moves, g_solutiondata, WC_ID)