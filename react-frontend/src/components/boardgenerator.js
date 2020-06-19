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
        if (wall.top == indexY && wall.left == indexX-1 && wall.opacity == 1) {
            isWallAbove = true;
        }
    });
    //var isWallAbove = (wallHorizontalList.find(wall => wall = {top: indexY-4, left: indexX -40}) !== undefined);
    var isWallBeside = (LastWall.top == indexY && LastWall.left == (indexX-1) && LastWall.opacity == 1);
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
        if (wall.top == indexY-1 && wall.left == indexX && wall.opacity == 1) {
            isWallAbove = true;
        }
    });
    var isWallBesideLeft = false;
    var isWallBesideRight = false;
    wallVerticleList.map(wall => {
        if (wall.top == indexY-1 && (wall.left == indexX) && wall.opacity == 1) {
            isWallBesideLeft = true;
        }
        if (wall.top == indexY-1 && (wall.left == indexX+1) && wall.opacity == 1) {
            isWallBesideRight = true;
        }
    });
    return !((isWallAbove && (isWallBesideLeft || isWallBesideRight)) || (isWallBesideLeft && isWallBesideRight))
}


const randomBoardPosition = (dontPlacePositions,width,height) => {
    var tryAgain = 0;
    var Y,X;
    do {
        tryAgain = 0;
        Y = Math.floor(Math.random() * Math.floor(height));
        X = Math.floor(Math.random() * Math.floor(width));
        dontPlacePositions.map(position => {
            if (Y == position.top && X == position.left) {
                tryAgain = 1;
            }
        });
    } while (tryAgain == 1);
    return {top: Y,left: X};
};

export default (width,height,randomPercent,type) => {
    var boardState = [];
    var wallVerticle = [{top: 0, left: 0}];
    var wallHorizontal = [];
    var playerState = [];
    if (type === 'blank') {
        var goal = {top: width-1, left: height-1};
        var randompos1 = {top: 0,left: 0, color: ROBOT_BLUE, colorSignifier: 'blue'};
        var randompos2 = {top: 0,left: 1, color: ROBOT_GREEN, colorSignifier: 'green'};
        var randompos3 = {top: 1,left: 0, color: ROBOT_RED, colorSignifier: 'red'};
        var randompos4 = {top: 1,left: 1, color: ROBOT_YELLOW, colorSignifier:'yellow'};
    }
    else {
        var goal = {top:Math.floor(Math.random() * Math.floor(height)), left:Math.floor(Math.random() * Math.floor(width))};
        var randomPositions = [goal];
        for (var i=0;i<5;i++) {
            randomPositions.push(randomBoardPosition(randomPositions,width,height));
        }
        var randompos1 = extend(randomPositions[1],{color: ROBOT_BLUE, colorSignifier: 'blue'});
        var randompos2 = extend(randomPositions[2],{color: ROBOT_GREEN, colorSignifier: 'green'});
        var randompos3 = extend(randomPositions[3],{color: ROBOT_RED, colorSignifier: 'red'});
        var randompos4 = extend(randomPositions[4],{color: ROBOT_YELLOW, colorSignifier:'yellow'});
    }
    playerState.push(randompos1);
    playerState.push(randompos2);
    playerState.push(randompos3);
    playerState.push(randompos4);
    for (var i=0;i<width;i+=1) {
        for (var j=0;j<height;j+=1) {
            boardState.push({top: j,left: i});
        }
    }
    for (var j=0;j<height;j+=1) {
        for (var i=0;i<width;i+=1) {
            if (i < 1) {
                wallVerticle.push({top: j, left: i, opacity: 1});
            }
            else if (i==(width-1)) {
                wallVerticle.push({top: j, left: i+1, opacity: 1});
            }
            if (j < 1) {
                wallHorizontal.push({top: j,left: i, opacity: 1});
            }
            else if (j == (height-1)) {
                wallHorizontal.push({top: j+1, left: i, opacity: 1});
            }
        }
    }
    for (var j=0;j<height;j+=1) {
        for (var i=0;i<width;i+=1) {
            if (i > 1 && i != (width-1) && Math.random() > randomPercent && checkDeadendHorizontal(wallHorizontal, {top: j, left: i}, wallVerticle[wallVerticle.length -1], width,height)) {
                wallVerticle.push({top: j,left: i,opacity: 1});
            }
            else {
                wallVerticle.push({top: j,left: i, opacity: 0})
            }
            if (j > 1 && j != (height-1) && Math.random() > randomPercent && checkDeadendTop(wallVerticle,{top: j,left:i}, wallHorizontal,width,height)) {
                wallHorizontal.push({top: j,left: i, opacity: 1});
            }
            else {
                wallHorizontal.push({top: j,left: i, opacity: 0});
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
