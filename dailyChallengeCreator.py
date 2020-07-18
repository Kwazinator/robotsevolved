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


week = {
    'Medium Mondays': 'medium,medium,medium,medium',
    'TryHard Teusday': 'exhard,hard,hard,exhard',
    'Wild Wednesday': 'hard,hard,medium,medium',
    'Tilted Thursday': 'hard,medium,exhard,easy',
    'Flyin Fridays': 'easy,easy,easy,medium',
    'Sleepy Saturdays': 'easy,medium,easy,medium',
    'Standard Sundays': 'med,hard,med,easy'
}

weekly = ['Medium Mondays','TryHard Teusday','Wild Wednesday','Tilted Thursday','Flyin Fridays','Sleepy Satudays','Standard Sunday']


if __name__ == "__main__":
    dayofweek = 1
    while (True):
        moves = 1
        solution = 0
        NotFound = True
        for puzzlediff in weekly[dayofweek]:
            while (NotFound):
                solution = generator.solver(generator.boardgeneratorclassic())
                moves = solution['moves']
                solutiondata = solution['solutiondata']


                if (moves >= 23):
                    puzzleis = 'godteir'
                elif (17 < moves < 23):
                    puzzleis = 'exhard'
                elif (13 < moves <= 17):
                    puzzleis = 'hard'
                elif (8 < moves <= 13):
                    puzzleis = 'medium'
                elif (5 <= moves <= 8):
                    puzzleis = 'easy'
                if puzzleis == puzzlediff:
                    app = flaskr.create_app()
                    with app.app_context():
                        print('found ' + puzzleis + ' puzzle of ' + str(moves) + ' moves')
                        GeneratorService().insert_puzzle('algo', puzzleis, generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    NotFound = False
        dayofweek = (dayofweek + 1) % 7