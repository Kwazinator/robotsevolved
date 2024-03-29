import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import WeeklyGameItems from '../components/WeeklyGameItems'
import React from 'react';
import DailyGameItems from '../components/DailyGameItems';
import axios from 'axios';
import SwitchPad from '../components/SwitchPad'
import SwitchPadOff from '../components/SwitchPadOff'
import DailyMovesView from '../components/DailyMovesView';
import CreateBoardGoalSelector from '../components/CreateBoardGoalSelector';
import FlashMessage from 'react-flash-message'
import Alert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router';
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
import YouWinWeeklyModal from '../components/YouWinWeeklyModal';
import AddPuzzleModal from '../components/AddPuzzleModal';
import DisplayView from './DisplayView';
import HighScores from '../components/HighScores';
import PuzzleRushWinModal from '../containers/Modals/PuzzleRushFinishedModal';
import RandomGameStatsModal from '../containers/Modals/RandomGameStatsModal';
import DescriptionList from '../components/DescriptionList';
import YouWinLessonModal from '../components/YouWinLessonModal';
import DailyChallengeHistoryData from '../components/DailyChallengeHistoryData';
import Timer from "../components/Timer";
import {useStopwatch} from 'react-timer-hook';
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
    LINE_INDICATOR_COLOR,
    MOBILE_INNER_SCREEN_WIDTH
} from '../constants/constants';
import BoardGenerator from '../components/boardgenerator';
import BoardResetModal from "./Modals/BoardResetModal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Chip from "@material-ui/core/Chip";

function MyStopwatch(props) {
       var stopwatchOffset = new Date();
       stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + props.seconds_add + props.minutes_add*60);
      const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ offsetTimestamp: stopwatchOffset, autoStart: true });
    let displaySeconds = seconds + "";
    if (seconds < 10)
          displaySeconds = "0" + seconds
    let displayMinutes = minutes + "";
    if (minutes < 10)
          displayMinutes = "0" + minutes
    let displayHours = hours + "";
    if (hours < 10)
          displayHours = "0" + hours
    const display = displayHours + ":" + displayMinutes + ":" + displaySeconds
    return (
        <div style={{width: "100%", display: "inline-flex"}}>
            <div style={{flex: 1}}/>
            <Chip
                label={<Typography variant={"h4"}>{displayHours}:{displayMinutes}:{displaySeconds}</Typography>}
                color="secondary"
                variant={"outlined"}
            />
                {/*<Typography variant={"h4"}>{displayHours}:{displayMinutes}:{displaySeconds}</Typography>*/}
        </div>
    );
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
    if([37, 38, 39, 40, 9,13].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


const gamepanel = () => {
    return {
        width: '100%',
        paddingTop: '80px',
        paddingLeft: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '0px' : '40px',
    }
}

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


const setDefaultSquareSize = (boardWidth,boardHeight) => {
    const drawerWidth = document.getElementById("MainDrawer") == null ? 140 : parseInt(getComputedStyle(document.getElementById("MainDrawer")).width);
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    var settingstop = windowHeight - 120;

    settingstop = settingstop / boardHeight
    settingstop = parseInt(settingstop);
    settingstop = settingstop - (settingstop % 4)

    var settings = ((windowWidth < MOBILE_INNER_SCREEN_WIDTH) ? windowWidth - 20 : (windowWidth - drawerWidth) / 1.75);
    settings = settings / boardWidth;
    settings = parseInt(settings);
    settings = settings - (settings % 4);
    var squarevalue = settings > settingstop ? settingstop : settings
    if (squarevalue < 16) {
        squarevalue = 16;
    }
    else if (squarevalue > 52) {
        squarevalue = 52;
    }
    return squarevalue;
};

const ColoredLineDirections = [LEFT,RIGHT,UP,DOWN]


class Game extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.puzzleRush === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.games = this.props.games
            this.state.p_id = this.props.p_id;
            this.state.isEvolution = false
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
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.tipsText = []
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.dailyChallengeModeAnswers === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.goals = [];
            this.props.games.map(game => {
                var gamedata = JSON.parse(game.g_puzzledata)
                this.state.goals.push(gamedata.goal)
            })
            this.state.games = this.props.games;
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.isEvolution = false
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.gamesWonDaily = [false,false,false,false];
            this.state.moveHistoryList=[];

            this.state.lowestMoveSequence = formatGeneratedMoveSequence(JSON.parse(this.props.games[0].g_solutiondata))
            this.state.lowestMovesforPuzzle = this.props.games[0].g_moves
            this.state.difficultyforPuzzle = this.props.games[0].g_difficulty
            this.state.playerMovedSequence = JSON.parse(this.props.solutionDataSubmitted)[0]

            this.state.playerStateList = [];
            this.state.tipsText = [];
            this.state.highscores = [];
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.weeklyChallengeMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.dailyDayName = 'Weekly 100';
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
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.isEvolution = false
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.gamesWonWeekly = [false,false,false,false,false];
            if (this.props.savedMoves != null) {
                this.state.moveHistoryList = this.props.savedMoves;
                this.state.gamesWonWeekly = this.props.gamesWon;
                this.state.moveHistory = this.props.savedMoves[0].slice()
                this.state.playerState = this.props.playerStateList[0].slice()
            }
            else {
                this.state.moveHistoryList=[];
            }
            this.state.playerStateList = this.props.playerStateList != null ? this.props.playerStateList : [];
            this.state.tipsText = ['All users with 100 moves get a crown!','Moves are saved','puzzle button turns GREEN when solved with least moves'];
            this.state.highscores = this.props.highscores;
            this.state.wc_id = this.props.wc_id;
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.dailyEvolutionMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.dailyDayName = this.props.games[0].g_name
            this.state.goals = [];
            this.props.games.map(game => {
                var gamedata = JSON.parse(game.g_puzzledata)
                this.state.goals.push(gamedata.goal)
            })
            this.state.games = this.props.games
            this.state.gameWon = false;
            this.state.isEvolution = true;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.daily_start_timer_seconds = this.props.daily_start_timer_seconds
            this.state.daily_start_timer_minutes = this.props.daily_start_timer_minutes
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.coloredSwitchesStart = JSON.parse(JSON.stringify(this.state.coloredSwitchesOn));
            this.state.coloredSwitchesOnList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.gamesWonDaily = [false,false,false,false];
            this.state.coloredSwitchesOff = [];
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
            this.state.tipsText = ['Puzzles reset at 3PM EST', 'email any bugs or suggestions to robotsevolved@gmail.com'];
            this.state.highscores = this.props.highscores;
            this.state.dce_id = this.props.dce_id;
            window.dailyEvolutionSessionSwitchState = [[],[],[],[]];
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].g_puzzledata)
            this.state.dailyDayName = this.props.games[0].g_name
            this.state.goals = [];
            this.props.games.map(game => {
                var gamedata = JSON.parse(game.g_puzzledata)
                this.state.goals.push(gamedata.goal)
            })
            this.state.games = this.props.games
            this.state.gameWon = false;
            this.state.isEvolution = false
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.daily_start_timer_seconds = this.props.daily_start_timer_seconds
            this.state.daily_start_timer_minutes = this.props.daily_start_timer_minutes
            this.state.createMode = 'No';
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
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
            this.state.tipsText = ['Puzzles reset at 3PM EST'];
            this.state.highscores = this.props.highscores;
            this.state.dc_id = this.props.dc_id;
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.randomGame === 'Yes') {
            this.state = JSON.parse(this.props.game.g_puzzledata)
            if (this.props.game.g_moves != 1) {
                this.state.lowestMoves = this.props.game.g_moves
                this.state.isEvolution = false
                this.state.coloredSwitchesOn = [];
                this.state.coloredSwitchesOff = [];
                this.state.lowestMoveSequence = formatGeneratedMoveSequence(JSON.parse(this.props.game.g_solutiondata))
            }
            else {
                this.state.lowestMoves = "I havent created a solver for this yet";
                this.state.lowestMoveSequence = null;
                this.state.coloredSwitchesOff = [];
                this.state.coloredSwitchesStart = JSON.parse(JSON.stringify(this.state.coloredSwitchesOn));
                this.state.isEvolution = true;
            }
            this.state.difficulty = this.props.game.g_difficulty
            this.state.createMode = 'No';
            this.state.gameWon = false;
            this.state.buildMode = false;
            this.state.ColoredLineDirections = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.tipsText = ['this game was randomly generated'];
            this.state.uri = this.props.game.g_uri;
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
            window.history.pushState({id: 'Random Game'},'RobotsEvolved | Random Game','/play/' + this.props.game.g_uri)
        }
        else if (this.props.learnMode === 'Yes') {
            this.state = JSON.parse(this.props.games[0].puzzledata)
            this.state.games = this.props.games
            this.state.gameWon = false;
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.copiedToClipboard = false;
            this.state.numPuzzleon = 0;
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.createMode = 'No';
            this.state.isEvolution = false
            this.state.buildMode = false;
            this.state.totalMovesList = [];
            this.state.solutiondifference = [];
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.tipsText = [this.props.games[0].description];
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
        }
        else if (this.props.loadedGame === 'Yes') {
            this.state = JSON.parse(this.props.gamedata);
            this.state.uri = this.props.uri;
            this.state.votes = this.props.votes
            this.state.hasVoted = this.props.hasVoted
            this.state.gameWon = false;
            this.state.isEvolution = false
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.ColoredLineDirections = [];
            this.state.showBoardResetPanelModal = false;
            this.state.squareSize = 40;
            this.state.buildMode = false;
            this.state.copiedToClipboard = false;
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.tipsText = [];
            if (this.state.coloredGoals == undefined) {
                this.state.coloredGoals = [];
            }
            window.history.pushState({id: 'Play Game'},'RobotsEvolved | Play Game','/play/'+ this.props.uri)
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
            this.state.squareSize = setDefaultSquareSize(this.state.width,this.state.height);
            this.state.coloredGoals = [];
            this.state.coloredSwitchesOn = [];
            this.state.coloredSwitchesOff = [];
            this.state.isEvolution = false
        }
        this.state.showColoredLineDirections = this.props.LineDirections;
        if (this.state.coloredGoals == undefined) {
            this.state.coloredGoals = [];
        }
    };

    updateHighscores = () => {
        axios.get('/updatehighscores?uri=' + this.state.uri)
            .then( res => {
                const highscoresdata = JSON.parse(res.data.highscores)
                if (this.FindhighscoreIsDiff(this.state.highscores,highscoresdata)) {
                    this.setState({
                        highscores: JSON.parse(res.data.highscores),
                    });
                }
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


    FindhighscoreIsDiff = (check,tocheck) => {
        if (check.length != tocheck.length) {
            return true
        }
        var toreturn = false;
        tocheck.map((highscore,index) => {
            if (highscore.numMoves != check[index].numMoves) {
                toreturn = true;
            }
        });
        return toreturn;
    }


    DChighscoreIsDiff = (check,tocheck) => {
        if (check.length != tocheck.length) {
            return true
        }
        var toreturn = false;
        tocheck.map((highscore,index) => {
            if (highscore.score != check[index].score) {
                toreturn = true;
            }
        });
        return toreturn;
    }

    updateWeeklyHighscores = () => {
        axios.get('/weeklychallengehighscores?wc_id=' + this.state.wc_id)
            .then( res => {
                if (res.data.wc_id != this.state.wc_id) {
                    window.weeklyChallengeSessionBestHistory = [[],[],[],[],[]];
                    window.weeklyChallengeSessionBestPlayerState = [[],[],[],[],[]];
                    this.props.handleClickWeeklyClick();
                    return
                }
                const highscoresdata = JSON.parse(res.data.highscores)
                if (this.DChighscoreIsDiff(this.state.highscores,highscoresdata)) {
                    this.setState({
                        highscores: JSON.parse(res.data.highscores),
                    });
                }
            });
    }

    updateDailyEvolutionHighscores = () => {
        axios.get('/dailyevolutionhighscores?dce_id=' + this.state.dce_id)
            .then( res => {
                if (res.data.dce_id != this.state.dce_id) {
                    window.dailyEvolutionSessionBestHistory = [[],[],[],[]];
                    window.dailyEvolutionSessionBestPlayerState = [[],[],[],[]];
                    window.dailyEvolutionSessionSwitchState = [[],[],[],[]];
                    this.props.handleClickDailyEvolution();
                    return
                }
                const highscoresdata = JSON.parse(res.data.highscores)
                if (this.DChighscoreIsDiff(this.state.highscores,highscoresdata)) {
                    this.setState({
                        highscores: JSON.parse(res.data.highscores),
                    });
                    window.dcehighscores = JSON.parse(res.data.highscores)
                }
            });
    }


    updateDailyHighscores = () => {
        axios.get('/dailychallengehighscores?dc_id=' + this.state.dc_id)
            .then( res => {
                if (res.data.dc_id != this.state.dc_id) {
                    window.dailyChallengeSessionBestHistory = [[],[],[],[]];
                    window.dailyChallengeSessionBestPlayerState = [[],[],[],[]];
                    this.props.handleClickDailyChallenge();
                    return
                }
                const highscoresdata = JSON.parse(res.data.highscores)//PoorMan's global redux implementation
                if (this.DChighscoreIsDiff(this.state.highscores,highscoresdata)) {
                    this.setState({
                        highscores: JSON.parse(res.data.highscores),
                    });
                    window.dchighscores = JSON.parse(res.data.highscores)
                }
            });
    }

    componentDidMount = () => {
        window.onkeydown = this.handleKeyDown;
        if (this.props.loadedGame === 'Yes') {
            this.updateHighscores();
            var IntervalId = setInterval(this.updateHighscores, 8000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            this.updateDailyHighscores();
            var IntervalId = setInterval(this.updateDailyHighscores, 6000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
        else if (this.props.dailyEvolutionMode === 'Yes') {
            this.updateDailyEvolutionHighscores();
            var IntervalId = setInterval(this.updateDailyEvolutionHighscores, 6000);
            this.setState({
                IntervalId: IntervalId,
            });
        }
        else if (this.props.weeklyChallengeMode === 'Yes') {
            var IntervalId = setInterval(this.updateWeeklyHighscores, 10000);
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
        else if (this.props.dailyEvolutionMode === 'Yes') {
            clearInterval(this.state.IntervalId);
        }
        else if (this.props.weeklyChallengeMode === 'Yes') {
            clearInterval(this.state.IntervalId);
        }
    };

    handleKeyDown = (e) => {
        let newDirection;
        switch(e.keyCode) {
            case 37:
                newDirection = { top: 0, left: -40, dir: LEFT};
                this.handlePlayerMovement(newDirection);
                break;
            case 38:
                newDirection = { top: -40, left: 0, dir: UP};
                this.handlePlayerMovement(newDirection);
                break;
            case 39:
                newDirection = { top: 0, left: 40, dir: RIGHT};
                this.handlePlayerMovement(newDirection);
                break;
            case 40:
                newDirection = { top: 40, left: 0, dir: DOWN};
                this.handlePlayerMovement(newDirection);
                break;
            case 9:
                this.tabSelector();
                return;
                break;
            case 81:
                if (!this.state.gameWon) {
                    this.handleUndoMove();
                }
                break;
                return;
            case 69:
                if (!this.state.gameWon) {
                    this.resetPuzzle();
                }
                break;
                return;
            case 83:
                newDirection = { top: 40, left: 0, dir: DOWN};
                this.handlePlayerMovement(newDirection);
                break;
            case 68:
                newDirection = { top: 0, left: 40, dir: RIGHT};
                this.handlePlayerMovement(newDirection);
                break;
            case 87:
                newDirection = { top: -40, left: 0, dir: UP};
                this.handlePlayerMovement(newDirection);
                break;
            case 65:
                newDirection = { top: 0, left: -40, dir: LEFT};
                this.handlePlayerMovement(newDirection);
                break;
            default:
                return;
        }
    };

    robotSelect = (i) => {
        this.setState({
            robotSelected: i,
        });
    };

    submitPuzzleCampaign = event => {
        event.preventDefault();
        var namesubmit = document.getElementById("namesubmit").value;
        var state = this.state;
        state.playerState = this.state.playerStart.slice();
        var themoveHistory = this.state.moveHistory.slice()
        state.moveHistory = [];
        state.createMode = 'No';
        var username = window.userInfo.username
        axios.post('/submitpuzzle', extend({puzzledata: state},{name: namesubmit,authorname: username,moveHistory: themoveHistory,type: 'Campaign'}))
            .then( res => {
                this.setState({
                    uri: res.data.uri,
                    gameWon: false
                });
                this.props.history.push('/play/' + res.data.uri)
            });
    };




    submitPuzzle = event => {
        event.preventDefault();
        var namesubmit = document.getElementById("namesubmit").value;
        var state = this.state;
        state.playerState = this.state.playerStart.slice();
        var themoveHistory = this.state.moveHistory.slice()
        state.moveHistory = [];
        state.createMode = 'No';
        var username = 'Anonymous';
        if (window.loggedin === 'Yes') {
            username = window.userInfo.username
        }
        axios.post('/submitpuzzle', extend({puzzledata: state},{name: namesubmit,authorname: username,moveHistory: themoveHistory,type: 'type'}))
            .then( res => {
                this.setState({
                    uri: res.data.uri,
                    gameWon: false
                });
                this.props.history.push('/play/' + res.data.uri)
            });
    };

    toggleLineIndicators = () => {
        if (this.state.showColoredLineDirections === true) {
            this.setState({
                showColoredLineDirections: false,
            });
            this.props.handleLineDirections(false)
        }
        else {
            this.setState({
                showColoredLineDirections: true,
            });
            this.props.handleLineDirections(true)
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
        axios.post('/submithighscore', {highscore: this.state.moveHistory.length,solutiondata: this.state.moveHistory,name: document.getElementById("namesubmitHS").value, uri: this.state.uri})
            .then( res => {
                this.setState({gameWon: false});
            });
        this.resetPuzzle();
    };

    resetPuzzle = event => {
        if (typeof event !== 'undefined') {
            event.preventDefault();
        }
        if (this.state.isEvolution) {
            this.setState({
                playerState: this.state.playerStart.slice(),
                moveHistory: [],
                gameWon: false,
                coloredSwitchesOn: JSON.parse(JSON.stringify(this.state.coloredSwitchesStart)),
                dailySubmittedSucessfully: null
            });
        } else {
            this.setState({
                playerState: this.state.playerStart.slice(),
                moveHistory: [],
                gameWon: false,
                dailySubmittedSucessfully: null
            });
        }
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
        var squareSize = setDefaultSquareSize(width,height);
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


    isWallSolid = (wall) => {
        if (wall.wallType == undefined) {
            return true
        } else {
            var toReturn = true
            var wallType = wall.wallType.substring(0, wall.wallType.length - 4)
            this.state.coloredSwitchesOn.map(switches => {
                if (switches.colorSignifier === wallType) {
                    toReturn = switches.isOn
                }
            });
            return toReturn
        }
    }


    handleCollision = (dirObj,robotSelected,color) => {
        var newPosition;
        var robotX = this.state.playerState[robotSelected].left;
        var robotY = this.state.playerState[robotSelected].top;
        switch(dirObj.dir) {
            case UP:
                var minimumWall = 0;
                this.state.wallHorizontal.map(wall => {
                    if (wall.left === robotX && wall.top <= robotY && wall.top > minimumWall && wall.opacity === 1 && this.isWallSolid(wall)) {
                        minimumWall = wall.top;
                    }
                });
                this.state.playerState.map(checkRobot => {
                    if (checkRobot.left === robotX && checkRobot.top < robotY && checkRobot.top + 1 > minimumWall ) {
                        minimumWall = checkRobot.top + 1;
                    }

                });

                newPosition = {top: minimumWall, left: robotX, color: color};
                break;
            case RIGHT:
                var minimumWall = this.state.width - 1;
                this.state.wallVerticle.map(wall => {
                    if (wall.top === robotY && wall.left > robotX && wall.left < minimumWall + 1 && wall.opacity === 1  && this.isWallSolid(wall)) {
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
                    if (wall.top === robotY && wall.left <= robotX && wall.left > minimumWall && wall.opacity === 1  && this.isWallSolid(wall)) {
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
                    if (wall.left === robotX && wall.top > robotY && wall.top < minimumWall + 1 && wall.opacity === 1  && this.isWallSolid(wall))
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

    nextLessonPuzzle  = () => {
        var puzzle = this.state.numPuzzleon;
        puzzle += 1;
        puzzle = puzzle == 4 ? 5 : puzzle;
        puzzle = puzzle == 7 ? 8 : puzzle;
        this.handleLearnClickGame(puzzle % 12);
    }

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

    weeklyChallegeSaveMovesCookie = (LastRobotPosition,completed) => {
        var moveHistoryList = this.state.moveHistoryList.slice()
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice()
        var numMoves = 0
        moveHistoryList.map(moveHistory => {
            if (moveHistory !== null) {
                numMoves += moveHistory.length
            }
        });
        var playerStateList = this.state.playerStateList
        if (LastRobotPosition != null) {
            playerStateList[this.state.numPuzzleon] = LastRobotPosition.slice()
        }
        this.checkWinningPosition(this.state.goal,this.state.coloredGoals,this.state.playerState)

        var gameswonWeekly = [];
        [0,1,2,3,4].map((move,index) => {
            var puzzledata = JSON.parse(this.props.games[index].g_puzzledata);

            gameswonWeekly[index] = playerStateList[index] != null ? this.checkWinningPosition(puzzledata.goal,puzzledata.coloredGoals,playerStateList[index]) : false
        })
        axios.post('/weeklychallengesubmit', {score: numMoves, solutiondata: moveHistoryList, wc_id: 1, playerStateList: playerStateList, completed: completed, gamesWon: gameswonWeekly})
            .then( res => {
                console.log(res.data)
            });
    }


    submitWeeklyAnswer = (LastRobotPosition) => {
        var moveHistoryList = this.state.moveHistoryList.slice()
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice()
        var numMoves = 0
        moveHistoryList.map(moveHistory => {
            numMoves += moveHistory.length
        });
        var playerStateList = this.state.playerStateList.slice()
        playerStateList[this.state.numPuzzleon] = LastRobotPosition.slice()
        axios.post('/weeklychallengesubmit', {score: numMoves, name: document.getElementById("namesubmitHS").value, solutiondata: moveHistoryList, wc_id: 1, playerStateList: playerStateList, completed: 1,display: 1,gamesWon: [true,true,true,true,true]})
            .then( res => {
                this.setState({
                    dailySubmittedSucessfully: <Alert severity="success">Submitted!</Alert>
                });
            });
    }

    submitDailyEvolutionAnswer = (LastRobotPosition) => {
        var moveHistoryList = this.state.moveHistoryList.slice()
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice()
        var numMoves = 0
        moveHistoryList.map(moveHistory => {
            numMoves += moveHistory.length
        });
        var playerStateList = this.state.playerStateList.slice()
        playerStateList[this.state.numPuzzleon] = [...LastRobotPosition]
        axios.post('/dailyevolution', {score: numMoves, name: document.getElementById("namesubmitHS").value, solutiondata: moveHistoryList, dce_id: this.state.dce_id, playerStateList: playerStateList})
            .then( res => {
                this.setState({
                    dailySubmittedSucessfully: <Alert severity="success">Submitted!</Alert>
                });
            });
        window.dce_movesList = moveHistoryList;
        window.dce_playerList = playerStateList;
        this.state.gameWon = false;
    }



    submitDailyAnswer = (LastRobotPosition) => {
        var moveHistoryList = this.state.moveHistoryList.slice()
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice()
        var numMoves = 0
        moveHistoryList.map(moveHistory => {
            numMoves += moveHistory.length
        });
        var playerStateList = this.state.playerStateList.slice()
        playerStateList[this.state.numPuzzleon] = [...LastRobotPosition]
        axios.post('/dailychallenge', {score: numMoves, name: document.getElementById("namesubmitHS").value, solutiondata: moveHistoryList, dc_id: this.state.dc_id, playerStateList: playerStateList})
            .then( res => {
                this.setState({
                    dailySubmittedSucessfully: <Alert severity="success">Submitted!</Alert>
                });
            });
        window.dc_movesList = moveHistoryList;
        window.dc_playerList = playerStateList;
        this.state.gameWon = false;
    }

    checkwin = (newPlayerState) => {
        if (this.state.goal != null && this.state.coloredGoals == null) {
            var Won = false;
            newPlayerState.map((player) => {
                if (player.top === this.state.goal.top && player.left === this.state.goal.left) {
                    Won = true;
                }
            });
        }
        else {
            if (this.state.goal != null) {
                var Won = false;
                newPlayerState.map((player) => {
                    if (player.top === this.state.goal.top && player.left === this.state.goal.left) {
                        Won = true;
                    }
                });
            }
            else if (this.state.coloredGoals.length == 0) {
                var Won = false;
            }
            else {
                var Won = true;
            }
            var found = false;
            var colorfound = false;
            newPlayerState.map((player) => {
                found = false
                colorfound = false
                this.state.coloredGoals.map(goal => {
                    if (goal.colorSignifier == player.colorSignifier && goal.top === player.top && goal.left === player.left) {
                        found = true;
                    }
                    if (goal.colorSignifier == player.colorSignifier) {
                        colorfound = true;
                    }
                });
                if (!found && colorfound) {
                    Won = false;
                }
            });
        }
        if (Won) {
            if (this.state.gameWon === false)
                this.setState({gameWon: true});
            if (this.state.createMode === 'No' && this.props.puzzleRush !== 'Yes') {
                var username = window.userInfo.username
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
                else if (this.props.dailyChallengeModeAnswers === 'Yes') {
                    return null
                }
                else if (this.props.dailyEvolutionMode === 'Yes') {
                    if ((window.dailyEvolutionSessionBestHistory[this.state.numPuzzleon].length == 0 ||
                            this.state.moveHistory.length < window.dailyEvolutionSessionBestHistory[this.state.numPuzzleon].length)) {
                        window.dailyEvolutionSessionBestHistory[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.moveHistory))
                        window.dailyEvolutionSessionBestPlayerState[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.playerState))
                        window.dailyEvolutionSessionSwitchState[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.coloredSwitchesOn))
                    }
                    this.state.gamesWonDaily.map((gameWon,index) => {
                        if (!(index == this.state.numPuzzleon) && !gameWon) {
                            Won = false
                        }
                    });
                    var moveHistoryList = [...this.state.moveHistoryList]
                    moveHistoryList[this.state.numPuzzleon] = [...this.state.moveHistory]
                    var numMoves = 0
                    moveHistoryList.map(moveHistory => {
                        numMoves += moveHistory.length
                    });
                    return (Won ? <YouWinDailyFinalModal
                        show={this.state.gameWon}
                        numMoves={numMoves}
                        submitAnswer={this.submitDailyEvolutionAnswer}
                        resetPuzzle={this.resetPuzzle}
                        username={username}
                        undoMove={this.handleUndoMove}
                        newPlayerState={newPlayerState}
                        submitted={this.state.dailySubmittedSucessfully}
                    /> : <YouWinDailySingleModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        totalMoves={numMoves}
                        undoMove={this.handleUndoMove}
                        resetPuzzle={this.resetPuzzle}
                        games={this.state.games}
                        handleClickGame={this.handleDailyClickGame} //maybe change
                        numPuzzleon={this.state.numPuzzleon}
                        moveNextPuzzle={this.moveNextPuzzle}
                    />);
                }
                else if (this.props.weeklyChallengeMode === 'Yes') {
                    if (window.weeklyChallengeSessionBestHistory[this.state.numPuzzleon].length == 0 || this.state.moveHistory.length < window.weeklyChallengeSessionBestHistory[this.state.numPuzzleon].length) {
                        window.weeklyChallengeSessionBestHistory[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.moveHistory))
                        window.weeklyChallengeSessionBestPlayerState[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.playerState))
                    }
                    this.state.gamesWonWeekly.map((gameWon,index) => {
                        if (!(index == this.state.numPuzzleon) && !gameWon) {
                            Won = false
                        }
                    });
                    var moveHistoryList = this.state.moveHistoryList
                    moveHistoryList[this.state.numPuzzleon] = [...this.state.moveHistory]
                    var numMoves = 0
                    moveHistoryList.map(moveHistory => {
                        if (moveHistory !== null) {
                            numMoves += moveHistory.length
                        }
                    });
                    if (Won) {
                        this.weeklyChallegeSaveMovesCookie(newPlayerState,1)
                    }
                    return (Won ? <YouWinWeeklyModal
                        show={this.state.gameWon}
                        numMoves={numMoves}
                        submitAnswer={this.submitWeeklyAnswer}
                        resetPuzzle={this.resetPuzzle}
                        username={username}
                        undoMove={this.handleUndoMove}
                        newPlayerState={newPlayerState}
                        submitted={this.state.dailySubmittedSucessfully}
                    /> : <YouWinDailySingleModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        totalMoves={numMoves}
                        undoMove={this.handleUndoMove}
                        resetPuzzle={this.resetPuzzle}
                        games={this.state.games}
                        handleClickGame={this.handleWeeklyClickGame}
                        numPuzzleon={this.state.numPuzzleon}
                        moveNextPuzzle={this.moveNextPuzzleWeekly}
                    />);
                }
                else if (this.props.dailyChallengeMode === 'Yes') {
                    if ((window.dailyChallengeSessionBestHistory[this.state.numPuzzleon].length == 0 ||
                            this.state.moveHistory.length < window.dailyChallengeSessionBestHistory[this.state.numPuzzleon].length)) {
                        window.dailyChallengeSessionBestHistory[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.moveHistory))
                        window.dailyChallengeSessionBestPlayerState[this.state.numPuzzleon] = JSON.parse(JSON.stringify(this.state.playerState))
                    }
                    this.state.gamesWonDaily.map((gameWon,index) => {
                        if (!(index == this.state.numPuzzleon) && !gameWon) {
                            Won = false
                        }
                    });
                    var moveHistoryList = [...this.state.moveHistoryList]
                    moveHistoryList[this.state.numPuzzleon] = [...this.state.moveHistory]
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
                        newPlayerState={newPlayerState}
                        submitted={this.state.dailySubmittedSucessfully}
                    /> : <YouWinDailySingleModal
                        show={this.state.gameWon}
                        numMoves={this.state.moveHistory.length}
                        totalMoves={numMoves}
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
                        moveNextPuzzle={this.nextLessonPuzzle}
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
                if (this.state.numPuzzleon + 10 > this.state.games.length) {
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
                    submitPuzzleCampaign={this.submitPuzzleCampaign}
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
            var newSwitches = [];
            if (!(newPosition.top === playerState[this.state.robotSelected].top && newPosition.left === playerState[this.state.robotSelected].left) && !this.state.buildMode) {
                moveHistory.push({
                    dir: dirObj.dir,
                    robot: this.state.robotSelected,
                    colorSignifier: playerState[this.state.robotSelected].colorSignifier,
                    prevPosition: oldPositon
                });
                if (this.state.isEvolution) {
                    this.state.coloredSwitchesOn.map((switches,index) => {
                        if (switches.left === newPosition.left && switches.top === newPosition.top) {
                            switches.isOn = switches.isOn ? false : true;
                        }
                        newSwitches.push(switches)
                    });
                }
            }
            else if (this.state.isEvolution) {
                newSwitches = this.state.coloredSwitchesOn
            }
            playerState[this.state.robotSelected] = newPosition;
            this.setState({
                playerState: playerState,
                moveHistory: moveHistory,
                coloredSwitchesOn: newSwitches
            });
        }
    };

    handleCloseToolTips = (index) => {
        this.state.tipsText.splice(index,1);
        this.setState({
            tipsText: this.state.tipsText,
        });
    }

    moveNextPuzzle = () => {
        this.handleDailyClickGame((this.state.numPuzzleon + 1) % 4)
    }

    moveNextPuzzleWeekly = () => {
        this.handleWeeklyClickGame((this.state.numPuzzleon + 1) % 5)
    }

    handleLearnClickGame = index => {
        var puzzledata = JSON.parse(this.props.games[index].puzzledata);
        var squareSize = setDefaultSquareSize(puzzledata.width,puzzledata.height);
        this.setState(
            extend(puzzledata,{buildMode: false,squareSize: squareSize, numPuzzleon: index, moveHistory: [], gameWon: false, playerState: puzzledata.playerStart.slice(),tipsText: [this.props.games[index].description]})
        );
    }


    handleDailyClickAnswersGame = index => {
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
        var lowestMoveSequence = formatGeneratedMoveSequence(JSON.parse(this.props.games[index].g_solutiondata))
        var lowestMovesforPuzzle = this.props.games[index].g_moves
        var difficultyforPuzzle = this.props.games[index].g_difficulty
        var playerMovedSequence = JSON.parse(this.props.solutionDataSubmitted)[index]

        this.setState(
            extend(puzzledata,{highscores: this.state.highscores, numPuzzleon: index, moveHistory: moveHistory,
                    gameWon: false, playerStateList: playerStateList, moveHistoryList: moveHistoryList, gamesWonDaily: gamesWonDaily,
                    lowestMoveSequence: lowestMoveSequence, lowestMovesforPuzzle: lowestMovesforPuzzle, difficultyforPuzzle: difficultyforPuzzle,
                    playerMovedSequence: playerMovedSequence})
        );
    }

    handleWeeklyClickGame = index => {
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
        var gamesWonWeekly = this.state.gamesWonWeekly
        if (this.state.gameWon) {
            gamesWonWeekly[this.state.numPuzzleon] = true
        }
        else {
            gamesWonWeekly[this.state.numPuzzleon] = false
        }
        var playerState = this.state.playerState.slice();
        var playerStateList = this.state.playerStateList;
        playerStateList[this.state.numPuzzleon] = playerState;
        var moveHistoryList = this.state.moveHistoryList;
        moveHistoryList[this.state.numPuzzleon] = this.state.moveHistory.slice();
        this.weeklyChallegeSaveMovesCookie(null,0);
        if (puzzledata.goal === undefined)
        {
            this.setState(
                extend(puzzledata,{highscores: this.state.highscores, numPuzzleon: index, moveHistory: moveHistory, gameWon: false, playerStateList: playerStateList, moveHistoryList: moveHistoryList, gamesWonWeekly: gamesWonWeekly, goal: null})
            );
        }
        else if (puzzledata.coloredGoals === undefined) {
            this.setState(
                extend(puzzledata,{highscores: this.state.highscores, numPuzzleon: index, moveHistory: moveHistory, gameWon: false, playerStateList: playerStateList, moveHistoryList: moveHistoryList, gamesWonWeekly: gamesWonWeekly, coloredGoals: []})
            );
        }
    }



    handleDailyClickGame = index => {
        var puzzledata = JSON.parse(this.props.games[index].g_puzzledata);
        if (this.state.moveHistoryList[index]==undefined) {
            var moveHistory = [];
        }
        else {
            var moveHistory = [...this.state.moveHistoryList[index]];
        }

        if (this.state.playerStateList[index]==undefined) {
            puzzledata.playerState = [...puzzledata.playerStart]
        }
        else {
            puzzledata.playerState = [...this.state.playerStateList[index]];
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
        playerStateList[this.state.numPuzzleon] = [...playerState];
        var moveHistoryList = this.state.moveHistoryList;
        moveHistoryList[this.state.numPuzzleon] = [...this.state.moveHistory];


        if (puzzledata.coloredSwitchesOn != undefined) {
            puzzledata['coloredSwitchesStart'] = JSON.parse(JSON.stringify(puzzledata.coloredSwitchesOn));
            if (this.state.coloredSwitchesOnList[index] != undefined) {
                puzzledata['coloredSwitchesOn'] = JSON.parse(JSON.stringify(this.state.coloredSwitchesOnList[index]))
            }
            this.state.coloredSwitchesOnList[this.state.numPuzzleon] = [...this.state.coloredSwitchesOn]
            // somewhere here do coloredSwitchesOn make a coloredSwitchesOnList and stuff
        }
        this.setState(
            extend(puzzledata,{highscores: this.state.highscores, numPuzzleon: index, moveHistory: moveHistory, gameWon: false, playerStateList: playerStateList, moveHistoryList: moveHistoryList, gamesWonDaily: gamesWonDaily})
        );
    }


    handleWildCardClick = () => {
        if (this.state.goal == null) {
            this.setState({
                goal: {top: this.state.height - 1, left: this.state.width - 1}
            });
        }
        else {
            this.setState({
                goal: null
            });
        }
        this.resetPuzzle();
    }

    resetToBest = (moveHistory, playerState) => {
        if (this.state.isEvolution) {
            console.log(this.state.coloredSwitchesOn)
            console.log(window.dailyEvolutionSessionSwitchState)
            this.setState({
                moveHistory: moveHistory,
                playerState: playerState,
                coloredSwitchesOn: JSON.parse(JSON.stringify(window.dailyEvolutionSessionSwitchState[this.state.numPuzzleon]))
            });
        }
        else {
            this.setState({
                moveHistory: moveHistory,
                playerState: playerState,
            });
        }
    }

    handleColoredClick = (colorSignifier) => {
        var goal = null;
        this.state.coloredGoals.map(goalItem => {
            if (colorSignifier == goalItem.colorSignifier) {
                goal = goalItem;
            }
        })
        if (goal == null) {
            var newColoredGoals = this.state.coloredGoals;
            var newgoal
            switch (colorSignifier) {
                case 'blue':
                    newgoal = {top: this.state.height - 2, left: this.state.width - 2, color: ROBOT_BLUE, colorSignifier: 'blue'};
                    break;
                case 'green':
                    newgoal = {top: this.state.height - 1, left: this.state.width - 2, color: ROBOT_GREEN, colorSignifier: 'green'};
                    break;
                case 'red':
                    newgoal = {top: this.state.height - 2, left: this.state.width - 1, color: ROBOT_RED, colorSignifier: 'red'};
                    break;
                case 'yellow':
                    newgoal = {top: this.state.height - 3, left: this.state.width - 3, color: ROBOT_YELLOW, colorSignifier: 'yellow'};
                    break;
                default:
                    break;
            }
            newColoredGoals.push(newgoal);
            this.setState({
                coloredGoals: newColoredGoals
            });
        }
        else {
            var newColoredGoals = this.state.coloredGoals.filter(goalItem =>
                colorSignifier != goalItem.colorSignifier
            );
            this.setState({
                coloredGoals: newColoredGoals
            });
        }
        this.resetPuzzle();
    }

    trimName = name => {
        var separated = (name + '').split(" ")
        var toreturn = '';
        separated.map((word) => {
            if (word.length > 17)
                toreturn += word.substring(0, 17) + "..." + ' ';
            else {
                toreturn += word + ' '
            }
        });
        return toreturn.substring(0, toreturn.length - 1);
    };

    loadSidebar = () => {
        if (this.props.learnMode == 'Yes') {
            return (
                <Grid container xs={12} direction="column">
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained primary button group"
                        variant="contained">
                        <Divider/>
                        <Typography
                             color="textSecondary"
                             display="block"
                             variant="caption"
                             style={{paddingBottom: '10px'}}
                         >
                             Beginner Lessons
                         </Typography>
                        {
                            this.state.games.map((game,index) => {
                                    if (index === 4) {
                                        return(
                                                <Typography
                                                     color="textSecondary"
                                                     display="block"
                                                     variant="caption"
                                                     style={{paddingBottom: '10px', paddingTop: '30px'}}
                                                 >
                                                     Intermediate Lessons
                                                 </Typography>
                                        )
                                    }
                                    else if (index === 7) {
                                            return(
                                                <Typography
                                                     color="textSecondary"
                                                     display="block"
                                                     variant="caption"
                                                     style={{paddingBottom: '10px', paddingTop: '30px'}}
                                                 >
                                                     Advanced Lessons
                                                 </Typography>
                                        )
                                    }
                                    return(
                                        <LearnGameItems selected={this.state.numPuzzleon} game={game} name={game.name} index={index} handleClickGame={this.handleLearnClickGame}/>
                                    )
                                }

                            )
                        }
                    </ButtonGroup>
                </Grid>
            )
        }
        else if (this.props.dailyChallengeModeAnswers === 'Yes') {
            return(
                <Grid container xs={12} direction="column">
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="vertical"
                            style={{width: '100%'}}
                            aria-label="vertical contained primary button group"
                            variant="contained">
                            {
                                this.state.games.map((game,index) =>
                                        <LearnGameItems selected={this.state.numPuzzleon} game={game} name={'Puzzle #' + (index + 1)} index={index} handleClickGame={this.handleDailyClickAnswersGame}/>
                                )
                            }
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <DailyChallengeHistoryData
                            lowestMovesforPuzzle={this.state.lowestMovesforPuzzle}
                            lowestMoveSequence={this.state.lowestMoveSequence}
                            difficultyforPuzzle={this.state.difficultyforPuzzle}
                            nameSubmitted={this.props.nameSubmitted}
                            playerMovedSequence={this.state.playerMovedSequence}
                            bestScore={this.props.bestScore}
                            scoreSubmitted={this.props.scoreSubmitted}
                         />
                    </Grid>
                </Grid>
            )
        }
        else if (this.props.weeklyChallengeMode === 'Yes') {
            return(
                <Grid container xs={12} direction="column">
                    <Grid item xs={12}>
                        <DailyMovesView
                            moveHistory={JSON.parse(JSON.stringify(window.weeklyChallengeSessionBestHistory[this.state.numPuzzleon]))}
                            playerState={JSON.parse(JSON.stringify(window.weeklyChallengeSessionBestPlayerState[this.state.numPuzzleon]))}
                            resetToBest={this.resetToBest}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            color="secondary"
                            display="block"
                            variant={"h4"}

                        >
                            {this.state.dailyDayName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="vertical"
                            style={{width: '100%'}}
                            aria-label="vertical contained primary button group"
                            variant="contained">
                            {
                                this.state.games.map((game,index) =>
                                        <WeeklyGameItems
                                            selected={this.state.numPuzzleon}
                                            game={game}
                                            name={'Puzzle ' + (index + 1)}
                                            index={index}
                                            moveHistoryList = {this.state.moveHistoryList}
                                            gamesWonWeekly = {this.state.gamesWonWeekly}
                                            handleClickGame={this.handleWeeklyClickGame}
                                        />
                                )
                            }
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <HighScores highscores={this.state.highscores}/>
                    </Grid>
                </Grid>
            )
        }
        else if (this.props.dailyEvolutionMode === 'Yes') {
            return(
                <Grid container xs={12} direction="column">
                    <Grid item xs={12}>
                        <MyStopwatch seconds_add={this.state.daily_start_timer_seconds} minutes_add={this.state.daily_start_timer_minutes}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DailyMovesView
                            moveHistory={JSON.parse(JSON.stringify(window.dailyEvolutionSessionBestHistory[this.state.numPuzzleon]))}
                            playerState={JSON.parse(JSON.stringify(window.dailyEvolutionSessionBestPlayerState[this.state.numPuzzleon]))}
                            resetToBest={this.resetToBest}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            color="secondary"
                            display="block"
                            variant={"h4"}

                        >
                            {'Daily Evolution'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="vertical"
                            style={{width: '100%'}}
                            aria-label="vertical contained primary button group"
                            variant="contained">
                            {
                                this.state.games.map((game,index) =>
                                        <WeeklyGameItems selected={this.state.numPuzzleon} game={game} name={'Puzzle #' + (index + 1)} index={index} handleClickGame={this.handleDailyClickGame} moveHistoryList={this.state.moveHistoryList}/>
                                )
                            }
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <HighScores highscores={this.state.highscores}/>
                    </Grid>
                </Grid>
            )
        }
        else if (this.props.dailyChallengeMode === 'Yes') {
            return(
                <Grid container xs={12} direction="column">
                    <Grid item xs={12}>
                        <MyStopwatch seconds_add={this.state.daily_start_timer_seconds} minutes_add={this.state.daily_start_timer_minutes}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DailyMovesView
                            moveHistory={JSON.parse(JSON.stringify(window.dailyChallengeSessionBestHistory[this.state.numPuzzleon]))}
                            playerState={JSON.parse(JSON.stringify(window.dailyChallengeSessionBestPlayerState[this.state.numPuzzleon]))}
                            resetToBest={this.resetToBest}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            color="secondary"
                            display="block"
                            variant={"h4"}

                        >
                            {this.state.dailyDayName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="vertical"
                            style={{width: '100%'}}
                            aria-label="vertical contained primary button group"
                            variant="contained">
                            {
                                this.state.games.map((game,index) =>
                                        <DailyGameItems selected={this.state.numPuzzleon}
                                                         game={game} name={'Puzzle #' + (index + 1)}
                                                         index={index}
                                                         handleClickGame={this.handleDailyClickGame}
                                                         moveHistoryList={this.state.moveHistoryList}
                                                         bestScore={window.dailyChallengeSessionBestHistory}
                                        />
                                )
                            }
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <HighScores highscores={this.state.highscores}/>
                    </Grid>
                </Grid>
            )
        }
        else if (this.state.createMode === 'Yes') {
            return (
                <CreateBoardGoalSelector
                    buildMode={this.state.buildMode}
                    handleWildCardClick={this.handleWildCardClick}
                    handleColoredClick={this.handleColoredClick}
                />
            );
        }
        else if (this.props.randomGame === 'Yes') {
            return null;
        }
        else if (this.props.puzzleRush) {
            return (
                     <div>
                        <Timer puzzleRushTimeUp={this.puzzleRushTimeUp}>
                        </Timer>
                        <Typography id="discrete-slider-small-steps"
                                     color="Primary"
                                     variant="h3"
                                     display="inline"
                                     gutterBottom>
                             {this.state.numPuzzleon}
                         </Typography>
                     </div>
            );
        }
        else {
            return(
            <div style={{display: 'grid'}}>
                <Typography
                    color="secondary"
                    display="block"
                    variant={"h4"}

                >
                    {this.trimName(this.props.name)}
                </Typography>
                <div style={{paddingBottom: '10px', display: 'inline-flex', alignItems: "center"}}>
                    <Typography variant="caption" style={{paddingRight: "5%"}}>
                        By: {this.trimName(this.props.author)}
                    </Typography>
                    <div>
                        <div style={{display: "inline-flex"}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}}
                                startIcon={this.state.hasVoted ? <StarIcon/> : <StarBorderIcon/>}
                                onClick={this.updateLike}
                                size={"small"}
                            >
                                {this.state.hasVoted ? "Unlike" : "Like"}
                            </Button>
                            <Paper variant="contained"  style={{borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}} >
                                <Typography style={{marginLeft: "5px", marginRight: "5px"}} variant="h6">{this.state.votes ? this.state.votes : 0}</Typography>
                            </Paper>
                        </div>
                    </div>
                </div>
                <Grid container xs={12} direction="column">
                <HighScores highscores={this.state.highscores}/>
                </Grid>
            </div>
            )
        }
    }

    updateLike = () => {
        const action = this.state.hasVoted ? "remove" : "create"
        axios.post('/likepuzzle', {uri: this.state.uri, action: action, vote: "voting"})
            .then( res => {
                var newHasVoted = "Y"
                var newVotes = this.state.votes
                if (this.state.hasVoted)
                    newHasVoted = null
                if (!isNaN(res.data.votes))
                    newVotes = res.data.votes

                this.setState({
                    hasVoted: newHasVoted,
                    votes: newVotes
                });
            }).catch(_ => {
                this.props.signInModalOpen("Sign in")
            });
    }

    handlePlayerMovementFromMouse = (direction) => {
        this.handlePlayerMovement({dir: direction})
    };

    handleUndoMove = () => {
        var moveHistory = this.state.moveHistory;
        var playerState = this.state.playerState;
        if (moveHistory.length !== 0) {
            var moveObj = moveHistory.pop();
            if (this.state.isEvolution) {
                var newSwitchState = []
                this.state.coloredSwitchesOn.map(switches => {
                    if (switches.left === playerState[moveObj.robot].left && switches.top === playerState[moveObj.robot].top) {
                        switches.isOn = switches.isOn ? false : true;
                    }
                    newSwitchState.push(switches)
                })
            }
            else {
                var newSwitchState = []
            }
            playerState[moveObj.robot].left = moveObj.prevPosition.left;
            playerState[moveObj.robot].top = moveObj.prevPosition.top;
            this.setState({
                playerState: playerState,
                moveHistory: moveHistory,
                gameWon: false,
                coloredSwitchesOn: newSwitchState,
                dailySubmittedSucessfully: null
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

    checkWinningPosition = (goal,coloredGoals,playerState) => {
        if (goal != null && coloredGoals == null) {
            var Won = false;
            playerState.map((player) => {
                if (player.top === goal.top && player.left === goal.left) {
                    Won = true;
                }
            });
        }
        else {
            if (goal != null) {
                var Won = false;
                playerState.map((player) => {
                    if (player.top === goal.top && player.left === goal.left) {
                        Won = true;
                    }
                });
            }
            else if (coloredGoals.length == 0) {
                var Won = false;
            }
            else {
                var Won = true;
            }
            var found = false;
            var colorfound = false;
            playerState.map((player) => {
                found = false
                colorfound = false
                coloredGoals.map(goal => {
                    if (goal.colorSignifier == player.colorSignifier && goal.top === player.top && goal.left === player.left) {
                        found = true;
                    }
                    if (goal.colorSignifier == player.colorSignifier) {
                        colorfound = true;
                    }
                });
                if (!found && colorfound) {
                    Won = false;
                }
            });
        }
        return Won
    }


    onStopDragHandlerGoal = (position,color) => {
        if (color == undefined) {
            var goal = {top: Math.round(position.lastY / this.state.squareSize), left: Math.round(position.lastX / this.state.squareSize)}
            if (!this.checkWinningPosition(goal,this.state.coloredGoals,this.state.playerState)) {
                this.setState({
                    goal: goal,
                    playerState: this.state.playerStart.slice(),
                    moveHistory: [],
                });
            }
        }
        else {
            var coloredGoals = this.state.coloredGoals;
            var newGoals = [];
            coloredGoals.map(goal => {
                if (goal.color == color) {
                    newGoals.push({top: Math.round(position.lastY / this.state.squareSize), left: Math.round(position.lastX / this.state.squareSize), color: color, colorSignifier: goal.colorSignifier});
                }
                else {
                    newGoals.push(goal);
                }
            });
            if (!this.checkWinningPosition(this.state.goal,newGoals,this.state.playerState)) {
                this.setState({
                    coloredGoals: newGoals,
                    playerState: this.state.playerStart.slice(),
                    moveHistory: [],
                });
            }
        }
    };


    onStopDragHandler = (position,index,oldPosition) => {
        var playerState = this.state.playerState.slice();
        var lastX = position.lastX / this.state.squareSize;
        var lastY = position.lastY / this.state.squareSize;
        playerState[index].top = Math.round(lastY);
        playerState[index].left = Math.round(lastX);
        var Won = this.checkWinningPosition(this.state.goal,this.state.coloredGoals,playerState)
        if (!Won) {
            this.setState({
                playerStart: playerState.slice(),
                playerState: playerState,
                moveHistory: []
            });
        }
        else {
            playerState[index].top = oldPosition.top
            playerState[index].left = oldPosition.left
            this.setState({
                playerState: playerState,
                playerStart: playerState.slice(),
                flashMessage: null
            });
            this.setState({
                flashMessage: <FlashMessage duration={5000}>
                                <Typography variant='h5' color='error'>You must click Build Mode to solve in order to submit the puzzle</Typography>
                              </FlashMessage>
            });
        }
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
                        showColoredLineDirections={this.state.showColoredLineDirections}
                        toggleBuildMode = {this.toggleBuildMode}
                        undoMove = {this.handleUndoMove}
                        buildMode = {this.state.buildMode}
                        squareSizeValue = {parseInt((this.state.squareSize/4))}
                        isLesson = {this.props.learnMode}
                        isDailyChallenge = {this.props.dailyChallengeMode}
                        isDailyEvolution = {this.props.dailyEvolutionMode}
                        isDailyChallengeAnswers = {this.props.dailyChallengeModeAnswers}
                        isWeeklyChallenge = {this.props.weeklyChallengeMode}
                    />
                    {this.state.flashMessage}
                    {window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? null : <MovesView moveHistory={this.state.moveHistory} playerState={this.state.playerState}/>}
                </Grid>
                <Grid item xs={12} sm={6} md={8} zeroMinWidth>
                    <Board width={this.state.width * this.state.squareSize} height={this.state.height * this.state.squareSize}>
                        {
                            this.state.boardState.map(square =>
                                <Square dimension={this.state.squareSize}
                                        position={{top:square.top,left: square.left}}
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
                            this.state.coloredGoals.map(goal =>
                                <Goal
                                    dimension={this.state.squareSize}
                                    position={goal}
                                    onStopDragHandler={this.onStopDragHandlerGoal}
                                    draggableGrid={[this.state.squareSize,this.state.squareSize]}
                                    isCreateMode={this.state.createMode}
                                    buildMode={this.state.buildMode}
                                    color={goal.color}
                                />
                            )
                        }
                        {
                            this.state.coloredSwitchesOn.map(switches =>
                                <SwitchPad
                                    dimension={this.state.squareSize}
                                    position={switches}
                                    color={switches.color}
                                    isOn={switches.isOn}
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
                                    wallType={wallH.wallType}
                                    coloredSwitches={this.state.coloredSwitchesOn}
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
                                    wallType={wallV.wallType}
                                    coloredSwitches={this.state.coloredSwitchesOn}
                                />
                            )
                        }
                        {
                            ColoredLineDirections.map(ColoredLineDirection =>
                                <ColoredLine
                                    dimension={this.state.squareSize}
                                    dir={ColoredLineDirection}
                                    position={{
                                        top: this.state.playerState[this.state.robotSelected].top,
                                        left: this.state.playerState[this.state.robotSelected].left
                                    }}
                                    endPosition={this.handleCollision({dir: ColoredLineDirection}, this.state.robotSelected, this.state.playerState[this.state.robotSelected].color)}
                                    color={this.state.playerState[this.state.robotSelected].color}
                                    show={this.state.showColoredLineDirections}
                                    handleClick={this.handlePlayerMovementFromMouse}
                                    buildMode={this.state.buildMode}
                                />
                            )
                        }
                    </Board>
                    {window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? <MovesView moveHistory={this.state.moveHistory} playerState={this.state.playerState}/> : null}
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                    <DescriptionList
                        handleCloseToolTips={this.handleCloseToolTips}
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
                    this.checkwin(this.state.playerState)
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
                    handleClickPlayAgain={this.props.handleClickPlayAgain}
                />
            </Grid>
        </div>
        );
    }
}

export default withRouter(Game);
