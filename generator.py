import random
import math
import json
import model
import ricochet
from flaskr.db import get_db
import flaskr
from flaskr.services.GameService import GameService


def checkDeadendHorizontal(wallHorizontalList,WallVertToPlace,LastWall,width,height):
    indexX = WallVertToPlace['left']
    indexY = WallVertToPlace['top']
    isWallAbove = False
    for wall in wallHorizontalList:
        if (wall['top'] == indexY-4 and wall['left'] == indexX-40):
            isWallAbove = True

    isWallBeside = (LastWall['top'] == indexY and LastWall['left'] == (indexX - 44))

    return not (isWallAbove and isWallBeside)


def checkDeadendTop(wallVerticleList, WallHorizToPlace,wallHorizList,width,height):
    indexX = WallHorizToPlace['left']
    indexY = WallHorizToPlace['top']
    isWallAbove = False
    for wall in wallHorizList:
        if (wall['top'] == indexY-44 and wall['left'] == indexX):
            isWallAbove = True

    isWallBesideLeft = False
    isWallBesideRight = False
    for wall in wallVerticleList:
        if (wall['top'] == indexY - 40 and (wall['left'] == indexX - 4)):
            isWallBesideLeft = True
        if (wall['top'] == indexY - 40 and (wall['left'] == indexX + 36)):
            isWallBesideRight = True

    return not ((isWallAbove and (isWallBesideLeft or isWallBesideRight)) or (isWallBesideLeft and isWallBesideRight))

def randomBoardPosition(dontPlacePositions,width,height):
    tryAgain = True
    while tryAgain:
        tryAgain = False;
        Y = math.floor(random.random() * math.floor(height / 40));
        X = math.floor(random.random() * math.floor(width / 40));
        for position in dontPlacePositions:
            if (Y*40 == position['top'] and X*40 == position['left']):
                tryAgain = True
    return {'top': Y*40, 'left': X*40}

def boardgenerator(width=640,height=640,randomPercent=.9):
    boardState = list()
    wallVerticle = [{'top': 0, 'left': -4}]
    wallHorizontal = list()
    playerState = list()
    goal = {'top': math.floor(random.random() * math.floor(height / 40)) * 40,
            'left': math.floor(random.random() * math.floor(width / 40)) * 40}
    randomPositions = [goal]

    for i, item in enumerate(range(5)):
        randomPositions.append(randomBoardPosition(randomPositions,width,height))
    randompos1 = dict(randomPositions[1], **{'colorSignifier': 'blue'})
    randompos2 = dict(randomPositions[2], **{'colorSignifier': 'green'})
    randompos3 = dict(randomPositions[3], **{'colorSignifier': 'red'})
    randompos4 = dict(randomPositions[4], **{'colorSignifier': 'yellow'})
    playerState.append(randompos1)
    playerState.append(randompos2)
    playerState.append(randompos3)
    playerState.append(randompos4)

    for j, item in enumerate(range(int(height/40))):
        for i, item in enumerate(range(int(width/40))):
            boardState.append({'top': j*40,'left': i*40})

    for j, item in enumerate(range(int(height/40))):
        for i, item in enumerate(range(int(width/40))):
            checkj = j*40
            checki = i*40
            if (checki < 1):
                wallVerticle.append({'top': checkj, 'left': checki-4})
            elif (checki == (width-40)):
                wallVerticle.append({'top': checkj, 'left': checki+36})
            if (checkj < 1):
                wallHorizontal.append({'top': checkj-4,'left': checki})
            elif (checkj == (height-40)):
                wallHorizontal.append({'top': checkj+36, 'left': checki})


    for j, item in enumerate(range(int(height/40))):
        for i, item in enumerate(range(int(width/40))):
            checkj = j*40
            checki = i*40
            if (checki > 1 and checki != (width-40) and random.random() > randomPercent):
                if (checkDeadendHorizontal(wallHorizontal, {'top': checkj, 'left': checki}, wallVerticle[len(wallVerticle)-1],width,height)):
                    wallVerticle.append({'top': checkj, 'left': checki - 4})
            if (checkj > 1 and checkj != (height - 40) and random.random() > randomPercent):
                if (checkDeadendTop(wallVerticle, {'top': j, 'left': i}, wallHorizontal, width, height)):
                    wallHorizontal.append({'top': checkj - 4,'left': checki})

    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'goal': goal,
        'boardState': boardState
    }

def solver(gamejson):
    playerstate = gamejson['playerState']
    wallsH = gamejson['wallHorizontal']
    wallsV = gamejson['wallVerticle']
    goal = gamejson['goal']

    newplayerstate = list()
    for player in playerstate:
        top = player['top'] / 40
        left = player['left'] / 40
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
        top = top + 4
        left = wall['left']
        top = top / 40
        left = left / 40
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
        top = top
        left = wall['left']
        top = top / 40
        left = (left + 4) / 40
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

    goaltop = goaltop / 40
    goalleft = goalleft / 40

    placeholder = grid[int(goaltop * 16 + goalleft)]
    paths = list()

    for x, token in enumerate(tokenlist):
        grid1 = grid
        grid1[int(goaltop * 16 + goalleft)] = placeholder + token
        for x, space in enumerate(grid1):
            if (space == ''):
                grid1[x] = 'X'
        paths.append(ricochet.search(model.Game(grid=grid1, robots=robots, col=colors, token=token)))

    import json

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

    minim = 90
    for number in solutionnumbers:
        if minim >= number:
            minim = number
    return {
        'playerState': playerstate,
        'wallHorizontal': wallsH,
        'wallVerticle': wallsV,
        'goal': goal,
        'moves': minim,
        'boardState': gamejson['boardState']
    }


if __name__ == "__main__":
    app = flaskr.create_app()
    with app.app_context():
        moves = 1
        solution = 0
        while (True):
            solution = solver(boardgenerator())
            moves = solution['moves']
            if (moves >= 19):
                print(solution)
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
                    'goal': solution['goal']
                }
                newdata = json.dumps(data)
                name = 'TurkuTeirPuzzle'
                GameService().insert_game(name, 'type', 'description', 1, 'test', 1, newdata)








