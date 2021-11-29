import json
import random
import flaskr
from flaskr.services.GeneratorService import GeneratorService
import generator
from datetime import datetime
from datetime import timedelta
from collections import deque


if __name__ == "__main__":
    now = datetime.now()
    now = now.replace(hour=19,minute=0,second=0)
    dayonnow = 1
    app = flaskr.create_app()
    with app.app_context():
        last_daily_tuple = GeneratorService().get_last_daily_challenge()
        now = last_daily_tuple[0].replace(hour=19,minute=0,second=0)
        g_name = last_daily_tuple[1]
        if g_name == 'Medium Mondays':
            dayofweek = 0
        elif g_name == 'Trouble Tuesdays':
            dayofweek = -1
        elif g_name == 'Wild Wednesday':
            dayofweek = -2
        elif g_name == 'Tryhard Thursdays':
            dayofweek = -3
        elif g_name == 'Flyin Fridays':
            dayofweek = -4
        elif g_name == 'Sleepy Saturdays':
            dayofweek = -5
        elif g_name == 'Standard Sundays':
            dayofweek = -6

week = {
    'Medium Mondays': ['medium', 'medium', 'medium', 'medium'],
    'Trouble Tuesdays': ['hard', 'hard', 'hard', 'hard'],
    'Wild Wednesday': ['medium', 'medium', 'medium', 'medium'],
    'Tryhard Thursdays': ['hard', 'hard', 'hard', 'hard'],
    'Flyin Fridays': ['medium', 'medium', 'medium', 'medium'],
    'Sleepy Saturdays': ['medium', 'medium', 'medium', 'medium'],
    'Standard Sundays': ['medium', 'medium', 'medium', 'medium']
}

weekly = ['Medium Mondays', 'Trouble Tuesdays', 'Wild Wednesday', 'Tryhard Thursdays', 'Flyin Fridays',
          'Sleepy Saturdays', 'Standard Sundays']

if __name__ == "__main__":
    dayofweek = 5
    dayonnow = 1
    app = flaskr.create_app()
    with app.app_context():
        last_daily_tuple = GeneratorService().get_last_daily_challenge()
        now = last_daily_tuple[0].replace(hour=19, minute=0, second=0)
        g_name = last_daily_tuple[1]
        if g_name == 'Medium Mondays':
            dayofweek = -1
        elif g_name == 'Trouble Tuesdays':
            dayofweek = -2
        elif g_name == 'Wild Wednesday':
            dayofweek = -3
        elif g_name == 'Tryhard Thursdays':
            dayofweek = -4
        elif g_name == 'Flyin Fridays':
            dayofweek = -5
        elif g_name == 'Sleepy Saturdays':
            dayofweek = -6
        elif g_name == 'Standard Sundays':
            dayofweek = 0
    weekly = deque(weekly)
    weekly.rotate(dayofweek)
    while (True):
        moves = 1
        solution = 0
        NotFound = True
        for puzzleday in weekly:
            daypuzzles = list()
            classicorrandom = ['c', 'r', 'r', 'c']
            random.shuffle(classicorrandom)
            for difficultypuzzle in week[puzzleday]:
                NotFound = True
                while (NotFound):
                    if classicorrandom[-1] == 'c':
                        horiz = generator.getHorizontalLineBoard()
                        vert = generator.getVerticleLineBoard()
                        solution = generator.solver2(generator.boardgeneratorclassicTwoGoalsCustom(vert, horiz))
                        moves = solution['moves']
                        solutiondata = solution['solutiondata']
                        solution = generator.formatsolutiondataTwoGoal(solution)
                    else:
                        solution = generator.solver2(generator.boardgeneratorRandomTwoGoalsCustom(generator.getVerticleLineBoard(),generator.getHorizontalLineBoard()))
                        moves = solution['moves']
                        solutiondata = solution['solutiondata']
                        solution = generator.formatsolutiondataTwoGoal(solution)
                    if (moves >= 23):
                        puzzleis = 'GodTeir'
                    elif (17 < moves < 23):
                        puzzleis = 'Exteremly Hard'
                    elif (13 < moves <= 17):
                        puzzleis = 'hard'
                    elif (8 < moves <= 13):
                        puzzleis = 'medium'
                    elif (5 <= moves <= 8):
                        puzzleis = 'easy'
                    else:
                        puzzleis = 'trash'
                    if difficultypuzzle == puzzleis:
                        daypuzzles.append(
                            {
                                'difficulty': puzzleis,
                                'puzzledata': solution,
                                'moves': moves,
                                'solutiondata': json.dumps(solutiondata)
                            }
                        )
                        NotFound = False
                        classicorrandom.pop()
            app = flaskr.create_app()
            with app.app_context():
                totalMoves = 0
                listid = list()
                for daypuzzle in daypuzzles:
                    print('found ' + str(daypuzzle['difficulty']) + ' puzzle of ' + str(daypuzzle['moves']) + ' moves')
                    totalMoves += daypuzzle['moves']
                    listid.append(
                        GeneratorService().insert_puzzle(puzzleday, daypuzzle['difficulty'], daypuzzle['puzzledata'],
                                                         'abcdefg', daypuzzle['moves'], daypuzzle['solutiondata']))
                random.shuffle(listid)
                GeneratorService().insert_daily_challenge(now + timedelta(days=dayonnow), listid[0], listid[1],
                                                          listid[2], listid[3], totalMoves)
            dayonnow += 1

        '''
                                app = flaskr.create_app()
                        with app.app_context():
                            print('found ' + puzzleis + ' puzzle of ' + str(moves) + ' moves')
                            GeneratorService().insert_puzzle('dailyChallenge', puzzleis, generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
        '''
