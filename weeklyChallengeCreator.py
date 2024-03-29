
import json
import random
import flaskr
import math
from flaskr.services.GeneratorService import GeneratorService
from flaskr.services.WeeklyChallengeService import WeeklyChallengeService
import generator
from datetime import datetime
from datetime import timedelta
from collections import deque


def solver(lowerbound, upperbound, type):
    print(lowerbound)
    print(upperbound)
    print(type)
    while (True):
        if type == '2goalsclassic':
            solution = generator.solver2(generator.boardgeneratorclassicTwoGoals())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            solution = generator.formatsolutiondataTwoGoal(solution)
        elif type == '1goalclassic':
            solution = generator.solver(generator.boardgeneratorclassic())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            solution = generator.formatsolutiondata(solution)
        elif type == '2goalrandom':
            solution = generator.solver2(generator.boardgeneratorRandomTwoGoals())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            solution = generator.formatsolutiondataTwoGoal(solution)
        elif type == '1goalrandom':
            solution = generator.solver(generator.boardgenerator())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            solution = generator.formatsolutiondata(solution)
        else:
            print('error')
            return
        if (lowerbound <= moves <= upperbound):
            print('found solution of ' + str(moves) + ' moves')
            return {
                    'puzzledata': solution,
                    'moves': moves,
                    'solutiondata': json.dumps(solutiondata)
            }


types = ['2goalsclassic','1goalclassic','2goalrandom','1goalrandom']

if __name__ == "__main__":
    now = datetime.now()
    now = now + timedelta(days=-now.weekday(),weeks=0)
    weekonnow = 0
    while (True):
        order = types
        random.shuffle(order)
        weekpuzzles = list()
        moves = 1
        solution = 0
        NotFound = True
        solution1 = solver(17,20,order[0])
        solution2 = solver(20,23,order[1])
        solution3 = solver(19,21,order[2])
        moves1 = solution1['moves']
        moves2 = solution2['moves']
        moves3 = solution3['moves']
        difference = math.floor((100 - (moves1 + moves2 + moves3))/2)
        solution4 = solver(difference,difference+1,order[3])
        moves4 = solution4['moves']
        solution5 = solver((100-(moves1+moves2+moves3+moves4)),(100-(moves1+moves2+moves3+moves4)),order[random.randint(0,3)])
        weekpuzzles.append(solution1)
        weekpuzzles.append(solution2)
        weekpuzzles.append(solution3)
        weekpuzzles.append(solution4)
        weekpuzzles.append(solution5)
        app = flaskr.create_app()
        with app.app_context():
            totalMoves = 100
            listid = list()
            numberfortheWC = WeeklyChallengeService().insert_weekly_challenge(now + timedelta(weeks=weekonnow), totalMoves)
            for puzzle in weekpuzzles:
                print('found ' + ' puzzle of ' + str(puzzle['moves']) + ' moves')
                listid.append(WeeklyChallengeService().insert_puzzle('Weekly 100', 'Hard', puzzle['puzzledata'], 'abcdefg', puzzle['moves'], puzzle['solutiondata'], numberfortheWC))
        weekonnow += 1
