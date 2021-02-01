
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
    now = datetime.now()
    now = now.replace(hour=19,minute=0,second=0)
    dayonnow = 1
    dayofweek = 0
    weekly = deque(weekly)
    weekly.rotate(dayofweek)
    while (True):
        moves = 1
        solution = 0
        NotFound = True
        for puzzleday in weekly:
            daypuzzles = list()
            for difficultypuzzle in week[puzzleday]:
                NotFound = True
                while (NotFound):
                    solution = generator.solver2(generator.boardgeneratorclassicTwoGoals())
                    moves = solution['moves']
                    solutiondata = solution['solutiondata']
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
                                'puzzledata': generator.formatsolutiondataTwoGoal(solution),
                                'moves': moves,
                                'solutiondata': json.dumps(solutiondata)
                            }
                        )
                        NotFound = False
            app = flaskr.create_app()
            with app.app_context():
                totalMoves = 0
                listid = list()
                for daypuzzle in daypuzzles:
                    print('found ' + str(daypuzzle['difficulty']) + ' puzzle of ' + str(daypuzzle['moves']) + ' moves')
                    totalMoves += daypuzzle['moves']
                    listid.append(GeneratorService().insert_puzzle(puzzleday, daypuzzle['difficulty'], daypuzzle['puzzledata'], 'abcdefg', daypuzzle['moves'], daypuzzle['solutiondata']))
                random.shuffle(listid)
                GeneratorService().insert_daily_challenge(now+timedelta(days=dayonnow),listid[0],listid[1],listid[2],listid[3],totalMoves)
            dayonnow += 1


        '''
                                app = flaskr.create_app()
                        with app.app_context():
                            print('found ' + puzzleis + ' puzzle of ' + str(moves) + ' moves')
                            GeneratorService().insert_puzzle('dailyChallenge', puzzleis, generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
        '''
