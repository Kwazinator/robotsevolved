
import React from 'react';
import axios from 'axios';

import MovesView from '../components/MovesView';
import Square from '../components/Square';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Wall from '../components/Wall';
import Goal from '../components/Goal';
import extend from '../constants/extend';
import YouWinView from '../components/YouWinView';
import AddPuzzleView from '../components/AddPuzzleView';
import DisplayView from './DisplayView';
import HighScores from '../components/HighScores';
import {LEFT,RIGHT,UP,DOWN,MAX_WIDTH,MAX_HEIGHT,ROBOT_BLUE,ROBOT_GREEN,ROBOT_RED,ROBOT_YELLOW,GREEN_UP_PICTURE,DIRECTION_MAP_IMAGES} from '../constants/constants';
import BoardGenerator from '../components/boardgenerator';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const gamepanel = () => {
    return {
        width: '100%',
    };
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        console.log(window.token);
        if (window.token.uri == '') {
            var board = BoardGenerator(MAX_WIDTH,MAX_HEIGHT,.90);
            this.state = extend({
                robotSelected: 0,
                moveHistory: [],
                uri: '',
                createMode: 'Yes',
                highscores: [],
            },board);
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
        console.log('here')
        event.preventDefault();
        console.log('here2')
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
        var robotX = this.state.playerState[robotSelected].left;
        var robotY = this.state.playerState[robotSelected].top;
        switch(dirObj.dir) {
            case UP:
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
                return  (<YouWinView numMoves={this.state.moveHistory.length} submitAnswer={this.submitAnswer}/>);
            }
            else {
                return (<AddPuzzleView submitPuzzle={this.submitPuzzle}/>);
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
    }


    render() {
        return (
        <div style={gamepanel()}>
            <MovesView moveHistory={this.state.moveHistory} playerState={this.state.playerState}/>
            <Board width={MAX_WIDTH} height={MAX_HEIGHT}>
                {
                    this.state.boardState.map(square =>
                        <Square
                            dimension={40}
                            position={{top:square.top,left: square.left}}
                        />
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
                        <Wall
                            orientation={'horizontal'}
                            dimension={40}
                            position={{top:wallH.top,left:wallH.left}}
                        />
                    )
                }
                {
                    this.state.wallVerticle.map(wallV =>
                        <Wall
                            orientation={'verticle'}
                            dimension={40}
                            position={{top:wallV.top,left:wallV.left}}
                        />
                    )

                }
            </Board>
            <DisplayView
                playerState={this.state.playerState}
                uri={this.state.uri}
                resetPuzzle={this.resetPuzzle}
                highscores={this.state.highscores}
                checkwin={this.checkwin}
            />
        </div>
        );
    }
}

export default Game;