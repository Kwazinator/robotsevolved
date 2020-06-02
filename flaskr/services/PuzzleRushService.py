from flaskr.dataaccess.PuzzleRushDAO import PuzzleRushDAO
from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re

class PuzzleRushService:

    def __init__(self):
        pass



    def get_games_for_puzzle_rush(self, p_id, numPuzzles,difficulty):
        if difficulty == 'easy':
            #do stuff etc check for all
            games = GenDAO().getPuzzles(8, 5, numPuzzles)
        gamelist = list()
        for game in games:
            if PuzzleRushDAO().match_game_to_puzzle(p_id, game['g_id']) == 'completed':
                gamelist.append(game)
        return gamelist

    def get_puzzle_rush(self, p_id):
        return PuzzleRushDAO().get_puzzle_rush(p_id)

    def start_puzzle(self, user_id, difficulty):
        p_id = PuzzleRushDAO().start_puzzle(user_id,difficulty)
        games = self.get_games_for_puzzle_rush(p_id,10,difficulty)
        return (games, p_id)

    def submit_solution_rush(self, p_id, g_id, solutiondata):
        #alot of shit here
        return