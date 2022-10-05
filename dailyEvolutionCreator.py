
import json
import random
from flaskr.databaseOnly import create_app
from flaskr.services.GeneratorService import GeneratorService
import generatorEvolution
from datetime import datetime
from datetime import timedelta
from collections import deque




if __name__ == "__main__":
    while (True):
        dayonnow = 1
        puzzlelist = list()
        for j, item in enumerate(range(4)):
            puzzle = generatorEvolution.generateEvolutionTwoGoal() # to be created
            puzzlelist.append(
                {
                    'difficulty': 'hard',
                    'puzzledata': generatorEvolution.formatsolutiondataTwoGoalEvo(puzzle),
                    'moves': 1,
                    'solutiondata': 'None'
                }
            )
        app = create_app()
        with app.app_context():
            last_daily_tuple = GeneratorService().get_last_daily_evolution()
            now = last_daily_tuple.replace(hour=19, minute=0, second=0)
            totalMoves = 0
            listid = list()
            for daypuzzle in puzzlelist:
                print('found ' + str(daypuzzle['difficulty']) + ' puzzle of ' + str(daypuzzle['moves']) + ' moves')
                totalMoves += daypuzzle['moves']
                listid.append(GeneratorService().insert_puzzle('dailyEvo', daypuzzle['difficulty'], daypuzzle['puzzledata'], 'abcdefg', daypuzzle['moves'], daypuzzle['solutiondata']))
            random.shuffle(listid)
            GeneratorService().insert_daily_evolution(now+timedelta(days=dayonnow),listid[0],listid[1],listid[2],listid[3],totalMoves)
        dayonnow += 1
