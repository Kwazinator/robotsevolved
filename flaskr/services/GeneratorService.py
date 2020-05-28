from flaskr.dataaccess.GenDAO import GenDAO
from flaskr.dataaccess.entities.Gen import Gen
import json
import datetime
from flask import current_app
import re

class GeneratorService:

    def __init__(self):
        pass

    def getPuzzles(self, upper_bound, lower_bound, numPuzzles):
        return GenDAO().getPuzzles(upper_bound, lower_bound, numPuzzles)

    def insert_puzzle(self, g_name, g_difficulty, g_puzzledata, g_uri, g_moves):
        return GenDAO().insertPuzzles(g_name, g_difficulty, g_puzzledata, g_uri, g_moves)
