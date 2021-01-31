import math
import json
from Solver import model
import random
from Solver import ricochet
import flaskr
from flaskr.services.GeneratorService import GeneratorService


COLOR_ARRAY_SIG = ['blue','yellow','red','green']
COLOR_ARRAY = ['#4169e1','#ff8c00','#b22222','#228b22']

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
        {'top': top,'left': left, 'opacity': 1},
        {'top': top,'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 2, 'left': left, 'opacity': 1},
        {'top': top + 2, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 2, 'left': left + 1, 'opacity': 1},
        {'top': top + 2, 'left': left + 1, 'opacity': 1}
    ]
    classicStructureVert = [
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left + 2, 'opacity': 1},
        {'top': top, 'left': left + 2, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 2, 'opacity': 1},
        {'top': top + 1, 'left': left + 2, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1}
    ]
    toreturnvert = classicStructureVert[randomnum]
    toreturnhoriz = classicStructureHorizontal[randomnum]
    return (toreturnvert,toreturnhoriz)


def getnoplacelisttop(wallVerticle,wallHorizontal):
    noplacelist = list()
    for wallH in wallHorizontal:
        if wallH['top'] == 1:
            noplacelist.append(wallH['left'])
            noplacelist.append(wallH['left'] + 1)
    for wallV in wallVerticle:
        if wallV['top'] == 1:
            noplacelist.append(wallV['left'])
    return noplacelist

def getnoplacelistbottom(wallVerticle, wallHorizontal):
    noplacelist = list()
    for wallH in wallHorizontal:
        if wallH['top'] == 15:
            noplacelist.append(wallH['left'])
            noplacelist.append(wallH['left'] + 1)
    for wallV in wallVerticle:
        if wallV['top'] == 14:
            noplacelist.append(wallV['left'])
    return noplacelist

def getnoplacelistleft(wallVerticle, wallHorizontal):
    noplacelist = list()
    for wallH in wallHorizontal:
        if wallH['left'] == 1:
            noplacelist.append(wallH['top'])
    for wallV in wallVerticle:
        if wallV['left'] == 1:
            noplacelist.append(wallV['top'])
            noplacelist.append(wallV['top'] + 1)
    return noplacelist

def getnoplacelistright(wallVerticle, wallHorizontal):
    noplacelist = list()
    for wallH in wallHorizontal:
        if wallH['left'] == 14:
            noplacelist.append(wallH['top'])
    for wallV in wallVerticle:
        if wallV['left'] == 15:
            noplacelist.append(wallV['top'])
            noplacelist.append(wallV['top'] + 1)
    return noplacelist

def boardgeneratorclassicTwoGoals():
    wallHorizontal = list()
    wallVerticle = [{'top': 0, 'left': 0, 'opacity': 1}]
    countwalls = 0
    goalposlist = list()
    for j, item in enumerate(range(16)):
        for i, item in enumerate(range(16)):
            checkj = j
            checki = i
            if (checki < 1):
                wallVerticle.append({'top': checkj, 'left': checki, 'opacity': 1})
            elif (checki == (16 - 1)):
                wallVerticle.append({'top': checkj, 'left': checki + 1, 'opacity': 1})
            if (checkj < 1):
                wallHorizontal.append({'top': checkj, 'left': checki, 'opacity': 1})
            elif (checkj == (16 - 1)):
                wallHorizontal.append({'top': checkj + 1, 'left': checki, 'opacity': 1})

    for i, nothing in enumerate(range(5)):
        for j, nothing2 in enumerate(range(5)):
            if (random.randint(0, 12) > 5):
                randomnum = random.randint(0, 15)
                countwalls += 1
                goalspot = int(randomnum / 4)
                if goalspot == 0:
                    goalposlist.append({'top': i * 3 + 1, 'left': j * 3 + 1})
                elif goalspot == 1:
                    goalposlist.append({'top': i * 3 + 1, 'left': j * 3 + 2})
                elif goalspot == 2:
                    goalposlist.append({'top': i * 3 + 2, 'left': j * 3 + 1})
                else:
                    goalposlist.append({'top': i * 3 + 2, 'left': j * 3 + 2})
                walls = classicstruct(i * 3 + 1, j * 3 + 1, randomnum)
                wallHorizontal.append(walls[1])
                wallVerticle.append(walls[0])

    # randomize top walls
    print(countwalls)
    thenum = random.randint(0, countwalls - 1)
    thenum2 = random.randint(0, countwalls - 1)
    while thenum2 == thenum:
        thenum2 = random.randint(0, countwalls - 1)
    goalpos = goalposlist[thenum]
    goalpos2 = goalposlist[thenum2]
    color1 = random.randint(0,3)
    color2 = random.randint(0,3)
    while color1 == color2:
        color2 = random.randint(0,3)
    coloredGoals = [
        {
            'top': goalpos['top'],
            'left': goalpos['left'],
            'color': COLOR_ARRAY[color1],
            'colorSignifier': COLOR_ARRAY_SIG[color1]
        },
        {
            'top': goalpos2['top'],
            'left': goalpos2['left'],
            'color': COLOR_ARRAY[color2],
            'colorSignifier': COLOR_ARRAY_SIG[color2]
        }
    ]
    noplace = getnoplacelisttop(wallVerticle, wallHorizontal)
    location = random.randint(2, 14)
    while (location in noplace):
        location = random.randint(2, 14)
    location2 = random.randint(2, 14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2, 14)
        location2 = random.randint(2, 14)
    maxtries = 0

    wallVerticle.append({'top': 0, 'left': location, 'opacity': 1})
    wallVerticle.append({'top': 0, 'left': location2, 'opacity': 1})

    # randomize bottom walls

    noplace = getnoplacelistbottom(wallVerticle, wallHorizontal)
    location = random.randint(2, 14)
    while (location in noplace):
        location = random.randint(2, 14)
    location2 = random.randint(2, 14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2, 14)
        location2 = random.randint(2, 14)

    wallVerticle.append({'top': 15, 'left': location, 'opacity': 1})
    wallVerticle.append({'top': 15, 'left': location2, 'opacity': 1})

    # randomize left walls
    noplace = getnoplacelistleft(wallVerticle, wallHorizontal)
    location = random.randint(2, 14)
    while (location in noplace):
        location = random.randint(2, 14)
    location2 = random.randint(2, 14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2, 14)
        location2 = random.randint(2, 14)

    wallHorizontal.append({'top': location, 'left': 0, 'opacity': 1})
    wallHorizontal.append({'top': location2, 'left': 0, 'opacity': 1})

    # randomize right walls
    noplace = getnoplacelistright(wallVerticle, wallHorizontal)
    location = random.randint(2, 14)
    while (location in noplace):
        location = random.randint(2, 14)
    location2 = random.randint(2, 14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2, 14)
        location2 = random.randint(2, 14)

    wallHorizontal.append({'top': location, 'left': 15, 'opacity': 1})
    wallHorizontal.append({'top': location2, 'left': 15, 'opacity': 1})

    playerState = list()
    goal = {'top': goalpos['top'],
            'left': goalpos['left']}
    randomPositions = [goal]
    for i, item in enumerate(range(5)):
        randomPositions.append(randomBoardPosition(randomPositions, 16, 16))
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
            boardState.append({'top': j, 'left': i})
    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'coloredGoals': coloredGoals,
        'boardState': boardState
    }

def boardgeneratorclassic():
    goalposrandom = random.randint(0, 15)
    wallHorizontal = list()
    wallVerticle = [{'top': 0, 'left': 0, 'opacity': 1}]
    goalpos = None
    countwalls = 0
    goalposlist = list()
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

    for i, nothing in enumerate(range(5)):
        for j, nothing2 in enumerate(range(5)):
            if (random.randint(0,12) > 5):
                randomnum = random.randint(0, 15)
                countwalls += 1
                goalspot = int(randomnum / 4)
                if goalspot == 0:
                    goalposlist.append({'top': i*3 + 1, 'left':j*3 + 1})
                elif goalspot == 1:
                    goalposlist.append({'top': i * 3 + 1, 'left': j * 3 + 2})
                elif goalspot == 2:
                    goalposlist.append({'top': i * 3 + 2, 'left': j * 3 + 1})
                else:
                    goalposlist.append({'top': i * 3 + 2, 'left': j * 3 + 2})
                walls = classicstruct(i*3 + 1,j*3 + 1,randomnum)
                wallHorizontal.append(walls[1])
                wallVerticle.append(walls[0])

    #randomize top walls
    print(countwalls)
    thenum = random.randint(0,countwalls - 1)
    goalpos = goalposlist[thenum]

    
    noplace = getnoplacelisttop(wallVerticle,wallHorizontal)
    location = random.randint(2,14)
    while (location in noplace):
        location = random.randint(2,14)
    location2 = random.randint(2,14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2,14)
        location2 = random.randint(2,14)
    maxtries = 0


    wallVerticle.append({'top': 0, 'left': location, 'opacity': 1})
    wallVerticle.append({'top': 0, 'left': location2, 'opacity': 1})

    #randomize bottom walls

    noplace = getnoplacelistbottom(wallVerticle, wallHorizontal)
    location = random.randint(2,14)
    while (location in noplace):
        location = random.randint(2,14)
    location2 = random.randint(2,14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2,14)
        location2 = random.randint(2,14)


    wallVerticle.append({'top': 15, 'left': location, 'opacity': 1})
    wallVerticle.append({'top': 15, 'left': location2, 'opacity': 1})



    #randomize left walls
    noplace = getnoplacelistleft(wallVerticle, wallHorizontal)
    location = random.randint(2,14)
    while (location in noplace):
        location = random.randint(2,14)
    location2 = random.randint(2,14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2,14)
        location2 = random.randint(2,14)


    wallHorizontal.append({'top': location, 'left': 0, 'opacity': 1})
    wallHorizontal.append({'top': location2, 'left': 0, 'opacity': 1})


    #randomize right walls
    noplace = getnoplacelistright(wallVerticle, wallHorizontal)
    location = random.randint(2,14)
    while (location in noplace):
        location = random.randint(2,14)
    location2 = random.randint(2,14)
    while (location in noplace or location2 in noplace or abs(location2 - location) <= 3):
        location = random.randint(2,14)
        location2 = random.randint(2,14)


    wallHorizontal.append({'top': location, 'left': 15, 'opacity': 1})
    wallHorizontal.append({'top': location2, 'left': 15, 'opacity': 1})



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


def solver2(gamejson):
    playerstate = gamejson['playerState']
    wallsH = gamejson['wallHorizontal']
    wallsV = gamejson['wallVerticle']
    goal = gamejson['coloredGoals'][0]
    goal2 = gamejson['coloredGoals'][1]
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
    colors = list()
    robots = list()
    for player in newplayerstate:
        robots.append(player['position'])
        colors.append(player['color'])

    goaltop = goal['top']
    goalleft = goal['left']
    placeholder = grid[int(goaltop * 16 + goalleft)]

    goaltop2 = goal2['top']
    goalleft2 = goal2['left']
    placeholder2 = grid[int(goaltop2 * 16 + goalleft2)]
    paths = list()

    # threadArray = list()
    #token is from tokenlist
    grid1 = grid
    #edit token here
    print(goal)
    print(goal2)
    if goal['colorSignifier'] == 'blue':
        token = 'BH'
    elif goal['colorSignifier'] == 'green':
        token = 'GH'
    elif goal['colorSignifier'] == 'red':
        token = 'RH'
    elif goal['colorSignifier'] == 'yellow':
        token = 'YH'
    if goal2['colorSignifier'] == 'blue':
        token2 = 'BH'
    elif goal2['colorSignifier'] == 'green':
        token2 = 'GH'
    elif goal2['colorSignifier'] == 'red':
        token2 = 'RH'
    elif goal2['colorSignifier'] == 'yellow':
        token2 = 'YH'

    grid1[int(goaltop * 16 + goalleft)] = placeholder + token
    grid1[int(goaltop2 * 16 + goalleft2)] = placeholder2 + token2
    for x, space in enumerate(grid1):
        if (space == ''):
            grid1[x] = 'X'


    print(grid1)
    # threadArray.append(threading.Thread(target=runSearch, args=(grid1,robots,colors,token,result)))
    path = ricochet.search2(model.Game2(grid=grid1, robots=robots, col=colors, token=token, token2=token2))
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

    minim = len(solution)

    return {
        'playerState': playerstate,
        'wallHorizontal': wallsH,
        'wallVerticle': wallsV,
        'coloredGoals': gamejson['coloredGoals'],
        'moves': minim,
        'solutiondata': solution,
        'boardState': gamejson['boardState']
    }

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
        #threadArray.append(threading.Thread(target=runSearch, args=(grid1,robots,colors,token,result)))
        paths.append(ricochet.search(model.Game(grid=grid1, robots=robots, col=colors, token=token)))

    '''for thread in threadArray:
        thread.start()
    for thread in threadArray:
        thread.join()
    print(result)
'''
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

def formatsolutiondataTwoGoal(solution):
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
        'coloredGoals': solution['coloredGoals'],
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







