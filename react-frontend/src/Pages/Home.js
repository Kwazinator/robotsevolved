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

export default function ComplexGrid(props) {
    const classes = useStyles();

    return (<div className={classes.homepage}>
              <Grid container spacing={4}>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                    <Typography variant="h4"> Controls
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
                    <Typography>Or use mouse button to click on the Robot you want to move</Typography>
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

                    <Typography>Or use mouse button to click</Typography>
                    <Divider/>
                    <div style={{marginTop:'100px'}}>
                    <Typography variant="h4"> News
                    </Typography>
                    <Typography> Robots Evolved New Homepage!!! <br/>Almost Done with the project expect a release date of 8/1/2020
                    </Typography>
                    </div>

                </Grid>
                <Grid item xs={8} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                    <Typography variant="h3"> Welcome To RobotsEvolved
                    </Typography>
                    <Typography> Create your own Robots Boards and challenge others to solve them, or play puzzle rush and get better.
                    </Typography>
                    <video width="320" height="240" autoplay muted>
                          <source src="/static/videos/tutorial.mp4" type="video/mp4"/>
                          Your browser does not support the video tag.
                    </video>
                    <br/>
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
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Create Board
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
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
                                  <Typography gutterBottom variant="h5" component="h2">
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
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Daily Challenge
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
                                  <Typography gutterBottom variant="h5" component="h2">
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
                                  <Typography gutterBottom variant="h5" component="h2">
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
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Puzzle Rush
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                </Grid>
                <Grid item xs={2} spacing={3} alignItems="center" justify="center" style={{textAlign: 'center'}}>
                <Typography variant="h4"> Daily Challenge Scores
                </Typography>
                <DailyChallengeScores highscores={window.dchighscores}/>
                </Grid>
              </Grid>
           </div>
    )
}