import math
import json
import random

COLOR_ARRAY_SIG = ['green','blue','red','yellow']
COLOR_ARRAY = ['#228b22','#4169e1','#b22222','#ff8c00']


def generateEvolutionTwoGoal():
    wallHorizontal = list()
    wallVerticle = [{'top': 0, 'left': 0, 'opacity': 1}]
    countwalls = 0
    goalposlist = list()
    for j, item in enumerate(range(16)):
        for i, item in enumerate(range(16)):
            checkj = j
            checki = i
            if (checki < 1):
                wallVerticle.append({'top': checkj, 'left': checki, 'opacity': 1, 'wallType': 'regular'})
            elif (checki == (16 - 1)):
                wallVerticle.append({'top': checkj, 'left': checki + 1, 'opacity': 1, 'wallType': 'regular'})
            if (checkj < 1):
                wallHorizontal.append({'top': checkj, 'left': checki, 'opacity': 1, 'wallType': 'regular'})
            elif (checkj == (16 - 1)):
                wallHorizontal.append({'top': checkj + 1, 'left': checki, 'opacity': 1, 'wallType': 'regular'})

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
    thenum = random.randint(0, countwalls - 1)
    thenum2 = random.randint(0, countwalls - 1)
    while thenum2 == thenum:
        thenum2 = random.randint(0, countwalls - 1)
    goalpos = goalposlist[thenum]
    goalpos2 = goalposlist[thenum2]
    color1 = random.randint(0,1)
    color2 = random.randint(2,3)
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

    coloredSwitcheslist = list()
    for i, item in enumerate(range(5)):
        coloredSwitcheslist.append(getSwitchLocations(randomPositions,16,16))
    coloredSwitches = list()
    coloredSwitches.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'blue', 'color': '#4169e1'}))
    coloredSwitches.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'green', 'color': '#228b22'}))
    coloredSwitches.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'red', 'color': '#b22222'}))
    coloredSwitches.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'yellow', 'color': '#ff8c00'}))

    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'coloredGoals': coloredGoals,
        'boardState': boardState,
        'coloredSwitches': coloredSwitches,
    }



def classicstruct(top,left,randomnum):
    classicStructureHorizontal = [
        {'top': top,'left': left, 'opacity': 1, 'wallType': 'redPass'},
        {'top': top,'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1, 'wallType': 'bluePass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'greenPass'},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'redPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'orangePass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'orangePass'},
        {'top': top + 1, 'left': left, 'opacity': 1, 'wallType': 'bluePass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 2, 'left': left, 'opacity': 1, 'wallType': 'greenPass'},
        {'top': top + 2, 'left': left, 'opacity': 1, 'wallType': 'redPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'bluePass'},
        {'top': top + 2, 'left': left + 1, 'opacity': 1},
        {'top': top + 2, 'left': left + 1, 'opacity': 1}
    ]
    classicStructureVert = [
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'orangePass'},
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'redPass'},
        {'top': top, 'left': left + 2, 'opacity': 1},
        {'top': top, 'left': left + 2, 'opacity': 1, 'wallType': 'bluePass'},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'greenPass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'redPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'orangePass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'greenPass'},
        {'top': top + 1, 'left': left + 2, 'opacity': 1, 'wallType': 'bluePass'},
        {'top': top + 1, 'left': left + 2, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'orangePass'}
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

def getSwitchLocations(dontPlacePositions,width,height):
    tryAgain = True
    while tryAgain:
        tryAgain = False
        Y = math.floor(random.random() * math.floor(height))
        X = math.floor(random.random() * math.floor(width))
        for position in dontPlacePositions:
            if (Y == position['top'] and X == position['left']):
                tryAgain = True
    return {'top': Y, 'left': X}


def formatsolutiondataTwoGoalEvo(solution):
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
        'width': 16,
        'coloredSwitches': solution['coloredSwitches']
    }
    newdata = json.dumps(data)
    return newdata