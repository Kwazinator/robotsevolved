import React from 'react';
import Game from '../containers/Game';
import { Header, Line,Project, Words, Button,Arwes,ThemeProvider, createTheme, withStyles,Row,Col } from 'arwes';
import Grid from '@material-ui/core/Grid';
import useStyles from '../Material-UI/themes';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DailyChallengeScores from '../components/DailyChallengeScores';
import Divider from '@material-ui/core/Divider';
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import TimerIcon from '@material-ui/icons/Timer';
import CasinoIcon from '@material-ui/icons/Casino';
import TodayIcon from '@material-ui/icons/Today';
import SchoolIcon from '@material-ui/icons/School';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import FindGameElements from "../containers/FindGameElements";
import {GOAL_IMAGE} from '../constants/constants';


export default function ComplexGrid(props) {
    const classes = useStyles();
    if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
        return (<div className={classes.homepage} >
                <Grid container spacing={2}>
                    <Grid xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                        <Project
                            animate
                            header='Welcome to RobotsEvolved'
                        >
                        {anim => (
                            <p><Words animate show={anim.entered}>
                               Puzzle game for anyone to play! Create your own custom boards or play a random Solved game. Goal is to get ANY piece to stop on the
                                </Words>
                                <img style={{width: '40px',height:'40px'}} src={GOAL_IMAGE}/>
                                <br/>
                                <img width="300" height="300" src='/static/videos/basic2.gif'/>
                                <br/>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickFindGame}>
                                    Find a Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickDailyChallenge}>
                                    Daily Challenge
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickCreateGame}>
                                    Create a Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickRandomGame}>
                                    Play a Random Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickLearnGame}>
                                    Learn
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickPuzzleRush}>
                                    Puzzle Rush
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickProfile}>
                                    Profile
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickDailyChallengeHistory}>
                                    Daily Challenge History
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickAbout}>
                                    About
                                </Button>
                            </div>
                            </p>

                        )}
                    </Project>
                    </Grid>
                    <Grid item xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}} >
                        <Words className={classes.titlehome} variant="h4"> News
                        </Words>
                        <Words> 8/23/2020 Personal Best saving feature added to Daily Challenge, Also Added Like feature to custom puzzles.
                        </Words>
                        <br/>
                    </Grid>
                    <Grid item xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}} >
                    <Words animate className={classes.titledailyroto} variant="h4"> Daily Challenge Rotation
                    </Words>
                        <Project
                                    animate
                                    header='Daily Challenge Rotation'
                                >
                                {anim => (
                                    <p>
                                   <Words animate>
                                                Medium Mondays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Trouble Tuesdays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Wild Wednesdays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Tryhard Thursdays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Flyin Fridays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Sleepy Saturdays
                                   </Words>
                                   <br/>
                                   <Words animate>
                                                Standard Sundays
                                   </Words>
                                    </p>
                                )}
                        </Project>
                        <Project
                            animate
                            header='Daily Challenge Scores'
                        >
                        {anim => (
                            <p>
                                <DailyChallengeScores highscores={window.dchighscores}/>
                            </p>
                        )}
                     </Project>
                    </Grid>
                </Grid>

            </div>
        )
    }

    return (<div className={classes.homepage}>
              <Grid container spacing={4}>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                    <Project
                            animate
                            header='Controls'
                        >
                        {anim => (


                            <p>
                            <Line animate />
                            <Words animate
                                className={classes.dividerFullWidth}
                            >
                                Movement
                            </Words>
                            <br/>
                            <img width={'20%'} height={'auto'} src={"/static/images/keyboard.png"}/>
                            <Words animate>Pieces Move until they hit a wall or another piece</Words>
                            <Line animate />
                            <Words animate
                            className={classes.dividerFullWidth}
                            >
                                Selecting robots
                            </Words>
                            <br/>
                            <Words animate> Use </Words>
                            <img width={'20%'} height={'auto'} src={"/static/images/tab_button_keyboard_type_1-512.png"}/>
                            <Words animate>or click on Piece</Words>
                            <Line animate />
                            <Words animate
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                            >
                            HotKeys
                            </Words>
                            <br/>
                            <Words animate style={{fontSize: '13px'}}>Undo</Words> <img width={'20%'} height={'auto'} src={"/static/images/Qkey.png"}/> <br/>
                            <Words animate style={{fontSize: '13px'}}>Reset</Words> <img width={'20%'} height={'auto'} src={"/static/images/Wkey.png"}/>
                            <Line animate/>
                            <div style={{marginTop:'100px'}}>
                            <Words animate className={classes.titlehome} variant="h4"> News
                            </Words>
                            <Words animate> 8/5/2020 Scaled down the Difficulty for the Daily Challenges, also modified the classic algorithm to be less cluttered
                            </Words>
                            <Words animate> 8/18/2020 New textures, Soon to be released: Color Specific Goals!
                            </Words>
                            <Words animate> 8/23/2020 Personal Best saving feature added to Daily Challenge, Also Added Like feature to custom puzzles.
                            </Words>
                            </div>
                            <Line animate />
                            </p>
                        )}
                    </Project>
                </Grid>
                <Grid item xs={8} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                        <Project
                            animate
                            header='Welcome to RobotsEvolved'
                        >
                        {anim => (
                            <p><Words animate show={anim.entered}>
                               Puzzle game for anyone to play! Create your own custom boards or play a random Solved game. Goal is to get ANY piece to stop on the
                                </Words>
                                <img style={{width: '40px',height:'40px'}} src={GOAL_IMAGE}/>
                                <br/>
                                <img width="300" height="300" src='/static/videos/basic2.gif'/>
                                <br/>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickFindGame}>
                                    Find a Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickDailyChallenge}>
                                    Daily Challenge
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickCreateGame}>
                                    Create a Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickRandomGame}>
                                    Play a Random Game
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickLearnGame}>
                                    Learn
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickPuzzleRush}>
                                    Puzzle Rush
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickProfile}>
                                    Profile
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickDailyChallengeHistory}>
                                    Daily Challenge History
                                </Button>
                            </div>
                            <div className={classes.iconcards}>
                                <Button animate onClick={props.handleClickAbout}>
                                    About
                                </Button>
                            </div>
                            </p>

                        )}
                    </Project>

                </Grid>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                <Project
                            animate
                            header='Daily Challenge Rotation'
                        >
                        {anim => (
                            <p>
                           <Words animate>
                                        Medium Mondays
                           </Words>
                           <Words animate>
                                        Trouble Tuesdays
                           </Words>
                           <Words animate>
                                        Wild Wednesdays
                           </Words>
                           <Words animate>
                                        Tryhard Thursdays
                           </Words>
                           <Words animate>
                                        Flyin Fridays
                           </Words>
                           <Words animate>
                                        Sleepy Saturdays
                           </Words>
                           <Words animate>
                                        Standard Sundays
                           </Words>
                            </p>
                        )}
                </Project>
                <Project
                            animate
                            header='Daily Challenge Scores'
                        >
                        {anim => (
                            <p>
                                <DailyChallengeScores highscores={window.dchighscores}/>
                            </p>
                        )}
                </Project>
                </Grid>
              </Grid>
           </div>
    )
}
