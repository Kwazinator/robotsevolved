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


if __name__ == "__main__":
    while (True):
        moves = 1
        solution = 0
        easyflag = False
        mediumflag = False
        hardflag = False
        exteremlyhardflag = False
        godflag = False
        while (not (easyflag and mediumflag and hardflag and exteremlyhardflag)):
            solution = generator.solver(generator.boardgeneratorclassic())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            if (moves >= 17 and not godflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'GodTeir', generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    godflag = True
                    print('found turkutier puzzle of ' + str(moves) + ' moves')
            elif (15 < moves < 17 and not exteremlyhardflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'Exteremly Hard', generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    exteremlyhardflag = True
                    print('found exteremlyhard puzzle of ' + str(moves) + ' moves')
            elif (13 < moves <= 15 and not hardflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'hard', generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    hardflag = True
                    print('found hard puzzle of ' + str(moves) + ' moves')
            elif (8 < moves <= 13 and not mediumflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'medium', generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    mediumflag = True
                    print('found medium puzzle of ' + str(moves) + ' moves')
            elif (5 <= moves <= 8 and not easyflag):
                app = flaskr.create_app()
                with app.app_context():
                    easyflag = True
                    print('found easy puzzle of ' + str(moves) + ' moves')
                    GeneratorService().insert_puzzle('algo', 'easy', generator.formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))