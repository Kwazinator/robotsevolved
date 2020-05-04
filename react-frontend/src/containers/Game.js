
import React from 'react';
import Square from '../components/Square';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Wall from '../components/Wall';
import Goal from '../components/Goal';
import axios from 'axios';
import ControlPanel from './ControlPanel';
import HighScores from '../components/HighScores';
import {LEFT,RIGHT,UP,DOWN,MAX_WIDTH,MAX_HEIGHT,ROBOT_BLUE,ROBOT_GREEN,ROBOT_RED,ROBOT_YELLOW,GREEN_UP_PICTURE,DIRECTION_MAP_IMAGES} from '../constants/constants';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const extend = (obj, src) => {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}


const randomBoardPosition = (dontPlacePositions) => {
    var tryAgain = 0;
    var Y,X;
    do {
        tryAgain = 0;
        Y = Math.floor(Math.random() * Math.floor(MAX_HEIGHT/40));
        X = Math.floor(Math.random() * Math.floor(MAX_WIDTH/40));
        dontPlacePositions.map(position => {
            if (Y*40 == position.top && X*40 == position.left) {
                tryAgain = 1;
            }
        });
    } while (tryAgain == 1);
    return {top: Y*40,left: X*40};
}

const controlpanel = () => {
    return {
        marginRight: '10px',
        float: 'left',
    };
}

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}

const movespanel = () => {
    return {
        height: ''
    };
}

const gamepanel = () => {
    return {
        width: '100%',
    };
}

const inputname = () => {
    return {
        type: '',
        id: 'namesubmit',
        value: 'Name of Puzzle?',
    };

}

class Game extends React.Component {

    constructor(props) {
        super(props);
        console.log(window.token);
        if (window.token.uri == '') {
            const {boardSize, playerSize } = props;
            var boardState = [];
            const width = MAX_WIDTH;
            const height = MAX_HEIGHT;
            var wallVerticle = [];
            var wallHorizontal = [];
            var playerState = [];
            var goal = {top:Math.floor(Math.random() * Math.floor(MAX_HEIGHT/40))*40, left:Math.floor(Math.random() * Math.floor(MAX_HEIGHT/40))*40};
            var randomPositions = [goal];
            for (var i=0;i<5;i++) {
                randomPositions.push(randomBoardPosition(randomPositions));
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
                    if (Math.random() > .90) {
                        wallVerticle.push({top: j,left: i-4});
                    }
                }
            }

            for (var i=0;i<width;i+=40) {
                for (var j=0;j<height;j+=40) {
                    if (Math.random() > .90) {
                        wallHorizontal.push({top: j-4,left: i});
                    }
                }
            }
            this.state = {
                playerState: playerState,
                boardSize: boardSize,
                playerSize: playerSize,
                boardState: boardState,
                wallHorizontal: wallHorizontal,
                wallVerticle: wallVerticle,
                robotSelected: 0,
                goal: goal,
                moveHistory: [],
                playerStart: playerState.slice(),
                uri: '',
                createMode: 'Yes',
                highscores: [],
            };
        }
        else {
            console.log(window.uri)
            this.state = extend(JSON.parse(window.token.puzzledata),{createMode: 'No', uri: window.uri, highscores: window.highscores})
        }
    }


    robotSelect = (i) => {
        //add something here to make the selected robit be highlighted.
        this.setState({
            robotSelected: i,
        });
    }


    submitPuzzle = event => {
        event.preventDefault();
        var namesubmit = document.getElementById("namesubmit").value;
        var state = this.state;
        state.playerState = this.state.playerStart.slice();
        state.moveHistory = [];
        state.createMode = 'No';
        axios.post('/submitpuzzle', extend({puzzledata: state},{name: namesubmit}))
            .then( res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    uri: res.data.uri,
                });
                //window.location.href = window.location.host + '/play/' + res.data.uri;
            });
    }
    isCreateMode = () => {
        if (this.state.createMode == 'Yes') {
            return (
                <div>
                    <form onSubmit={this.submitPuzzle} style={buttonpanel()}>
                        <button type="submit">Add Puzzle to Database</button>
                    </form>
                    <input style={buttonpanel()} id={"namesubmit"} type={"text"} placeholder={"Name Of Puzzle?"}>

                    </input>
                </div>
                    )
        }
        else {
            return
        }

    }
    submitAnswer = event => {
        event.preventDefault();
        console.log(this.state.uri);
        axios.post('/submithighscore', {highscore: this.state.moveHistory.length, name: document.getElementById("namesubmitHS").value, uri: this.state.uri})
            .then( res => {
                console.log(res);
                console.log(res.data);
            });
    }

    resetPuzzle = event => {
        event.preventDefault();
        this.setState({
            playerState: this.state.playerStart.slice(),
            moveHistory: [],
        });
    }



    handleCollision = (dirObj,robotSelected,color) => {
        var newPosition;
        switch(dirObj.dir) {
            case UP:
                var robotX = this.state.playerState[robotSelected].left;
                var robotY = this.state.playerState[robotSelected].top;
                var minimumWall = 0;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left == robotX && wall.top < robotY && wall.top > minimumWall) {
                        minimumWall = wall.top + 4;
                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left == robotX && checkRobot.top < robotY && checkRobot.top > minimumWall - 4) {
                        minimumWall = checkRobot.top + 40;
                    }

                });

                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            case RIGHT:
                var robotX = this.state.playerState[robotSelected].left;
                var robotY = this.state.playerState[robotSelected].top;
                var minimumWall = MAX_WIDTH - 40;
                this.state.wallVerticle.map(wall => {
                    if (wall.top == robotY && wall.left > robotX && wall.left < minimumWall) {
                        minimumWall = wall.left - 36;

                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top == robotY && checkRobot.left > robotX && checkRobot.left < minimumWall + 36) {
                        minimumWall = checkRobot.left - 40;
                    }

                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case LEFT:
                var robotX = this.state.playerState[robotSelected].left;
                var robotY = this.state.playerState[robotSelected].top;
                var minimumWall = 0;
                this.state.wallVerticle.map(wall => {
                    if (wall.top == robotY && wall.left < robotX && wall.left > minimumWall) {
                        minimumWall = wall.left + 4;

                    }


                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top == robotY && checkRobot.left < robotX && checkRobot.left > minimumWall - 4) {
                        minimumWall = checkRobot.left + 40;
                    }
                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case DOWN:
                var robotX = this.state.playerState[robotSelected].left;
                var robotY = this.state.playerState[robotSelected].top;
                var minimumWall = MAX_HEIGHT - 40;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left == robotX && wall.top > robotY && wall.top < minimumWall)
                        minimumWall = wall.top - 36;

                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left == robotX && checkRobot.top > robotY && checkRobot.top < minimumWall + 36) {
                        minimumWall = checkRobot.top - 40;
                    }
                });
                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            default:
                return;
        }
        return newPosition;
    }

    checkwin = (robotPosition) => {
        if (robotPosition.top == this.state.goal.top && robotPosition.left == this.state.goal.left) {

            if (this.state.createMode == 'No') {
                return  (   <div><div>You Win! with {this.state.moveHistory.length} Moves! </div>
                        <input style={buttonpanel()} id={"namesubmitHS"} type={"text"} placeholder={"Username"}>

                        </input>
                        <form onSubmit={this.submitAnswer} style={buttonpanel()}>
                            <button type="submit">Submit Highscore </button>
                        </form>
                        </div>
                    );
            }
            else {
                return (
                <div>
                    <form onSubmit={this.submitPuzzle} style={buttonpanel()}>
                        <button type="submit">Add Puzzle to Database</button>
                    </form>
                    <input style={buttonpanel()} id={"namesubmit"} type={"text"} placeholder={"Name Of Puzzle?"}>

                    </input>
                </div>

                );
            }
        }
        else {
            return '';
        }
    }


    handlePlayerMovement = (dirObj) => {
        var newPosition = this.handleCollision(dirObj,this.state.robotSelected,this.state.playerState[this.state.robotSelected].color);
        var playerState = this.state.playerState;
        var moveHistory = this.state.moveHistory;
        newPosition = extend(newPosition,{colorSignifier: playerState[this.state.robotSelected].colorSignifier});
        if (!(newPosition.top == playerState[this.state.robotSelected].top && newPosition.left == playerState[this.state.robotSelected].left)) {
            moveHistory.push({dir: dirObj.dir, robot: this.state.robotSelected, colorSignifier: playerState[this.state.robotSelected].colorSignifier});
        }
        playerState[this.state.robotSelected] = newPosition;
        this.setState({
            playerState: playerState,
            moveHistory: moveHistory,
        });
        this.checkwin(newPosition);
    }


    render() {
        return (
        <div style={gamepanel()}>Moves:
            <div style={movespanel()}>
                {
                    this.state.moveHistory.map(move =>
                        <img src={DIRECTION_MAP_IMAGES[this.state.playerState[move.robot].colorSignifier][move.dir]}/>
                    )
                }
            </div>
            <Board width={MAX_WIDTH} height={MAX_HEIGHT}>
                {
                    this.state.boardState.map(square =>
                        <Square dimension={40} position={{top:square.top,left: square.left}}/>
                    )
                }
                <Goal dimension={40} position={this.state.goal}/>
                {
                    this.state.playerState.map((player, index) =>
                        <Robot
                            dimension={40}
                            position={{top:player.top,left:player.left}}
                            color={player.color}
                            index={index}
                            onClick={this.robotSelect}
                            handlePlayerMovement={this.handlePlayerMovement}
                        />
                    )


                }
                {
                    this.state.wallHorizontal.map(wallH =>
                        <Wall orientation={'horizontal'} dimension={40} position={{top:wallH.top,left:wallH.left}}/>
                    )
                }
                {
                    this.state.wallVerticle.map(wallV =>
                        <Wall orientation={'verticle'} dimension={40} position={{top:wallV.top,left:wallV.left}}/>
                    )

                }
            </Board>
            <div id={'controlPanel'} style={controlpanel()} >
                    {<div>{'http://' + window.location.host + '/play/' + this.state.uri}</div>}
                    {
                        this.state.playerState.map(position =>
                            this.checkwin(position)
                        )
                    }
                    <form onSubmit={this.resetPuzzle} style={buttonpanel()}>
                        <button type="submit">Reset</button>
                    </form>
            </div>
            <HighScores highscores={this.state.highscores}/>
        </div>
        );
    }
}

export default Game;