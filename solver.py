import flaskr
import model
import ricochet
import json
from flaskr.db import get_db
app = flaskr.create_app()
with app.app_context():
    cursor = get_db().cursor()
    row = cursor.execute('SELECT * from game where id=11').fetchone()

game = row[7]
gamejson = json.loads(game)

playerstate = gamejson['playerState']
print(playerstate)

newplayerstate = list()
for player in playerstate:
    top = player['top'] /40
    left = player['left'] /40
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

wallsH = gamejson['wallHorizontal']
wallsV = gamejson['wallVerticle']


result = ['' for x in range(256)]

wallsV = wallsV[1:]

for wall in wallsH:
    top = wall['top']
    top = top + 4
    left = wall['left']
    top = top / 40
    left = left / 40
    if top >= 16:
        top = top - 1
        position = top * 16 + left
        if left < 16:
            result[int(position)] += 'S'
    else:
        position = top * 16 + left
        if left < 16:
            result[int(position)] += 'N'
            if top != 0:
                result[int(position) - 16] += 'S'

for wall in wallsV:
    top = wall['top']
    top = top
    left = wall['left']
    top = top / 40
    left = (left+4) / 40
    if left >= 16:
        left = left - 1
        position = top * 16 + left
        if top < 16:
            result[int(position)] += 'E'
    else:
        if top < 16:
            position = top * 16 + left
            result[int(position)] += 'W'
            if left != 0:
                result[int(position) - 1] += 'E'


grid = result
tokenlist = ['BH','GH','RH','YH']
colors = list()
robots = list()
for player in newplayerstate:
    robots.append(player['position'])
    colors.append(player['color'])

goal = gamejson['goal']
goaltop = goal['top']
goalleft = goal['left']

goaltop = goaltop / 40
goalleft = goalleft / 40

gridlist = list()
placeholder = grid[int(goaltop * 16 + goalleft)]
paths = list()

for x, token in enumerate(tokenlist):
    grid1 = grid
    grid1[int(goaltop * 16 + goalleft)] = placeholder + token
    for x, space in enumerate(grid1):
        if space == '':
            grid1[x] = 'X'
    print('answers')
    print(grid1)
    print(robots)
    print(colors)
    print(token)
    paths.append(ricochet.search(model.Game(grid=grid1, robots=robots, col=colors, token=token)))

for path in paths:
    if path[0] == 'G':
        path[0] = 'B'
    elif path[0] == 'B':
        path[0] = 'R'
    elif path[0] == 'R':
        path[0] = 'G'

print(paths)


