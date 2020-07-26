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



    #def get_puzzle_rush_data(self, p_id):
        #generatedgameslist = PuzzleRushDAO().get_puzzles_of_puzzle_rush(p_id)

    def get_games_for_puzzle_rush(self, p_id, numPuzzles,difficulty,type):
        if (PuzzleRushDAO().check_game_valid(p_id)):
            if difficulty == 'easy':
                #do stuff etc check for all
                games = GenDAO().getPuzzles(8, 5, numPuzzles,type)
            elif difficulty == 'medium':
                games = GenDAO().getPuzzles(13, 9, numPuzzles,type)
            elif difficulty == 'hard':
                games = GenDAO().getPuzzles(18, 14, numPuzzles,type)
            elif difficulty == 'Exteremly Hard':
                games = GenDAO().getPuzzles(22, 19, numPuzzles,type)
            elif difficulty == 'godly':
                games = GenDAO().getPuzzles(50, 23, numPuzzles,type)
        else:
            return 'Game has ended'
        gamelist = list()
        for game in games:
            if PuzzleRushDAO().match_game_to_puzzle(p_id, game['g_id']) == 'completed':
                gamelist.append(game)
        return gamelist

    def get_puzzle_rush(self, p_id):
        return PuzzleRushDAO().get_puzzle_rush(p_id)

    def start_puzzle(self, user_id, difficulty,type):
        if type != 'classic':
            type = 'algo'
        p_id = PuzzleRushDAO().start_puzzle(user_id,difficulty,type)
        games = self.get_games_for_puzzle_rush(p_id,20,difficulty,type)
        return (games, p_id)

    def submit_solution_rush(self, p_id, g_id, solutiondata):
        if (PuzzleRushDAO().check_game_valid(p_id)):
            #check solution data based on g_id
            PuzzleRushDAO().increment_score(p_id)
        return

    def end_puzzle_rush_game(self, p_id,totalMoves,differenceFrom):
        PuzzleRushDAO().end_puzzle_rush_game(p_id,totalMoves,differenceFrom)

    def get_random_game(self, difficulty,type):
        if type != 'classic':
            type = 'algo'
        return PuzzleRushDAO().get_random_game(difficulty,type)

    def get_puzzle_rush_profile_view(self,user_id):
        return PuzzleRushDAO().get_puzzle_rush_profile_view(user_id)