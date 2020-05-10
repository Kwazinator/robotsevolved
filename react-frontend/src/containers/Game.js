
import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router'

import MovesView from '../components/MovesView';
import Square from '../components/Square';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Wall from '../components/Wall';
import Goal from '../components/Goal';
import GameWonOverlay from "../components/GameWonOverlay";
import ColoredLine from '../components/ColoredLine';
import extend from '../constants/extend';
import YouWinView from '../components/YouWinView';
import AddPuzzleView from '../components/AddPuzzleView';
import DisplayView from './DisplayView';
import GameWonDisplayView from "./GameWonDisplayView";
import HighScores from '../components/HighScores';
import ToggleSettings from '../components/ToggleSettings';
import {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    MAX_WIDTH,
    MAX_HEIGHT,
    ROBOT_BLUE,
    ROBOT_GREEN,
    ROBOT_RED,
    ROBOT_YELLOW,
    GREEN_UP_PICTURE,
    DIRECTION_MAP_IMAGES,
    LINE_INDICATOR_COLOR
} from '../constants/constants';
import BoardGenerator from '../components/boardgenerator';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40,9].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const gamepanel = () => {
    return {
        width: '100%',
    };
};

class Game extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.loadedGame === 'Yes') {
            this.state = JSON.parse(this.props.gamedata);
            this.state.highscores = this.props.highscores;
            this.state.uri = this.props.uri;
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
        }
        else {
            var board = BoardGenerator(MAX_WIDTH,MAX_HEIGHT,.90);
            this.state = extend({
                robotSelected: 0,
                moveHistory: [],
                uri: '',
                createMode: 'Yes',
                highscores: [],
                ColoredLineDirections: [],
            },board);
        }
    }

    robotSelect = (i) => {
        this.setState({
            robotSelected: i,
        });
    };

    submitPuzzle = event => {
        event.preventDefault();
        var namesubmit = document.getElementById("namesubmit").value;
        var state = this.state;
        state.playerState = this.state.playerStart.slice();
        state.moveHistory = [];
        state.createMode = 'No';
        axios.post('/submitpuzzle', extend({puzzledata: state},{name: namesubmit}))
            .then( res => {
                this.setState({
                    uri: res.data.uri,
                    gameWon: false
                });
                this.props.history.push('/play/' + res.data.uri)
            });
    };

    toggleLineIndicators = () => {
        if (this.state.ColoredLineDirections.length === 0) {
            this.setState({
                ColoredLineDirections: [LEFT,RIGHT,UP,DOWN],
            });
        }
        else {
            this.setState({
                ColoredLineDirections: [],
            });
        }
    };

    submitAnswer = event => {
        event.preventDefault();
        console.log(this.state.uri);
        axios.post('/submithighscore', {highscore: this.state.moveHistory.length, name: document.getElementById("namesubmitHS").value, uri: this.state.uri})
            .then( res => {
                this.setState({gameWon: false});
            });
    };

    resetPuzzle = event => {
        event.preventDefault();
        this.setState({
            playerState: this.state.playerStart.slice(),
            moveHistory: [],
            gameWon: false
        });
    };

    tabSelector = () => {
        if (this.state.gameWon === false) {
            var robotSelected = this.state.robotSelected + 1;
            robotSelected = robotSelected % 4;
            this.setState({
                robotSelected: robotSelected,
            });
        }
    };


    handleCollision = (dirObj,robotSelected,color) => {
        var newPosition;
        var robotX = this.state.playerState[robotSelected].left;
        var robotY = this.state.playerState[robotSelected].top;
        switch(dirObj.dir) {
            case UP:
                var minimumWall = 0;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left === robotX && wall.top < robotY && wall.top > minimumWall) {
                        minimumWall = wall.top + 4;
                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left === robotX && checkRobot.top < robotY && checkRobot.top > minimumWall - 4) {
                        minimumWall = checkRobot.top + 40;
                    }

                });

                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            case RIGHT:
                var minimumWall = MAX_WIDTH - 40;
                this.state.wallVerticle.map(wall => {
                    if (wall.top === robotY && wall.left > robotX && wall.left < minimumWall) {
                        minimumWall = wall.left - 36;

                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top === robotY && checkRobot.left > robotX && checkRobot.left < minimumWall + 36) {
                        minimumWall = checkRobot.left - 40;
                    }

                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case LEFT:
                var minimumWall = 0;
                this.state.wallVerticle.map(wall => {
                    if (wall.top === robotY && wall.left < robotX && wall.left > minimumWall) {
                        minimumWall = wall.left + 4;

                    }


                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top === robotY && checkRobot.left < robotX && checkRobot.left > minimumWall - 4) {
                        minimumWall = checkRobot.left + 40;
                    }
                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case DOWN:
                var minimumWall = MAX_HEIGHT - 40;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left === robotX && wall.top > robotY && wall.top < minimumWall)
                        minimumWall = wall.top - 36;

                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left === robotX && checkRobot.top > robotY && checkRobot.top < minimumWall + 36) {
                        minimumWall = checkRobot.top - 40;
                    }
                });
                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            default:
                return;
        }
        return newPosition;
    };

    checkwin = (robotPosition) => {
        if (robotPosition.top === this.state.goal.top && robotPosition.left === this.state.goal.left) {
            if (this.state.gameWon === false)
                this.setState({gameWon: true});
            if (this.state.createMode === 'No') {
                return  (<YouWinView numMoves={this.state.moveHistory.length} submitAnswer={this.submitAnswer}/>);
            }
            else {
                return (<AddPuzzleView submitPuzzle={this.submitPuzzle}/>);
            }
        }
        else {
            return '';
        }
    };


    handlePlayerMovement = (dirObj) => {
        if (dirObj.dir !== undefined && this.state.gameWon === false) {
            var newPosition = this.handleCollision(dirObj, this.state.robotSelected, this.state.playerState[this.state.robotSelected].color);
            var playerState = this.state.playerState;
            var moveHistory = this.state.moveHistory;
            newPosition = extend(newPosition, {colorSignifier: playerState[this.state.robotSelected].colorSignifier});
            if (!(newPosition.top === playerState[this.state.robotSelected].top && newPosition.left === playerState[this.state.robotSelected].left)) {
                moveHistory.push({
                    dir: dirObj.dir,
                    robot: this.state.robotSelected,
                    colorSignifier: playerState[this.state.robotSelected].colorSignifier
                });
            }
            playerState[this.state.robotSelected] = newPosition;
            this.setState({
                playerState: playerState,
                moveHistory: moveHistory,
            });
            this.checkwin(newPosition);
        }
    };

    handlePlayerMovementFromMouse = (posObj) => {
        var newDirection;
        var robot = this.state.playerState[this.state.robotSelected];
        if (posObj.top === robot.top && posObj.left < robot.left)
            newDirection = { top: 0, left: -40, dir: LEFT};
        else if (posObj.top === robot.top && posObj.left > robot.left)
            newDirection = { top: 0, left: 40, dir: RIGHT};
        else if (posObj.top < robot.top && posObj.left === robot.left)
            newDirection = { top: -40, left: 0, dir: UP};
        else if (posObj.top > robot.top && posObj.left === robot.left)
            newDirection = { top: 40, left: 0, dir: DOWN};
        else newDirection = { top: 0, left: 0, dir: undefined};
        this.handlePlayerMovement(newDirection)
    };


    render() {
        return (
        <div id={'GameMain'} style={gamepanel()}>
            <DisplayView
                uri={this.state.uri}
                resetPuzzle={this.resetPuzzle}
            />
            <Board width={MAX_WIDTH} height={MAX_HEIGHT}>
                {
                    this.state.boardState.map(square =>
                        <Square dimension={40}
                                position={{top:square.top,left: square.left}}
                                handlePlayerMovementFromMouse={this.handlePlayerMovementFromMouse}
                        />
                    )
                }
                <Goal dimension={40} position={this.state.goal}/>
                {
                    this.state.ColoredLineDirections.map(ColoredLineDirection =>
                        <ColoredLine
                            dir={ColoredLineDirection}
                            position={{
                                top: this.state.playerState[this.state.robotSelected].top,
                                left: this.state.playerState[this.state.robotSelected].left
                            }}
                            endPosition={this.handleCollision({dir: ColoredLineDirection}, this.state.robotSelected, this.state.playerState[this.state.robotSelected].color)}
                            color={LINE_INDICATOR_COLOR}
                        />
                    )
                }
                {
                    this.state.playerState.map((player, index) =>
                        <Robot
                            dimension={40}
                            position={{top:player.top,left:player.left}}
                            color={player.color}
                            selected={this.state.robotSelected}
                            index={index}
                            onClick={this.robotSelect}
                            handlePlayerMovement={this.handlePlayerMovement}
                            tabSelector={this.tabSelector}
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
                <GameWonOverlay
                    width={MAX_WIDTH}
                    height={MAX_HEIGHT}
                    visible={this.state.gameWon}
                >
                    <GameWonDisplayView
                        playerState={this.state.playerState}
                        resetPuzzle={this.resetPuzzle}
                        highscores={this.state.highscores}
                        checkwin={this.checkwin}
                    />
                </GameWonOverlay>
            </Board>
            <MovesView moveHistory={this.state.moveHistory} playerState={this.state.playerState}/>
            <HighScores highscores={this.state.highscores}/>
            <ToggleSettings onClick={this.toggleLineIndicators}/>
        </div>
        );
    }
}

export default withRouter(Game);