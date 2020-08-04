import React from 'react';
import Game from '../containers/Game';
import useStyles from '../Material-UI/themes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
                    <Grid item xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                        <Typography className={classes.titlehome} variant="h3"> Welcome To RobotsEvolved
                        </Typography>
                        <Typography variant="p1" paragraph={true}>Puzzle game for anyone to play! Create your own custom boards or play a random Solved game. <br/>Goal is to get ANY piece to stop on the  <img style={{width: '40px',height:'40px'}} src={GOAL_IMAGE}/>
                        </Typography>
                        <br/>
                        <img width="300" height="300" src='/static/videos/basic2.gif'/>
                        <br/>
                    </Grid>
                    <Grid item xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}} >
                        <Typography className={classes.titlehome} variant="h4"> News
                        </Typography>
                        <Typography> 8/3/2020 Launched Site! Thanks for joining! Im currently the top scorer on all my puzzles, can you beat me?
                        </Typography>
                        <Typography> 8/4/2020 Added Chat Room. Come and chat with us! Look in the lower right corner for chat icon.
                        </Typography>
                    </Grid>
                    <Grid container item alignItems={"stretch"} spacing={2} alignItems="center" justify="center" >
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickFindGame}>
                                    <CardMedia
                                        component="img"
                                        alt="Find a Game"
                                        height="140"
                                        image="/static/images/FindAGameCardIcon.png"
                                        title="Find a Game"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                            Find a Game
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickDailyChallenge}>
                                    <CardMedia
                                        component="img"
                                        alt="Create Board"
                                        height="140"
                                        image="/static/images/DailyChallengeIcon.png"
                                        title="Daily Challenge"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                            Daily Challenge
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickCreateGame}>
                                    <CardMedia
                                        className={classes.createboardcard}
                                        component="img"
                                        alt="Create Board"
                                        height="140"
                                        image="/static/images/CreateBoardCardIcon.png"
                                        title="Create Board"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                            Create Board
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickRandomGame}>
                                    <CardMedia
                                        component="img"
                                        alt="Play a Random Game"
                                        height="140"
                                        image="/static/images/puzzle.png"
                                        title="Play a Random Game"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                            Play a Random Game
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickLearnGame}>
                                    <CardMedia
                                        component="img"
                                        alt="Create Board"
                                        height="140"
                                        image="/static/images/LessonsBoardCardIcon.png"
                                        title="Learn"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                            Learn
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{textAlign: 'center'}}>
                            <Card className={classes.iconcards}>
                                <CardActionArea onClick={props.handleClickPuzzleRush}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="/static/images/PuzzleRushIcon.png"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent style={{textAlign: 'center'}}>
                                        <Typography className={classes.iconfonts} gutterBottom variant="h5" component="h2">
                                            Puzzle Rush
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}} >
                    <Typography className={classes.titledailyroto} variant="h4"> Daily Challenge Rotation
                    </Typography>
                        <Typography variant="body1">
                            Medium Mondays <br/>
                            <Typography paragraph={true} variant="caption">medium puzzles only</Typography>
                            Trouble Tuesday <br/>
                            <Typography paragraph={true} variant="caption">extremly hard puzzles only</Typography>
                            Wild Wednesdays <br/>
                            <Typography paragraph={true} variant="caption">hard puzzles only</Typography>
                            Tryhard Thursdays <br/>
                            <Typography paragraph={true} variant="caption">extremly hard puzzles + 1 god teir</Typography>
                            Flyin Fridays<br/>
                            <Typography paragraph={true} variant="caption">medium puzzles only</Typography>
                            Sleepy Saturdays<br/>
                            <Typography paragraph={true} variant="caption">easy puzzles only</Typography>
                            Standard Sundays<br/>
                            <Typography paragraph={true} variant="caption">hard puzzles only</Typography>
                        </Typography>
                        <Typography style={{marginTop: '30px'}} className={classes.titlehome} variant="h4"> Daily Challenge Scores
                        </Typography>
                        <DailyChallengeScores highscores={window.dchighscores}/>
                    </Grid>
                </Grid>

            </div>
        )
    }

    return (<div className={classes.homepage}>
              <Grid container spacing={4}>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                    <Typography className={classes.titlehome} variant="h4"> Controls
                    </Typography>
                    <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Movement
                        </Typography>
                    <img width={'20%'} height={'auto'} src={"/static/images/keyboard.png"}/>
                    <Typography>Pieces Move until they hit a wall or another piece</Typography>
                    <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Selecting robots
                        </Typography>
                        <img width={'20%'} height={'auto'} src={"/static/images/tab.png"}/>

                    <Typography>Or click</Typography>
                    <Divider/>
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            HotKeys
                        </Typography>
                        <Typography variant="h6">Undo</Typography> <img width={'20%'} height={'auto'} src={"/static/images/Qkey.png"}/>
                        <Typography variant="h6">Reset</Typography> <img width={'20%'} height={'auto'} src={"/static/images/Wkey.png"}/>
                    <Divider />
                    <div style={{marginTop:'100px'}}>
                    <Typography className={classes.titlehome} variant="h4"> News
                    </Typography>
                    <Typography> 8/3/2020 Launched Site! Thanks for joining! Im currently the top scorer on all my puzzles, can you beat me?
                    </Typography>
                    <Typography> 8/4/2020 Added Chat Room. Come and chat with us! Look in the lower right corner for chat icon.
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={8} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                    <Typography className={classes.titlehome} variant="h3"> Welcome To RobotsEvolved
                    </Typography>
                    <Typography paragraph={true} variant="p1">Puzzle game for anyone to play! Create your own custom boards or play a random Solved game.<br/>Goal is to get ANY piece to stop on the  <img style={{width: '40px',height:'40px'}} src={GOAL_IMAGE}/>
                    </Typography>
                    <br/>
                        <img width="300" height="300" src='/static/videos/basic2.gif'/>
                    <br/>
                    <Card className={classes.iconcards}>
                      <CardActionArea onClick={props.handleClickFindGame}>
                        <CardMedia
                          component="img"
                          alt="Find a Game"
                          height="140"
                          image="/static/images/FindAGameCardIcon.png"
                          title="Find a Game"
                        />
                        <CardContent>
                          <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                            Find a Game
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <Card className={classes.iconcards}>
                      <CardActionArea onClick={props.handleClickDailyChallenge}>
                        <CardMedia
                          component="img"
                          alt="Create Board"
                          height="140"
                          image="/static/images/DailyChallengeIcon.png"
                          title="Daily Challenge"
                        />
                        <CardContent>
                          <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                            Daily Challenge
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <Card className={classes.iconcards}>
                        <CardActionArea onClick={props.handleClickCreateGame}>
                            <CardMedia
                                className={classes.createboardcard}
                                component="img"
                                alt="Create Board"
                                height="140"
                                image="/static/images/CreateBoardCardIcon.png"
                                title="Create Board"
                            />
                            <CardContent>
                                <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                    Create Board
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.iconcards}>
                        <CardActionArea onClick={props.handleClickRandomGame}>
                            <CardMedia
                                component="img"
                                alt="Play a Random Game"
                                height="140"
                                image="/static/images/puzzle.png"
                                title="Play a Random Game"
                            />
                            <CardContent>
                                <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                    Play a Random Game
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.iconcards}>
                        <CardActionArea onClick={props.handleClickLearnGame}>
                            <CardMedia
                                component="img"
                                alt="Create Board"
                                height="140"
                                image="/static/images/LessonsBoardCardIcon.png"
                                title="Learn"
                            />
                            <CardContent>
                                <Typography gutterBottom className={classes.iconfonts} variant="h5" component="h2">
                                    Learn
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.iconcards}>
                        <CardActionArea onClick={props.handleClickPuzzleRush}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="/static/images/PuzzleRushIcon.png"
                                title="Contemplative Reptile"
                            />
                            <CardContent style={{textAlign: 'center'}}>
                                <Typography className={classes.iconfonts} gutterBottom variant="h5" component="h2">
                                    Puzzle Rush
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                <Typography className={classes.titledailyroto} variant="h4"> Daily Challenge Rotation
                </Typography>
                <Typography variant="body1">
                            Medium Mondays <br/>
                            <Typography paragraph={true} variant="caption">medium puzzles only</Typography>
                            Trouble Tuesdays <br/>
                            <Typography paragraph={true} variant="caption">extremly hard puzzles only</Typography>
                            Wild Wednesdays <br/>
                            <Typography paragraph={true} variant="caption">hard puzzles only</Typography>
                            Tryhard Thursdays <br/>
                            <Typography paragraph={true} variant="caption">extremly hard puzzles + 1 god teir</Typography>
                            Flyin Fridays<br/>
                            <Typography paragraph={true} variant="caption">medium puzzles only</Typography>
                            Sleepy Saturdays<br/>
                            <Typography paragraph={true} variant="caption">easy puzzles only</Typography>
                            Standard Sundays<br/>
                            <Typography paragraph={true} variant="caption">hard puzzles only</Typography>
                        </Typography>
                <Typography className={classes.titlehome} variant="h4"> Daily Challenge Scores
                </Typography>
                <DailyChallengeScores highscores={window.dchighscores}/>
                </Grid>
              </Grid>
           </div>
    )
}
