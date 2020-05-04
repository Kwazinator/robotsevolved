import extend from '../constants/extend';
import {LEFT,RIGHT,UP,DOWN,MAX_WIDTH,MAX_HEIGHT,ROBOT_BLUE,ROBOT_GREEN,ROBOT_RED,ROBOT_YELLOW,GREEN_UP_PICTURE,DIRECTION_MAP_IMAGES} from '../constants/constants';


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
    var wallVerticle = [];
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

    for (var i=0;i<width;i+=40) {
        for (var j=0;j<height;j+=40) {
            if (Math.random() > randomPercent) {
                wallVerticle.push({top: j,left: i-4});
            }
        }
    }

    for (var i=0;i<width;i+=40) {
        for (var j=0;j<height;j+=40) {
            if (Math.random() > randomPercent) {
                wallHorizontal.push({top: j-4,left: i});
            }
        }
    }
    return {
        playerState: playerState,
        boardState: boardState,
        wallHorizontal: wallHorizontal,
        wallVerticle: wallVerticle,
        goal: goal,
        playerStart: playerState.slice(),
    };
}
