import random
import math
import json
import model
import random
import ricochet
from flaskr.db import get_db
import flaskr
from flaskr.services.GameService import GameService
from flaskr.services.GeneratorService import GeneratorService
import generator
from datetime import datetime
from datetime import timedelta
from collections import deque


week = {
    'Medium Mondays': ['medium','medium','medium','medium'],
    'TryHard Teusday': ['Exteremly Hard','hard','hard','Exteremly Hard'],
    'Wild Wednesday': ['hard','hard','medium','medium'],
    'Tilted Thursday': ['hard','medium','Exteremly Hard','easy'],
    'Flyin Fridays': ['easy','easy','easy','medium'],
    'Sleepy Saturdays': ['easy','medium','easy','medium'],
    'Standard Sundays': ['medium','hard','medium','easy']
}

weekly = ['Medium Mondays','TryHard Teusday','Wild Wednesday','Tilted Thursday','Flyin Fridays','Sleepy Saturdays','Standard Sundays']


if __name__ == "__main__":
    now = datetime.now()
    now = now.replace(hour=19,minute=0,second=0)
    dayonnow = 0
    dayofweek = -2
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
                    solution = generator.solver(generator.boardgeneratorclassic())
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
                                'puzzledata': generator.formatsolutiondata(solution),
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
                    print('found ' + daypuzzle['difficulty'] + ' puzzle of ' + daypuzzle['moves'] + ' moves')
                    totalMoves += daypuzzle['moves']
                    listid.append(GeneratorService().insert_puzzle('dailyChallenge', daypuzzle['difficulty'], daypuzzle['puzzledata'], 'abcdefg', daypuzzle['moves'], daypuzzle['solutiondata']))
                random.shuffle(listid)
                GeneratorService().insert_daily_challenge(now+timedelta(days=dayonnow),listid[0],listid[1],listid[2],listid[3],totalMoves)
            dayonnow += 1


        '''
                                app = flaskr.create_app()
                        with app.app_context():
                            print('found ' + puzzleis + ' puzzle of ' + str(moves) + ' moves')
                            GeneratorService().insert_puzzle('dailyChallenge', puzzleis, generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
        '''