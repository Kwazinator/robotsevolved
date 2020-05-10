import extend from '../constants/extend';
import {LEFT,RIGHT,UP,DOWN,MAX_WIDTH,MAX_HEIGHT,ROBOT_BLUE,ROBOT_GREEN,ROBOT_RED,ROBOT_YELLOW,GREEN_UP_PICTURE,DIRECTION_MAP_IMAGES} from '../constants/constants';








/*
STILL NEED TO CHECK LAST row
*/
const checkDeadendHorizontal = (wallHorizontalList,WallVertToPlace,LastWall,width,height) => {
    var indexX = WallVertToPlace.left;
    var indexY = WallVertToPlace.top;
    var isWallAbove = false;
    wallHorizontalList.map(wall => {
        if (wall.top == indexY-4 && wall.left == indexX-40) {
            isWallAbove = true;
        }
    });
    //var isWallAbove = (wallHorizontalList.find(wall => wall = {top: indexY-4, left: indexX -40}) !== undefined);
    var isWallBeside = (LastWall.top == indexY && LastWall.left == (indexX-44));
    /*if ((isWallAbove && isWallBeside)) {
        console.log(wallHorizontalList);
        console.log(WallVertToPlace);
        console.log(LastWall);
    }*/

    return !(isWallAbove && isWallBeside)
}

/*
STILL NEED TO CHECK last row of things bottom https://cdn.discordapp.com/attachments/551490947893035023/708384650187374642/unknown.png
*/

const checkDeadendTop = (wallVerticleList, WallHorizToPlace,wallHorizList,width,height) => {
    var indexX = WallHorizToPlace.left;
    var indexY = WallHorizToPlace.top;
    var isWallAbove = false;
    wallHorizList.map(wall => {
        if (wall.top == indexY-44 && wall.left == indexX) {
            isWallAbove = true;
        }
    });
    var isWallBesideLeft = false;
    var isWallBesideRight = false;
    wallVerticleList.map(wall => {
        if (wall.top == indexY-40 && (wall.left == indexX-4)) {
            isWallBesideLeft = true;
        }
        if (wall.top == indexY-40 && (wall.left == indexX+36)) {
            isWallBesideRight = true;
        }
    });
    /*if ((isWallAbove && (isWallBesideLeft || isWallBesideRight) || (isWallBesideLeft && isWallBesideRight)) ) {
        console.log('wall above');
        console.log({top: indexY-44, left: indexX})
        console.log(WallHorizToPlace)
    }*/
    return !((isWallAbove && (isWallBesideLeft || isWallBesideRight)) || (isWallBesideLeft && isWallBesideRight))
}


const randomBoardPosition = (dontPlacePositions,width,height) => {
    var tryAgain = 0;
    var Y,X;
    do {
        tryAgain = 0;
        Y = Math.floor(Math.random() * Math.floor(height/40));
        X = Math.floor(Math.random() * Math.floor(width/40));
        dontPlacePositions.map(position => {
            if (Y*40 == position.top && X*40 == position.left) {
                tryAgain = 1;
            }
        });
    } while (tryAgain == 1);
    return {top: Y*40,left: X*40};
};

export default (width,height,randomPercent) => {
    var boardState = [];
    var wallVerticle = [{top: 0, left: -4}];
    var wallHorizontal = [];
    var playerState = [];
    var goal = {top:Math.floor(Math.random() * Math.floor(height/40))*40, left:Math.floor(Math.random() * Math.floor(width/40))*40};
    var randomPositions = [goal];
    for (var i=0;i<5;i++) {
        randomPositions.push(randomBoardPosition(randomPositions,width,height));
    }
    var randompos1 = extend(randomPositions[1],{color: ROBOT_BLUE, colorSignifier: 'blue'});
    var randompos2 = extend(randomPositions[2],{color: ROBOT_GREEN, colorSignifier: 'green'});
    var randompos3 = extend(randomPositions[3],{color: ROBOT_RED, colorSignifier: 'red'});
    var randompos4 = extend(randomPositions[4],{color: ROBOT_YELLOW, colorSignifier:'yellow'});
    playerState.push(randompos1);
    playerState.push(randompos2);
    playerState.push(randompos3);
    playerState.push(randompos4);
    for (var i=0;i<width;i+=40) {
        for (var j=0;j<height;j+=40) {
            boardState.push({top: j,left: i});
        }
    }
    for (var j=0;j<height;j+=40) {
        for (var i=0;i<width;i+=40) {
            if (i < 1) {
                wallVerticle.push({top: j, left: i-4});
            }
            else if (i==(width-40)) {
                wallVerticle.push({top: j, left: i+36});
            }
            if (j < 1) {
                wallHorizontal.push({top: j-4,left: i});
            }
            else if (j == (height-40)) {
                wallHorizontal.push({top: j+36, left: i});
            }
        }
    }
    for (var j=0;j<height;j+=40) {
        for (var i=0;i<width;i+=40) {
            if (i > 1 && i != (width-40) && Math.random() > randomPercent) {
                if (checkDeadendHorizontal(wallHorizontal, {top: j, left: i}, wallVerticle[wallVerticle.length -1], width,height)) {
                    wallVerticle.push({top: j,left: i-4});
                }
            }
            if (j > 1 && j != (height-40) && Math.random() > randomPercent) {
                if (checkDeadendTop(wallVerticle,{top: j,left:i}, wallHorizontal,width,height)) {
                    wallHorizontal.push({top: j-4,left: i});
                }
            }
        }
    }

    return {
        playerState: playerState,
        gameWon: false,
        boardState: boardState,
        wallHorizontal: wallHorizontal,
        wallVerticle: wallVerticle,
        goal: goal,
        playerStart: playerState.slice(),
    };
}
