import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import Draggable from 'react-draggable';
import LearnGameItems from '../components/LearnGameItems';
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
import YouWinDailySingleModal from '../components/YouWinDailySingleModal';
import YouWinDailyFinalModal from '../components/YouWinDailyFinalModal';
import AddPuzzleModal from '../components/AddPuzzleModal';
import DisplayView from './DisplayView';
import HighScores from '../components/HighScores';
import DailyChallengeScores from '../components/DailyChallengeScores';
import PuzzleRushWinModal from '../containers/Modals/PuzzleRushFinishedModal';
import RandomGameStatsModal from '../containers/Modals/RandomGameStatsModal';
import DescriptionList from '../components/DescriptionList';
import YouWinLessonModal from '../components/YouWinLessonModal';
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
import Typography from "@material-ui/core/Typography";

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
const formatGeneratedMoveSequence = (moves) => {
    var images = []
    moves.map(move => {
        var color = move.charAt(0);
        var direction = move.charAt(1);
        if (color == 'B') {
            color = 'blue'
        }
        else if (color == 'R') {
            color = 'red'
        }
        else if (color == 'Y') {
            color = 'yellow'
        }
        else {
            color = 'green'
        }
        if (direction == 'N') {
            direction = UP
        }
        else if (direction == 'S') {
            direction = DOWN
        }
        else if (direction == 'E') {
            direction = RIGHT
        }
        else {
            direction = LEFT
        }
        images.push(<img src={DIRECTION_MAP_IMAGES[color][direction]}/>)
    });
    return images
}


const setDefaultSquareSize = (boardWidth) => {
    const drawerWidth = document.getElementById("MainDrawer") == null ? 140 : parseInt(getComputedStyle(document.getElementById("MainDrawer")).width);
    const windowWidth = window.innerWidth;
    var settings = ((windowWidth < 600) ? windowWidth : (windowWidth - drawerWidth) / 1.75);
    settings = settings / boardWidth;
    settings = parseInt(settings);
    settings = settings - (settings % 4);
    if (settings < 16) {
        settings = 16;
    }
    else if (settings > 52) {
        settings = 52;
    }
    return settings;
};



class Game extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.puzzleRush === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.games = this.props.games
            this.state.p_id = this.props.p_id;
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.squareSize = 40;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width);
            this.state.tipsText = []
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.goals = [];
            this.props.games.map(game => {
                var gamedata = JSON.parse(game.g_puzzledata)
                this.state.goals.push(gamedata.goal)
            })
            this.state.games = this.props.games
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width);
            console.log('here')
            console.log(this.props.playerStateList)
            this.state.gamesWonDaily = [false,false,false,false];
            if (this.props.savedMoves != null) {
                this.state.moveHistoryList = this.props.savedMoves
                this.state.gamesWonDaily = [true,true,true,true]
                this.state.moveHistory = this.props.savedMoves[0].slice()
                this.state.playerState = this.props.playerStateList[0].slice()
            }
            else {
                this.state.moveHistoryList=[];
            }
            this.state.playerStateList = this.props.playerStateList != null ? this.props.playerStateList : [];
            this.state.tipsText = ['Complete All puzzles to complete'];
            this.state.highscores = this.props.highscores;
            this.state.dc_id = this.props.dc_id;
        }
        else if (this.props.randomGame === 'Yes') {
            this.state = JSON.parse(this.props.game.g_puzzledata)
            this.state.lowestMoves = this.props.game.g_moves
            this.state.lowestMoveSequence = formatGeneratedMoveSequence(JSON.parse(this.props.game.g_solutiondata))
            this.state.difficulty = this.props.game.g_difficulty
            this.state.createMode = 'No';
            this.state.gameWon = false;
            this.state.buildMode = false;
            this.state.ColoredLineDirections = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width);
            this.state.tipsText = ['this game was randomly generated']
        }
        else if (this.props.learnMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].puzzledata)
            this.state.games = this.props.games
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width);
            this.state.tipsText = [this.props.games[0].description];
        }
        else if (this.props.loadedGame === 'Yes') {
            this.state = JSON.parse(this.props.gamedata);
            this.state.highscores = this.props.highscores;
            this.state.uri = this.props.uri;
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.squareSize = 40;
            this.state.buildMode = false;
            this.state.copiedToClipboard = false;
            this.state.squareSize = setDefaultSquareSize(this.state.width);
            this.state.tipsText = []
        }
        else {
            var squareSize = 40;
            var board = BoardGenerator(this.props.settingsWidth,this.props.settingsHeight,1,'blank');
            this.state = extend({
                robotSelected: 0,
                moveHistory: [],
                uri: '',
                createMode: 'Yes',
                buildMode: true,
                highscores: [],
                showBoardResetPanelModal: false,
                ColoredLineDirections: [],
                width: this.props.settingsWidth,
                height: this.props.settingsHeight,
                percentWall: this.props.settingsPercent,
                squareSize: squareSize,
                copiedToClipboard: false,
                tipsText: [
                                        'Click on Wall spots to toggle',
                                        'Click and Drag robots or goal to move robots',
                                        'When you are ready, toggle build mode in order to solve the puzzle',
                                        'You must solve the puzzle in order to submit.']
            },board);
            this.state.squareSize = setDefaultSquareSize(this.state.width);
        }
    };

    setDefaultSquareSize = (boardWidth) => {

        const drawerWidth = document.getElementById("MainDrawer")
        const windowWidth = window.innerWidth;
        var settings = windowWidth - drawerWidth;
        settings = ((windowWidth < 600) ? settings : settings / 1.5);
        settings = settings / boardWidth;
        this.setState({
            squareSize: settings,
        });
    };

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


    updateDailyHighscores = () => {
        axios.get('/dailychallengehighscores?dc_id=' + this.state.dc_id)
            .then( res => {
                this.setState({
                    highscores: JSON.parse(res.data.highscores),
                });
            });
    }

    componentDidMount = () => {
        if (this.props.loadedGame === 'Yes') {
            this.updateHighscores();
            var IntervalId = setInterval(this.updateHighscores, 4000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            this.updateDailyHighscores();
            var IntervalId = setInterval(this.updateDailyHighscores, 4000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
    };

    componentWillUnmount = () => {
        if (this.props.loadedGame === 'Yes') {
            clearInterval(this.state.IntervalId);
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
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
        var username = 'Anonymous';
        if (window.userInfo !== null) {
            username = window.userInfo.username
        }
        axios.post('/submitpuzzle', extend({puzzledata: state},{name: namesubmit,authorname: username}))
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

    toggleBuildMode = () => {
        if (this.state.buildMode) {
            this.setState({
                buildMode: false,
                playerState: this.state.playerStart.slice(),
                moveHistory: [],
            });
        }
        else {
            this.setState({
                playerState: this.state.playerStart.slice(),
                moveHistory: [],
                buildMode: true,
            });
        }
    };

    submitAnswer = event => {
        event.preventDefault();
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
            gameWon: false,
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

    closeRandomStatsModal = event => {
        this.setState({
            closeRandomStatsModal: false,
            playerState: this.state.playerStart.slice(),
            moveHistory: [],
            gameWon: false
        });
    }

    closeCreateBoardModal = event => {
        this.setState({
            showBoardResetPanelModal: false
        });
    };

    closePuzzleRushFinishedModal = event => {
        this.setState({
            showPuzzleRushFinishedModal: false
        });

    }

    createBoard = (width,height,percent) => {
        var board = BoardGenerator(width,height,percent, 'blank');
        var squareSize = setDefaultSquareSize(width);
        this.setState(extend({
            width: width,
            height: height,
            percent: percent,
            squareSize: squareSize,
        },board));
        this.closeCreateBoardModal()
    };

    showStatsModal = () => {
        this.setState({
            playerState: this.state.playerStart.slice(),
            moveHistory: [],
            gameWon: false,
            showStatsModal: true,
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


    puzzleRushTimeUp = () => {
        var totalMovesDiff = 0;
        this.state.solutiondifference.map(numMoves => {
            totalMovesDiff += numMoves;
        });
        var averageTime = parseInt(300 / (this.state.numPuzzleon))
        var totalMoves = 0;
        this.state.totalMovesList.map(numMoves => {
            totalMoves += numMoves
        });
        var avgMoves = parseInt(totalMoves / (this.state.numPuzzleon))
        var movesPerSecond = totalMoves / 300;

        axios.post('/puzzlerushend', {p_id: this.state.p_id,totalMoves: totalMoves,differenceFrom: totalMovesDiff})
            .then( res => {
                console.log(res.data);
            });

        this.setState({
            showPuzzleRushFinishedModal: true,
            numPuzzlesCompleted: this.state.numPuzzleon,
            percentile: 'TBD%',
            averageTime: averageTime + 's',
            averageMoves: avgMoves,
            differenceOptimal: totalMovesDiff,
            movesPerSecond: movesPerSecond
        });
    }

    submitDailyAnswer = (LastRobotPosition) => {
        var moveHistoryList = this.state.moveHistoryList.slice()
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice()
        var numMoves = 0
        moveHistoryList.map(moveHistory => {
            numMoves += moveHistory.length
        });
        var playerStateList = this.state.playerStateList.slice()
        var playerState = this.state.playerState.slice()
        console.log(this.state.robotSelected)
        playerState[parseInt(this.state.robotSelected)] = LastRobotPosition;
        console.log(playerState[parseInt(this.state.robotSelected)])
        console.log(playerState);

        playerStateList[this.state.numPuzzleon] = playerState
        console.log(LastRobotPosition);
        console.log(playerState);
        axios.post('/dailychallenge', {score: numMoves, name: document.getElementById("namesubmitHS").value, solutiondata: moveHistoryList, dc_id: this.state.dc_id, playerStateList: playerStateList})
            .then( res => {
                console.log(res)
                this.handleUndoMove();
            });
        this.state.gameWon = false;
    }

    checkwin = (robotPosition) => {
        if (robotPosition.top === this.state.goal.top && robotPosition.left === this.state.goal.left) {
            if (this.state.gameWon === false)
                this.setState({gameWon: true});
            if (this.state.createMode === 'No' && this.props.puzzleRush !== 'Yes') {
                var username = '';
                if (window.userInfo !== null) {
                    username = window.userInfo.username
                }
                if (this.props.randomGame === 'Yes') {
                    return (
                        <RandomGameStatsModal
                            show={this.state.gameWon}
                            lowestMoves={this.state.lowestMoves}
                            lowestMoveSequence={this.state.lowestMoveSequence}
                            numMoves={this.state.moveHistory.length}
                            difficulty={this.state.difficulty}
                            resetPuzzle={this.resetPuzzle}
                            handleShowRandomAnswers={this.handleShowRandomAnswers}
                        />
                    );
                }
                else if (this.props.dailyChallengeMode === 'Yes') {
                    var Won=true
                    this.state.gamesWonDaily.map((gameWon,index) => {
                        if (!(index == this.state.numPuzzleon) && !gameWon) {
                            Won = false
                        }
                    });
                    var moveHistoryList = this.state.moveHistoryList
                    moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory
                    var numMoves = 0
                    moveHistoryList.map(moveHistory => {
                        numMoves += moveHistory.length
                    });
                    return (Won ? <YouWinDailyFinalModal
                        show={this.state.gameWon}
                        numMoves={numMoves}
                        submitAnswer={this.submitDailyAnswer}
                        resetPuzzle={this.resetPuzzle}
                        username={username}
                        undoMove={this.handleUndoMove}
                        robotPosition={robotPosition}
                    /> : <YouWinDailySingleModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        undoMove={this.handleUndoMove}
                        resetPuzzle={this.resetPuzzle}
                        games={this.state.games}
                        handleClickGame={this.handleDailyClickGame}
                        numPuzzleon={this.state.numPuzzleon}
                        moveNextPuzzle={this.moveNextPuzzle}
                    />);
                }
                else if (this.props.learnMode === 'Yes') {
                    return  (<YouWinLessonModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        resetPuzzle={this.resetPuzzle}
                    />);
                }
                else {
                    return  (<YouWinModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        submitAnswer={this.submitAnswer}
                        resetPuzzle={this.resetPuzzle}
                        username={username}
                    />);
                }
            }
            else if (this.props.puzzleRush === 'Yes'){
                axios.post('/puzzlerushsubmit', {p_id: this.state.p_id,g_id:this.state.games[this.state.numPuzzleon].g_id, moveHistory: this.state.moveHistory})
                    .then( res => {
                        console.log(res.data);
                    });
                var totalMoves = this.state.moveHistory.slice().length
                var totalMovesList = this.state.totalMovesList
                totalMovesList.push(totalMoves)
                var solutionmoves = totalMoves - this.state.games[this.state.numPuzzleon].g_moves
                var solutiondifference = this.state.solutiondifference
                solutiondifference.push(solutionmoves)
                var puzzledata = JSON.parse(this.state.games[this.state.numPuzzleon + 1].g_puzzledata)
                if (this.state.numPuzzleon + 3 > this.state.games.length) {
                    axios.get('/puzzlerushgetmore?p_id=' + this.props.p_id + '&difficulty=' + this.props.difficulty)
                        .then( res => {
                                var games = JSON.parse(res.data.games);
                                var stategames = this.state.games
                                var newarray = stategames.concat(games)
                                this.setState({
                                    games: newarray
                                });
                        });
                }
                this.setState(
                    extend(puzzledata,{numPuzzleon: this.state.numPuzzleon + 1, playerState: puzzledata.playerStart.slice(), gameWon: false, solutiondifference: solutiondifference, totalMovesList: totalMovesList})
                );

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

    handleShowRandomAnswers = () => {
        this.setState({
            tipsText: [this.state.lowestMoveSequence]
        })
    }

    handlePlayerMovement = (dirObj) => {
        if (dirObj.dir !== undefined && this.state.gameWon === false && !this.state.buildMode) {
            var oldPositon = {left: this.state.playerState[this.state.robotSelected].left, top: this.state.playerState[this.state.robotSelected].top};
            var newPosition = this.handleCollision(dirObj, this.state.robotSelected, this.state.playerState[this.state.robotSelected].color);
            var playerState = this.state.playerState;
            var moveHistory = this.state.moveHistory;
            newPosition = extend(newPosition, {colorSignifier: playerState[this.state.robotSelected].colorSignifier});
            if (!(newPosition.top === playerState[this.state.robotSelected].top && newPosition.left === playerState[this.state.robotSelected].left) && !this.state.buildMode) {
                moveHistory.push({
                    dir: dirObj.dir,
                    robot: this.state.robotSelected,
                    colorSignifier: playerState[this.state.robotSelected].colorSignifier,
                    prevPosition: oldPositon
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

    moveNextPuzzle = () => {
        this.handleDailyClickGame((this.state.numPuzzleon + 1) % 4)
    }

    handleLearnClickGame = index => {
        var puzzledata = JSON.parse(this.props.games[index].puzzledata);
        var squareSize = setDefaultSquareSize(puzzledata.width);
        this.setState(
            extend(puzzledata,{buildMode: false,squareSize: squareSize, numPuzzleon: index, moveHistory: [], gameWon: false, playerState: puzzledata.playerStart.slice(),tipsText: [this.props.games[index].description]})
        );
    }

    handleDailyClickGame = index => {
        var puzzledata = JSON.parse(this.props.games[index].g_puzzledata);
        if (this.state.moveHistoryList[index]==undefined) {
            var moveHistory = [];
        }
        else {
            var moveHistory = this.state.moveHistoryList[index];
        }

        if (this.state.playerStateList[index]==undefined) {
            puzzledata.playerState = puzzledata.playerStart.slice()
        }
        else {
            puzzledata.playerState = this.state.playerStateList[index];
        }
        var gamesWonDaily = this.state.gamesWonDaily
        if (this.state.gameWon) {
            gamesWonDaily[this.state.numPuzzleon] = true
        }
        else {
            gamesWonDaily[this.state.numPuzzleon] = false
        }
        var playerState = this.state.playerState.slice();
        var playerStateList = this.state.playerStateList;
        playerStateList[this.state.numPuzzleon] = playerState;
        var moveHistoryList = this.state.moveHistoryList;
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice();

        this.setState(
            extend(puzzledata,{highscores: this.state.highscores, numPuzzleon: index, moveHistory: moveHistory, gameWon: false, playerStateList: playerStateList, moveHistoryList: moveHistoryList, gamesWonDaily: gamesWonDaily})
        );
    }


    loadSidebar = () => {
        if (this.props.learnMode == 'Yes') {
            return (
                <Grid container xs={12} direction="column">
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained primary button group"
                        variant="contained">
                        {
                            this.state.games.map((game,index) =>
                                    <LearnGameItems selected={this.state.numPuzzleon} game={game} name={game.name} index={index} handleClickGame={this.handleLearnClickGame}/>
                            )
                        }
                    </ButtonGroup>
                </Grid>
            )
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            return(
                <Grid container xs={12} direction="column">
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical contained primary button group"
                            variant="contained">
                            {
                                this.state.games.map((game,index) =>
                                        <LearnGameItems selected={this.state.numPuzzleon} game={game} name={'Puzzle #' + (index + 1)} index={index} handleClickGame={this.handleDailyClickGame}/>
                                )
                            }
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <DailyChallengeScores highscores={this.state.highscores}/>
                    </Grid>
                </Grid>
            )
        }
        else if (this.state.createMode === 'Yes') {
            return null
        }
        else if (this.props.randomGame === 'Yes') {
            return null
        }
        else {
            return(
            <div style={{display: 'grid'}}>
                <Typography
                    color="secondary"
                    display="block"
                    variant={"h4"}

                >
                    {this.props.name}
                </Typography>
                <br/>
                <HighScores highscores={this.state.highscores}/>
            </div>
            )
        }
    }

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

    handleUndoMove = () => {
        var moveHistory = this.state.moveHistory;
        var playerState = this.state.playerState;
        if (moveHistory.length !== 0) {
            var moveObj = moveHistory.pop();
            playerState[moveObj.robot].left = moveObj.prevPosition.left;
            playerState[moveObj.robot].top = moveObj.prevPosition.top;
            this.setState({
                playerState: playerState,
                moveHistory: moveHistory,
                gameWon: false,
            });
        }
    };

    createModeWallClick = (opacity,orientation,top,left) => {
        if (this.state.createMode === 'Yes' && this.state.buildMode) {
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

    onStopDragHandlerGoal = (position) => {
        this.setState({
            goal: {top: Math.round(position.lastY / this.state.squareSize), left: Math.round(position.lastX / this.state.squareSize)},
            playerState: this.state.playerStart.slice(),
            moveHistory: [],
        })
    };


    onStopDragHandler = (position,index) => {
        var playerState = this.state.playerState.slice();
        var lastX = position.lastX / this.state.squareSize;
        var lastY = position.lastY / this.state.squareSize;
        playerState[index].top = Math.round(lastY);
        playerState[index].left = Math.round(lastX);
        this.setState({
            playerStart: playerState.slice(),
            playerState: playerState,
            moveHistory: []
        });
    };

    render() {
        return (
        <div style={gamepanel()}>
            <Grid container alignItems={"stretch"}>
                <Grid item xs={12} sm={3} md={2}>
                    <DisplayView
                        puzzleRushTimeUp={this.puzzleRushTimeUp}
                        isPuzzleRush={this.props.puzzleRush}
                        numPuzzleRush={this.state.numPuzzleon}
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
                        toggleLineIndicators = {this.toggleLineIndicators}
                        toggleBuildMode = {this.toggleBuildMode}
                        undoMove = {this.handleUndoMove}
                        buildMode = {this.state.buildMode}
                        squareSizeValue = {parseInt((this.state.squareSize/4))}
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
                        <Goal
                            dimension={this.state.squareSize}
                            position={this.state.goal}
                            onStopDragHandler={this.onStopDragHandlerGoal}
                            draggableGrid={[this.state.squareSize,this.state.squareSize]}
                            isCreateMode={this.state.createMode}
                            buildMode={this.state.buildMode}
                        />
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
                                    isCreateMode={this.state.createMode}
                                    buildMode={this.state.buildMode}
                                    onStopDragHandler={this.onStopDragHandler}
                                    draggableGrid={[this.state.squareSize,this.state.squareSize]}
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
                    <DescriptionList
                        tipsText={this.state.tipsText}
                    />
                    {this.loadSidebar()}
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
                <PuzzleRushWinModal
                    show={this.state.showPuzzleRushFinishedModal}
                    closeModal={this.closePuzzleRushFinishedModal}
                    numPuzzlesCompleted={this.state.numPuzzlesCompleted}
                    percentile={this.state.puzzleRushPercentileCompleted}
                    averageTime={this.state.averageTime}
                    averageMoves={this.state.averageMoves}
                    differenceOptimal={this.state.differenceOptimal}
                    movesPerSecond={this.state.movesPerSecond}
                    difficulty={this.props.difficulty}
                />
            </Grid>
        </div>
        );
    }
}

export default withRouter(Game);
