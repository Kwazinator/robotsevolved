
import json
import random
import flaskr
from flaskr.services.GeneratorService import GeneratorService
import generator
from datetime import datetime
from datetime import timedelta
from collections import deque


week = {
    'Medium Mondays': ['medium','medium','medium','medium'],
    'Trouble Teusdays': ['hard','hard','hard','hard'],
    'Wild Wednesday': ['medium','medium','medium','medium'],
    'Tryhard Thursdays': ['hard','hard','hard','hard'],
    'Flyin Fridays': ['medium','medium','medium','medium'],
    'Sleepy Saturdays': ['easy','easy','easy','easy'],
    'Standard Sundays': ['hard','hard','hard','hard']
}

weekly = ['Medium Mondays','Trouble Teusdays','Wild Wednesday','Tryhard Thursdays','Flyin Fridays','Sleepy Saturdays','Standard Sundays']


if __name__ == "__main__":
    solution = generator.solver2(generator.boardgeneratorclassicTwoGoals())
    moves = solution['moves']
    solutiondata = solution['solutiondata']
    daypuzzle = {
            'puzzledata': generator.formatsolutiondataTwoGoal(solution),
            'moves': moves,
            'solutiondata': json.dumps(solutiondata)
        }
    app = flaskr.create_app()
    with app.app_context():
        totalMoves = 0
        listid = list()
        puzzleid = GeneratorService().insert_puzzle('random', 'easy????', daypuzzle['puzzledata'], 'abcdefgg', daypuzzle['moves'], daypuzzle['solutiondata'])
        print('puzzle id is follows:')
        print(puzzleid)


