
import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router'

import MovesView from '../components/MovesView';
import Square from '../components/Square';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Wall from '../components/Wall';
import Goal from '../components/Goal';
import Grid from '@material-ui/core/Grid';
import ColoredLine from '../components/ColoredLine';
import extend from '../constants/extend';
import YouWinModal from '../components/YouWinModal';
import AddPuzzleModal from '../components/AddPuzzleModal';
import DisplayView from './DisplayView';
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
import BoardResetModal from "./Modals/BoardResetModal";

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40, 9].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const gamepanel = () => {
    return {
        width: '100%',
        padding: '40px'
    };
};

const leftDisplayPanel = () => {
    return {
        width: '15%',
        display: 'inline-block',
        float: 'left'
    }
};

const rightDisplayPanel = () => {
    return {
        display: 'grid',
        marginTop: '15px'
    }
};

class Game extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.puzzleRush === 'Yes') {
            var yes = this.props.games[0].g_solutiondata
            console.log(yes)
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.games = this.props.games
            this.state.p_id = this.props.p_id
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.squareSize = 40;
            this.state.copiedToClipboard = false;
            console.log(this.state)
        }
        else if (this.props.loadedGame === 'Yes') {
            this.state = JSON.parse(this.props.gamedata);
            this.state.highscores = this.props.highscores;
            this.state.uri = this.props.uri;
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.squareSize = 40;
            this.state.copiedToClipboard = false;
            console.log(this.state)
        }
        else {
            var squareSize = 40;
            var board = BoardGenerator(this.props.settingsWidth,this.props.settingsHeight,.90);
            this.state = extend({
                robotSelected: 0,
                moveHistory: [],
                uri: '',
                createMode: 'Yes',
                highscores: [],
                showBoardResetPanelModal: false,
                ColoredLineDirections: [],
                width: this.props.settingsWidth,
                height: this.props.settingsHeight,
                percentWall: this.props.settingsPercent,
                squareSize: squareSize,
                copiedToClipboard: false
            },board);
        }
    }

    updateHighscores = () => {
        axios.get('/updatehighscores?uri=' + this.state.uri)
            .then( res => {
                this.setState({
                    highscores: JSON.parse(res.data.highscores),
                });
            });
    };

    DimensionChanged = (dimension) => {
        this.setState({
            squareSize: dimension * 4
        });
    };

    copiedClipboard = () => {
        this.setState({
            copiedToClipboard: true,
        });

    };

    componentDidMount = () => {
        if (this.props.loadedGame === 'Yes') {
            var IntervalId = setInterval(this.updateHighscores, 2000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
    };

    componentWillUnmount = () => {
        if (this.props.loadedGame === 'Yes') {
            clearInterval(this.state.IntervalId);
        }
    };



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
        this.resetPuzzle();
    };

    resetPuzzle = event => {
        if (typeof event !== 'undefined') {
            event.preventDefault();
        }
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

    createBoardPressed = (type) => {
        if (type === 'Create Board') {
            this.setState({
                showBoardResetPanelModal: true
            });
        }
    };

    closeCreateBoardModal = event => {
        this.setState({
            showBoardResetPanelModal: false
        });
    };

    createBoard = (width,height,percent) => {
        var board = BoardGenerator(width,height,percent);
        this.setState(extend({
            width: width,
            height: height,
            percent: percent,
        },board));
        this.closeCreateBoardModal()
    };


    handleCollision = (dirObj,robotSelected,color) => {
        var newPosition;
        var robotX = this.state.playerState[robotSelected].left;
        var robotY = this.state.playerState[robotSelected].top;
        console.log(robotX);
        console.log(robotY);
        switch(dirObj.dir) {
            case UP:
                var minimumWall = 0;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left === robotX && wall.top <= robotY && wall.top > minimumWall && wall.opacity === 1) {
                        minimumWall = wall.top;
                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left === robotX && checkRobot.top < robotY && checkRobot.top + 1 > minimumWall) {
                        minimumWall = checkRobot.top + 1;
                    }

                });

                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            case RIGHT:
                var minimumWall = this.state.width - 1;
                this.state.wallVerticle.map(wall => {
                    if (wall.top === robotY && wall.left > robotX && wall.left < minimumWall + 1 && wall.opacity === 1) {
                        minimumWall = wall.left - 1;

                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top === robotY && checkRobot.left > robotX && checkRobot.left < minimumWall + 1) {
                        minimumWall = checkRobot.left - 1;
                    }

                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case LEFT:
                var minimumWall = 0;
                this.state.wallVerticle.map(wall => {
                    if (wall.top === robotY && wall.left <= robotX && wall.left > minimumWall && wall.opacity === 1) {
                        minimumWall = wall.left;
                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.top === robotY && checkRobot.left < robotX && checkRobot.left + 1 > minimumWall) {
                        minimumWall = checkRobot.left + 1;
                    }
                });
                newPosition = {top: robotY, left:minimumWall, color: color};
                break;
            case DOWN:
                var minimumWall = this.state.height - 1;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left === robotX && wall.top > robotY && wall.top < minimumWall + 1 && wall.opacity === 1)
                        minimumWall = wall.top - 1;

                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left === robotX && checkRobot.top > robotY && checkRobot.top < minimumWall + 1) {
                        minimumWall = checkRobot.top - 1;
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
                return  (<YouWinModal
                    show={this.state.gameWon}
                    numMoves={this.state.moveHistory.length}
                    submitAnswer={this.submitAnswer}
                    resetPuzzle={this.resetPuzzle}
                />);
            }
            else {
                return (<AddPuzzleModal
                    show={this.state.gameWon}
                    submitPuzzle={this.submitPuzzle}
                    resetPuzzle={this.resetPuzzle}
                />);
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
            newDirection = { top: 0, left: -(this.state.squareSize), dir: LEFT};
        else if (posObj.top === robot.top && posObj.left > robot.left)
            newDirection = { top: 0, left: this.state.squareSize, dir: RIGHT};
        else if (posObj.top < robot.top && posObj.left === robot.left)
            newDirection = { top: -(this.state.squareSize), left: 0, dir: UP};
        else if (posObj.top > robot.top && posObj.left === robot.left)
            newDirection = { top: this.state.squareSize, left: 0, dir: DOWN};
        else newDirection = { top: 0, left: 0, dir: undefined};
        this.handlePlayerMovement(newDirection)
    };

    createModeWallClick = (opacity,orientation,top,left) => {
        if (this.state.createMode === 'Yes') {
            this.resetPuzzle();
            var indexToChange;
            if (orientation === 'horizontal') {
                var newWallHorizontal = this.state.wallHorizontal;
                newWallHorizontal.map((wallH, index) => {
                    if (wallH.top === top && wallH.left === left) {
                        indexToChange = index;
                    }
                });
                newWallHorizontal[indexToChange] = {top: top,left: left,opacity: opacity};
                console.log('clicking horizontal wall');
                this.setState({
                    wallHorizontal: newWallHorizontal
                });
            }
            else if (orientation === 'verticle') {
                var newWallVerticle = this.state.wallVerticle;
                newWallVerticle.map((wallV, index) => {
                    if (wallV.top === top && wallV.left === left) {
                        indexToChange = index;
                    }
                });
                newWallVerticle[indexToChange] = {top: top, left: left, opacity: opacity};
                this.setState({
                    wallVerticle: newWallVerticle
                });
            }
        }
    };

    render() {
        return (
        <div style={gamepanel()}>
            <Grid container alignItems={"stretch"}>
                <Grid item xs={12} sm={3} md={2}>
                    <DisplayView
                        uri={this.state.uri}
                        resetPuzzle={this.resetPuzzle}
                        createBoard={this.createBoard}
                        width={this.state.width}
                        height={this.state.height}
                        percent={this.state.percent}
                        createMode={this.state.createMode}
                        createBoardPressed={this.createBoardPressed}
                        DimensionChanged={this.DimensionChanged}
                        copiedClipboard = {this.copiedClipboard}
                        copiedToClipboard = {this.copiedToClipboard}
                    />
                    <MovesView moveHistory={this.state.moveHistory} playerState={this.state.playerState}/>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Board width={this.state.width * this.state.squareSize} height={this.state.height * this.state.squareSize}>
                        {
                            this.state.boardState.map(square =>
                                <Square dimension={this.state.squareSize}
                                        position={{top:square.top,left: square.left}}
                                        handlePlayerMovementFromMouse={this.handlePlayerMovementFromMouse}
                                />
                            )
                        }
                        <Goal dimension={this.state.squareSize} position={this.state.goal}/>
                        {
                            this.state.ColoredLineDirections.map(ColoredLineDirection =>
                                <ColoredLine
                                    dimension={this.state.squareSize}
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
                                    dimension={this.state.squareSize}
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
                                    dimension={this.state.squareSize}
                                    position={{top:wallH.top,left:wallH.left}}
                                    opacity={wallH.opacity}
                                    onClick={this.createModeWallClick}
                                />
                            )
                        }
                        {
                            this.state.wallVerticle.map(wallV =>
                                <Wall
                                    orientation={'verticle'}
                                    dimension={this.state.squareSize}
                                    position={{top:wallV.top,left:wallV.left}}
                                    opacity={wallV.opacity}
                                    onClick={this.createModeWallClick}
                                />
                            )

                        }
                    </Board>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <div style={{display: 'grid'}}>
                        <ToggleSettings onClick={this.toggleLineIndicators}/>
                        <HighScores highscores={this.state.highscores}/>
                    </div>
                </Grid>
                <BoardResetModal
                    createBoard={this.createBoard}
                    width={this.state.width}
                    height={this.state.height}
                    percent={this.state.percent}
                    closeModal={this.closeCreateBoardModal}
                    show={this.state.showBoardResetPanelModal}
                />
                {
                    this.state.playerState.map(position =>
                        this.checkwin(position))
                }
            </Grid>
        </div>
        );
    }
}

export default withRouter(Game);
