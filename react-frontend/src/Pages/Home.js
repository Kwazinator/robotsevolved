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


export default function ComplexGrid(props) {
    const classes = useStyles();

    return (<div className={classes.grid}>
              <Grid container spacing={4}>
                <Grid item xs={6} spacing={3} alignItems="center" justify="center" wrap="nowrap">
                    <Typography variant="h3"> Welcome To RobotsEvolved
                    </Typography>
                    <Typography> Create your own Robots Boards and challenge others to solve them, or play puzzle rush and get better.
                    </Typography>
                </Grid>
                <Grid item xs={6} spacing={3}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/uoJ0OxQxiGA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Grid>
                <Grid container xs={12} spacing={4} justify={'center'}>
                    <Grid item xs={2}>
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
                              <Typography variant="body2" color="textSecondary" component="p">
                                Create a Board to have others to solve, its easy! Try it out!
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Card className={classes.iconcards}>
                          <CardActionArea onClick={props.handleClickLearnGame}>
                            <CardMedia
                              component="img"
                              alt="Create Board"
                              height="140"
                              image="/static/images/CreateBoardCardIcon.png"
                              title="Learn"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Learn
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Get the basics all the way to advanced tutorials.
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                          </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Card className={classes.iconcards}>
                          <CardActionArea>
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
                              <Typography variant="body2" color="textSecondary" component="p">
                                Play a Random Game that was generated and see if you can get the lowest possible solution
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                    </Grid>
                     <Grid item xs={2}>
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
                              <Typography variant="body2" color="textSecondary" component="p">
                                Find a Game that has been created by another person!
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Card className={classes.iconcards}>
                          <CardActionArea onClick={props.handleClickPuzzleRush}>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="140"
                              image="/static/images/PuzzleRushIcon.png"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Puzzle Rush
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Puzzle Rush is a variant where you are given 5 minutes to solve as many random puzzles as you can.
                                You are scored based on the number of puzzles completed as well as the difference from the lowest possible solution, Click Learn More for scoring details
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                    </Grid>
                </Grid>
              </Grid>
           </div>
    )
}