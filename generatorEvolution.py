import math
import json
import random

COLOR_ARRAY_SIG = ['green','blue','red','yellow']
COLOR_ARRAY = ['#228b22','#4169e1','#b22222','#ff8c00']



def generateEvolutionPatterns():
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
                


    newWalls = createDoubleWallConfiguration('doublesquare')
    for item in newWalls[0]:
        wallHorizontal.append(item)
    for item in newWalls[1]:
        wallVerticle.append(item)

    color1 = random.randint(0, 1)
    color2 = random.randint(2, 3)
    coloredGoals = [
        {
            'top': random.randint(7,8),
            'left': random.randint(7,8),
            'color': COLOR_ARRAY[color1],
            'colorSignifier': COLOR_ARRAY_SIG[color1]
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
    randomPositions = list()

    numberlist = random.sample(range(0,len(structOutside) - 1), 4)

    for item in numberlist:
        randomPositions.append({'top': structOutside[item][0],'left': structOutside[item][1]})
    randompos1 = dict(randomPositions[0], **{'colorSignifier': 'blue', 'color': '#4169e1'})
    randompos2 = dict(randomPositions[1], **{'colorSignifier': 'green', 'color': '#228b22'})
    randompos3 = dict(randomPositions[2], **{'colorSignifier': 'red', 'color': '#b22222'})
    randompos4 = dict(randomPositions[3], **{'colorSignifier': 'yellow', 'color': '#ff8c00'})
    playerState.append(randompos1)
    playerState.append(randompos2)
    playerState.append(randompos3)
    playerState.append(randompos4)
    boardState = list()
    for j, item in enumerate(range(16)):
        for i, item in enumerate(range(16)):
            boardState.append({'top': j, 'left': i})

    coloredSwitcheslist = list()
    twoLocations = random.sample(range(0,len(structOutside) - 1),2)
    firstSpotRandom = structOutside[twoLocations[0]]
    secondSpotRandom = structOutside[twoLocations[1]]
    coloredSwitcheslist.append({'top': firstSpotRandom[0], 'left': firstSpotRandom[1]})
    coloredSwitcheslist.append({'top': secondSpotRandom[0], 'left': secondSpotRandom[1]})
    coloredSwitchesOn = list()
    coloredSwitchesOn.append(
        dict(coloredSwitcheslist[0], **{'colorSignifier': 'brown', 'color': '#663300', 'isOn': True}))
    coloredSwitchesOn.append(
        dict(coloredSwitcheslist[1], **{'colorSignifier': 'purple', 'color': '#660066', 'isOn': True}))

    coloredSwitcheslist = list()
    coloredSwitcheslist.append({'top': random.randint(0,3), 'left': random.randint(0,3)})
    coloredSwitcheslist.append({'top': random.randint(3,6), 'left': random.randint(3,6)})
    coloredSwitchesOff = list()
    coloredSwitchesOff.append(
        dict(coloredSwitcheslist[1], **{'colorSignifier': 'brown', 'color': '#663300', 'indexRef': 0}))
    coloredSwitchesOff.append(
        dict(coloredSwitcheslist[0], **{'colorSignifier': 'purple', 'color': '#660066', 'indexRef': 1}))

    # coloredSwitchesOn.append(dict(coloredSwitcheslist[3], **{'colorSignifier': 'purple', 'color': '#660066', 'isOn': True}))
    # coloredSwitchesOn.append(dict(coloredSwitcheslist[4], **{'colorSignifier': 'blue', 'color': '#003366', 'isOn': True}))

    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'coloredGoals': coloredGoals,
        'boardState': boardState,
        'coloredSwitchesOn': coloredSwitchesOn,
        'coloredSwitchesOff': coloredSwitchesOff
    }

structOutside = [
    (0,0),(0,1),(0,2),(0,3),(0,4),(0,5),(0,6),(0,7),(0,8),(0,9),(0,10),(0,11),(0,12),(0,13),(0,14),(0,15),
    (1,0),(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),
    (2,0),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),(2,11),(2,12),(2,13),(2,14),(2,15),
    (3,0),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),
    (12,0),(12,1),(12,2),(12,3),(12,4),(12,5),(12,6),(12,7),(12,8),(12,9),(12,10),(12,11),(12,12),(12,13),(12,14),(12,15),
    (13,0),(13,1),(13,2),(13,3),(13,4),(13,5),(13,6),(13,7),(13,8),(13,9),(13,10),(13,11),(13,12),(13,13),(13,14),(13,15),
    (14,0),(14,1),(14,2),(14,3),(14,4),(14,5),(14,6),(14,7),(14,8),(14,9),(14,10),(14,11),(14,12),(14,13),(14,14),(14,15),
    (15,0),(15,1),(15,2),(15,3),(15,4),(15,5),(15,6),(15,7),(15,8),(15,9),(15,10),(15,11),(15,12),(15,13),(15,14),(15,15),
    (4,0),(4,1),(4,2),(4,3),
    (5,0),(5,1),(5,2),(5,3),
    (6,0),(6,1),(6,2),(6,3),
    (7,0),(7,1),(7,2),(7,3),
    (8,0),(8,1),(8,2),(8,3),
    (9,0),(9,1),(9,2),(9,3),
    (10,0),(10,1),(10,2),(10,3),
    (11,0),(11,1),(11,2),(11,3),
    (4,12),(4,13),(4,14),(4,15),
    (5,12),(5,13),(5,14),(5,15),
    (6,12),(6,13),(6,14),(6,15),
    (7,12),(7,13),(7,14),(7,15),
    (8,12),(8,13),(8,14),(8,15),
    (9,12),(9,13),(9,14),(9,15),
    (10,12),(10,13),(10,14),(10,15),
    (11,12),(11,13),(11,14),(11,15)
]

structInside = [
    (4,4),(4,5),(4,6),(4,7),(4,8),(4,9),(4,10),(4,11),
    (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 11),
    (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11),
    (7, 4), (7, 5), (7, 6), (7, 9), (7, 10), (7, 11),
    (8, 4), (8, 5), (8, 6), (8, 9), (8, 10), (8, 11),
    (9, 4), (9, 5), (9, 6), (9, 7), (9, 8), (9, 9), (9, 10), (9, 11),
    (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 9), (10, 10), (10, 11),
    (11, 4), (11, 5), (11, 6), (11, 7), (11, 8), (11, 9), (11, 10), (11, 11)
]

structCenter = [
    (7,7),(7,8),(8,7),(8,8)
]

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
    for i, item in enumerate(range(3)):
        coloredSwitcheslist.append(getSwitchLocations(randomPositions,16,16))
    coloredSwitchesOn = list()
    coloredSwitchesOn.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'brown', 'color': '#663300', 'isOn': True}))
    coloredSwitchesOn.append(dict(coloredSwitcheslist[2], **{'colorSignifier': 'purple', 'color': '#660066', 'isOn': True}))

    coloredSwitcheslist = list()
    for i, item in enumerate(range(3)):
        coloredSwitcheslist.append(getSwitchLocations(randomPositions,16,16))
    coloredSwitchesOff = list()
    coloredSwitchesOff.append(dict(coloredSwitcheslist[1], **{'colorSignifier': 'brown', 'color': '#663300', 'indexRef': 0}))
    coloredSwitchesOff.append(dict(coloredSwitcheslist[2], **{'colorSignifier': 'purple', 'color': '#660066', 'indexRef': 1}))

    #coloredSwitchesOn.append(dict(coloredSwitcheslist[3], **{'colorSignifier': 'purple', 'color': '#660066', 'isOn': True}))
    #coloredSwitchesOn.append(dict(coloredSwitcheslist[4], **{'colorSignifier': 'blue', 'color': '#003366', 'isOn': True}))

    return {
        'playerState': playerState,
        'wallHorizontal': wallHorizontal,
        'wallVerticle': wallVerticle,
        'coloredGoals': coloredGoals,
        'boardState': boardState,
        'coloredSwitchesOn': coloredSwitchesOn,
        'coloredSwitchesOff': coloredSwitchesOff
    }



def classicstruct(top,left,randomnum):
    classicStructureHorizontal = [
        {'top': top,'left': left, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top,'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 1, 'left': left, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 2, 'left': left, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 2, 'left': left, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 2, 'left': left + 1, 'opacity': 1},
        {'top': top + 2, 'left': left + 1, 'opacity': 1}
    ]
    classicStructureVert = [
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top, 'left': left, 'opacity': 1},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top, 'left': left + 2, 'opacity': 1},
        {'top': top, 'left': left + 2, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 1, 'left': left, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'},
        {'top': top + 1, 'left': left + 2, 'opacity': 1, 'wallType': 'brownPass'},
        {'top': top + 1, 'left': left + 2, 'opacity': 1},
        {'top': top + 1, 'left': left + 1, 'opacity': 1, 'wallType': 'purplePass'}
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
        'coloredSwitchesOn': solution['coloredSwitchesOn'],
        'coloredSwitchesOff': solution['coloredSwitchesOff']
    }
    newdata = json.dumps(data)
    return newdata




def addRandomWalltype(startingdict):
    randominteger = random.randint(0,2)
    typesofwalls = ['brownPass', 'purplePass']
    if randominteger == 2:
        return startingdict
    else:
        startingdict['wallType'] = typesofwalls[randominteger]
        return startingdict
################
################
################
################
####00000000####
####00000000####
####00000000####
####000##000####
####000##000####
####00000000####
####00000000####
####00000000####
################
################
################
################
def createDoubleWallConfiguration(type):
    horizontalwalls = list()
    verticlewalls = list()
    for i,index in enumerate(range(8)):
        horizontalwalls.append(addRandomWalltype({'top': 4, 'left': index + 4, 'opacity': 1}))
        horizontalwalls.append(addRandomWalltype({'top': 4 + 8, 'left': index + 4, 'opacity': 1}))
        verticlewalls.append(addRandomWalltype({'top': index + 4, 'left': 4, 'opacity': 1}))
        verticlewalls.append(addRandomWalltype({'top': index + 4, 'left': 12, 'opacity': 1}))

    for i,index in enumerate(range(2)):
        horizontalwalls.append(addRandomWalltype({'top': 7, 'left': index + 7, 'opacity': 1}))
        horizontalwalls.append(addRandomWalltype({'top': 9, 'left': index + 7, 'opacity': 1}))
        verticlewalls.append(addRandomWalltype({'top': index + 7, 'left': 7, 'opacity': 1}))
        verticlewalls.append(addRandomWalltype({'top': index + 7, 'left': 9, 'opacity': 1}))
    return (horizontalwalls,verticlewalls)