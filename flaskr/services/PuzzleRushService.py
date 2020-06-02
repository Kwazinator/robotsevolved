from flaskr.dataaccess.PuzzleRushDAO import PuzzleRushDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re

class PuzzleRushService:

    def __init__(self):
        pass

    def start_puzzle(self, user_id, difficulty):
        PuzzleRushDAO().start_puzzle(user_id, difficulty)

    def get_games_for_puzzle_rush(self, p_id, ):
        return

    def get_puzzle_rush(self, p_id):
        return PuzzleRushDAO().get_puzzle_rush(p_id)

    def submit_solution_rush(self, p_id, g_id, solutiondata):
        #alot of shit here
        return