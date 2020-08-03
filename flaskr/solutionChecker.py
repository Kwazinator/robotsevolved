import json

def processwalls(walls):
    toreturn = list()
    for wall in walls:
        try:
            if wall['opacity'] == 1:
                toreturn.append(wall)
        except Exception as e:
            print('wall not found with opacity')
        finally:
            pass
    return toreturn

def checkSolution(solutiondata,gamedata,numMoves):
    solutiondata = json.loads(solutiondata)
    if len(solutiondata) != numMoves:
        return False
    gamedata = json.loads(gamedata)
    playerStart = gamedata['playerStart']
    goal = gamedata['goal']
    height = gamedata['height']
    width = gamedata['width']
    playerState = playerStart
    wallHorizontal = processwalls(gamedata['wallHorizontal'])
    wallVerticle = processwalls(gamedata['wallVerticle'])
    try:
        for move in solutiondata:
            robotindex = move['robot']
            dir = move['dir']
            if dir == 'UP':
                wallmin = 0
                for wall in wallHorizontal:
                    if wall['left'] == playerState[robotindex]['left'] and wall['top'] <= playerState[robotindex]['top'] and wall['top'] > wallmin:
                        wallmin = wall['top']
                for player in playerState:
                    if player['left'] == playerState[robotindex]['left'] and player['top'] < playerState[robotindex]['top'] and player['top'] + 1 > wallmin:
                        wallmin = player['top'] + 1
                playerState[robotindex]['top'] = wallmin
            elif dir == 'DOWN':
                wallmax = height - 1
                for wall in wallHorizontal:
                    if wall['left'] == playerState[robotindex]['left'] and wall['top'] > playerState[robotindex]['top'] and wall['top'] < wallmax + 1:
                        wallmax = wall['top'] - 1
                for player in playerState:
                    if (player['left'] == playerState[robotindex]['left'] and player['top'] > playerState[robotindex]['top'] and player['top'] < wallmax + 1):
                        wallmax = player['top'] - 1
                playerState[robotindex]['top'] = wallmax
            elif dir == 'RIGHT':
                wallmin = width - 1
                for wall in wallVerticle:
                    if wall['top'] == playerState[robotindex]['top'] and wall['left'] > playerState[robotindex]['left'] and wall['left'] < wallmin + 1:
                        wallmin = wall['left'] - 1
                for player in playerState:
                    if player['top'] == playerState[robotindex]['top'] and player['left'] > playerState[robotindex]['left'] and player['left'] < wallmin + 1:
                        wallmin = player['left'] - 1
                playerState[robotindex]['left'] = wallmin
            elif dir == 'LEFT':
                wallmin = 0
                for wall in wallVerticle:
                    if wall['top'] == playerState[robotindex]['top'] and wall['left'] <= playerState[robotindex]['left'] and wall['left'] > wallmin:
                        wallmin = wall['left']
                for player in playerState:
                    if player['top'] == playerState[robotindex]['top'] and player['left'] < playerState[robotindex]['left'] and player['left'] + 1 > wallmin:
                        wallmin = player['left'] + 1
                playerState[robotindex]['left'] = wallmin
        for player in playerState:
            if player['top'] == goal['top'] and player['left'] == goal['left']:
                return True
        return False
    except Exception as e:
        print(e)
        return False
    finally:
        pass




