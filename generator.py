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


def checkDeadendHorizontal(wallHorizontalList,WallVertToPlace,LastWall,width,height):
    indexX = WallVertToPlace['left']
    indexY = WallVertToPlace['top']
    isWallAbove = False
    for wall in wallHorizontalList:
        if (wall['top'] == indexY-4 and wall['left'] == indexX-1):
            isWallAbove = True

    isWallBeside = (LastWall['top'] == indexY and LastWall['left'] == (indexX - 1))

    return not (isWallAbove and isWallBeside)


def checkDeadendTop(wallVerticleList, WallHorizToPlace,wallHorizList,width,height):
    indexX = WallHorizToPlace['left']
    indexY = WallHorizToPlace['top']
    isWallAbove = False
    for wall in wallHorizList:
        if (wall['top'] == indexY-1 and wall['left'] == indexX):
            isWallAbove = True

    isWallBesideLeft = False
    isWallBesideRight = False
    for wall in wallVerticleList:
        if (wall['top'] == indexY - 1 and (wall['left'] == indexX)):
            isWallBesideLeft = True
        if (wall['top'] == indexY - 1 and (wall['left'] == indexX + 1)):
            isWallBesideRight = True
    return not ((isWallAbove and (isWallBesideLeft or isWallBesideRight)) or (isWallBesideLeft and isWallBesideRight))

def randomBoardPosition(dontPlacePositions,width,height):
    tryAgain = True
    while tryAgain:
        tryAgain = False
        Y = math.floor(random.random() * math.floor(height))
        X = math.floor(random.random() * math.floor(width))
        for position in dontPlacePositions:
            if (Y == position['top'] and X == position['left']):
                tryAgain = True
    return {'top': Y, 'left': X}





def classicstruct(top,left,randomnum):
    classicStructureHorizontal = [
        {'top': top,'left': left},
        {'top': top,'left': left},
        {'top': top + 1, 'left': left},
        {'top': top + 1, 'left': left},
        {'top': top, 'left': left + 1},
        {'top': top, 'left': left + 1},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left},
        {'top': top + 1, 'left': left},
        {'top': top + 2, 'left': left},
        {'top': top + 2, 'left': left},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 2, 'left': left + 1},
        {'top': top + 2, 'left': left + 1}
    ]
    classicStructureVert = [
        {'top': top, 'left': left},
        {'top': top, 'left': left + 1},
        {'top': top, 'left': left + 1},
        {'top': top, 'left': left},
        {'top': top, 'left': left + 1},
        {'top': top, 'left': left + 2},
        {'top': top, 'left': left + 2},
        {'top': top, 'left': left + 1},
        {'top': top + 1, 'left': left},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left},
        {'top': top + 1, 'left': left + 1},
        {'top': top + 1, 'left': left + 2},
        {'top': top + 1, 'left': left + 2},
        {'top': top + 1, 'left': left + 1}
    ]
    toreturnvert = classicStructureVert[randomnum]
    toreturnhoriz = classicStructureHorizontal[randomnum]
    return (toreturnvert,toreturnhoriz)


def boardgeneratorclassic():
    goalposrandom = random.randint(0, 15)
    wallHorizontal = list()
    wallVerticle = list()
    goalpos = None

    for j, item in enumerate(range(16)):
        for i, item in enumerate(range(16)):
            checkj = j
            checki = i
            if (checki < 1):
                wallVerticle.append({'top': checkj, 'left': checki, 'opacity': 1})
            elif (checki == (16-1)):
                wallVerticle.append({'top': checkj, 'left': checki+1, 'opacity': 1})
            if (checkj < 1):
                wallHorizontal.append({'top': checkj,'left': checki, 'opacity': 1})
            elif (checkj == (16-1)):
                wallHorizontal.append({'top': checkj+1, 'left': checki, 'opacity': 1})

    for i, nothing in enumerate(range(4)):
        for j, nothing2 in enumerate(range(4)):
            randomnum = random.randint(0, 15)
            if (i*4 + j == goalposrandom):
                goalspot = int(randomnum / 4)
                if goalspot == 1:
                    goalpos = {'top': i*3 + 1, 'left':j*3 + 1}
                elif goalspot == 2:
                    goalpos = {'top': i * 3 + 1, 'left': j * 3 + 2}
                elif goalspot == 3:
                    goalpos = {'top': i * 3 + 2, 'left': j * 3 + 1}
                else:
                    goalpos = {'top': i * 3 + 2, 'left': j * 3 + 2}
            walls = classicstruct(i*3 + 1,j*3 + 1,randomnum)
            wallHorizontal.append(walls[1])
            wallVerticle.append(walls[0])

    #randomize top walls
    first = random.randint(2,5)
    second = random.randint(11,14)
    third = random.randint(first + 2, second - 2)
    wallVerticle.append({'top': 0, 'left': first})
    wallVerticle.append({'top': 0, 'left': second})
    wallVerticle.append({'top': 0, 'left': third})

    #randomize bottom walls
    first = random.randint(2,5)
    second = random.randint(11,14)
    third = random.randint(first + 2, second - 2)
    wallVerticle.append({'top': 15, 'left': first})
    wallVerticle.append({'top': 15, 'left': second})
    wallVerticle.append({'top': 15, 'left': third})

    #randomize left walls
    first = random.randint(2,5)
    second = random.randint(11,14)
    third = random.randint(first + 2, second - 2)
    wallVerticle.append({'top': first, 'left': 0})
    wallVerticle.append({'top': second, 'left': 0})
    wallVerticle.append({'top': third, 'left': 0})

    #randomize right walls
    first = random.randint(2,5)
    second = random.randint(11,14)
    third = random.randint(first + 2, second - 2)
    wallVerticle.append({'top': first, 'left': 15})
    wallVerticle.append({'top': second, 'left': 15})
    wallVerticle.append({'top': third, 'left': 15})

    playerState = list()
    goal = {'top': math.floor(random.random() * math.floor(16)),
            'left': math.floor(random.random() * math.floor(16))}
    randomPositions = [goal]
    for i, item in enumerate(range(5)):
        randomPositions.append(randomBoardPosition(randomPositions,16,16))
    randompos1 = dict(randomPositions[1], **{'colorSignifier': 'blue', 'color': '#4169e1'})
    randompos2 = dict(randomPositions[2], **{'colorSignifier': 'green', 'color': '#228b22'})
    randompos3 = dict(randomPositions[3], **{'colorSignifier': 'red', 'color': '#b22222'})
    randompos4 = dict(randomPositions[4], **{'colorSignifier': 'yellow', 'color': '#ff8c00'})
    playerState.append(randompos1)
    playerState.append(randompos2)
    playerState.append(randompos3)
    playerState.append(randompos4)
    boardState = list()
    for j, item in enumerate(range(16)):
        for i, item in enumerate(range(16)):
            boardState.append({'top': j,'left': i})


    print(playerState)
    print(wallHorizontal)
    print(wallVerticle)
    print(goalpos)
    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'goal': goalpos,
        'boardState': boardState
    }


def boardgenerator(width=16,height=16,randomPercent=.9):
    boardState = list()
    wallVerticle = [{'top': 0, 'left': 0}]
    wallHorizontal = list()
    playerState = list()

    playerState = list()
    goal = {'top': math.floor(random.random() * math.floor(16)),
            'left': math.floor(random.random() * math.floor(16))}
    randomPositions = [goal]
    for i, item in enumerate(range(5)):
        randomPositions.append(randomBoardPosition(randomPositions,width,height))
    randompos1 = dict(randomPositions[1], **{'colorSignifier': 'blue', 'color': '#4169e1'})
    randompos2 = dict(randomPositions[2], **{'colorSignifier': 'green', 'color': '#228b22'})
    randompos3 = dict(randomPositions[3], **{'colorSignifier': 'red', 'color': '#b22222'})
    randompos4 = dict(randomPositions[4], **{'colorSignifier': 'yellow', 'color': '#ff8c00'})
    playerState.append(randompos1)
    playerState.append(randompos2)
    playerState.append(randompos3)
    playerState.append(randompos4)

    for j, item in enumerate(range(height)):
        for i, item in enumerate(range(width)):
            boardState.append({'top': j,'left': i})

    for j, item in enumerate(range(height)):
        for i, item in enumerate(range(width)):
            checkj = j
            checki = i
            if (checki < 1):
                wallVerticle.append({'top': checkj, 'left': checki, 'opacity': 1})
            elif (checki == (width-1)):
                wallVerticle.append({'top': checkj, 'left': checki+1, 'opacity': 1})
            if (checkj < 1):
                wallHorizontal.append({'top': checkj,'left': checki, 'opacity': 1})
            elif (checkj == (height-1)):
                wallHorizontal.append({'top': checkj+1, 'left': checki, 'opacity': 1})
    for j, item in enumerate(range(height)):
        for i, item in enumerate(range(width)):
            checkj = j
            checki = i
            if (checki > 1 and checki != (width-1) and random.random() > randomPercent):
                if (checkDeadendHorizontal(wallHorizontal, {'top': checkj, 'left': checki}, wallVerticle[len(wallVerticle)-1],width,height)):
                    wallVerticle.append({'top': checkj, 'left': checki, 'opacity': 1})
            if (checkj > 1 and checkj != (height - 1) and random.random() > randomPercent):
                if (checkDeadendTop(wallVerticle, {'top': j, 'left': i}, wallHorizontal, width, height)):
                    wallHorizontal.append({'top': checkj,'left': checki, 'opacity': 1})
    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'goal': goal,
        'boardState': boardState
    }

def runSearch(grid1,robots,colors,token,result):
    result.append(ricochet.search(model.Game(grid=grid1, robots=robots, col=colors, token=token)))


def solver(gamejson):
    playerstate = gamejson['playerState']
    wallsH = gamejson['wallHorizontal']
    wallsV = gamejson['wallVerticle']
    goal = gamejson['goal']

    newplayerstate = list()
    for player in playerstate:
        top = player['top']
        left = player['left']
        if player['colorSignifier'] == 'blue':
            color = 'B'
        elif player['colorSignifier'] == 'red':
            color = 'R'
        elif player['colorSignifier'] == 'yellow':
            color = 'Y'
        else:
            color = 'G'
        position = top * 16 + left
        newplayerstate.append({
            'position': int(position),
            'color': color
        })

    result = ['' for x in range(256)]

    wallsV = wallsV[1:]

    for wall in wallsH:
        top = wall['top']
        left = wall['left']
        if (top >= 16):
            top = top - 1
            position = top * 16 + left
            if (left < 16):
                result[int(position)] += 'S'
        else:
            position = top * 16 + left
            if (left < 16):
                result[int(position)] += 'N'
                if top != 0:
                    result[int(position) - 16] += 'S'

    for wall in wallsV:
        top = wall['top']
        left = wall['left']
        if (left >= 16):
            left = left - 1
            position = top * 16 + left
            if (top < 16):
                result[int(position)] += 'E'
        else:
            if (top < 16):
                position = top * 16 + left
                result[int(position)] += 'W'
                if left != 0:
                    result[int(position) - 1] += 'E'

    grid = result
    tokenlist = ['BH', 'GH', 'RH', 'YH']
    colors = list()
    robots = list()
    for player in newplayerstate:
        robots.append(player['position'])
        colors.append(player['color'])
    goaltop = goal['top']
    goalleft = goal['left']
    placeholder = grid[int(goaltop * 16 + goalleft)]
    paths = list()

    #threadArray = list()
    for x, token in enumerate(tokenlist):
        grid1 = grid
        grid1[int(goaltop * 16 + goalleft)] = placeholder + token
        for x, space in enumerate(grid1):
            if (space == ''):
                grid1[x] = 'X'

        result = list()
        print(grid1)
        print(robots)
        print(colors)
        print(token)
        #threadArray.append(threading.Thread(target=runSearch, args=(grid1,robots,colors,token,result)))
        paths.append(ricochet.search(model.Game(grid=grid1, robots=robots, col=colors, token=token)))

    '''for thread in threadArray:
        thread.start()
    for thread in threadArray:
        thread.join()
    print(result)
'''

    print('herererer')
    jsoning = json.loads(json.dumps(paths, indent=4))
    solutionnumbers = list()
    newpaths = list()
    for x, path in enumerate(jsoning):
        solution = list()
        for y, pathy in enumerate(path):
            if pathy[0] == 'G':
                solution.append('B' + pathy[1])
            elif pathy[0] == 'B':
                solution.append('R' + pathy[1])
            elif pathy[0] == 'R':
                solution.append('G' + pathy[1])
            else:
                solution.append('Y' + pathy[1])
        newpaths.append(solution)

    for x, num in enumerate(newpaths):
        solutionnumbers.append(len(num))

    minim = solutionnumbers[0]
    solutionindex = 0
    for x, number in enumerate(solutionnumbers):
        if minim >= number:
            minim = number
            solutionindex = x

    return {
        'playerState': playerstate,
        'wallHorizontal': wallsH,
        'wallVerticle': wallsV,
        'goal': goal,
        'moves': minim,
        'solutiondata': newpaths[solutionindex],
        'boardState': gamejson['boardState']
    }

def formatsolutiondata(solution):
    data = {
        'robotSelected': 0,
        'moveHistory': [],
        'uri': '',
        'createMode': 'No',
        'highscores': [],
        "ColoredLineDirections": [],
        "playerState": solution['playerState'],
        "gameWon": True,
        'boardState': solution['boardState'],
        'wallHorizontal': solution['wallHorizontal'],
        'wallVerticle': solution['wallVerticle'],
        'playerStart': solution['playerState'],
        'goal': solution['goal'],
        'height': 16,
        'width': 16
    }
    newdata = json.dumps(data)
    return newdata


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
            solution = solver(boardgenerator())
            moves = solution['moves']
            solutiondata = solution['solutiondata']
            if (moves >= 23 and not godflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'GodTeir', formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    godflag = True
                    print('found turkutier puzzle of ' + str(moves) + ' moves')
            elif (18 < moves < 23 and not exteremlyhardflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'Exteremly Hard', formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    exteremlyhardflag = True
                    print('found exteremlyhard puzzle of ' + str(moves) + ' moves')
            elif (13 < moves <= 18 and not hardflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'hard', formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    hardflag = True
                    print('found hard puzzle of ' + str(moves) + ' moves')
            elif (8 < moves <= 13 and not mediumflag):
                app = flaskr.create_app()
                with app.app_context():
                    GeneratorService().insert_puzzle('algo', 'medium', formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))
                    mediumflag = True
                    print('found medium puzzle of ' + str(moves) + ' moves')
            elif (5 <= moves <= 8 and not easyflag):
                app = flaskr.create_app()
                with app.app_context():
                    easyflag = True
                    print('found easy puzzle of ' + str(moves) + ' moves')
                    GeneratorService().insert_puzzle('algo', 'easy', formatsolutiondata(solution), 'abcdefg', moves, json.dumps(solutiondata))







