import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Card,CardActions,Button,Avatar} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";

const gamepanel = () => {
    return {
        width: '100%',
        paddingTop: '40px',
        paddingLeft: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '0px' : '40px',
        margin: '0 auto',
        align: 'center',
    }
}

export default function AboutUs(props) {
    const facebookclick = () => {
        window.open('https://www.facebook.com/RobotsEvolved-105278561284154')
    }
    return (<div style={gamepanel()}>
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid item spacing={4} xs={12} justify={"center"} alignItems={"center"}>
                        <Card style={{display: 'inline-block', width: '33%'}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    About
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    RobotsEvolved.com is based on the board game Ricochet Robots.
                                    We have several game modes and variants that are inspired by the several Chess variants on the internet.
                                    Big thanks to
                                    If you use Google Login or Facebook Login we will never email or sell your information.
                                    Tell your friends about the site and get people on here!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={facebookclick}>
                                    <Avatar alt="Facebook" src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid spacing={4} item xs={12} sm={6} justify={"center"} alignItems={"center"}>
                        <Card>
                            <CardContent>
                                <Typography color={'textPrimary'} variant={"h4"}>
                                    Daily Challenge Rotation
                                </Typography>
                                <Typography variant={"body1"} paragraph={true}>
                                    The Daily Challenge rotates its difficulty every day as specified below with 2 x Random and 2 x Classic Type puzzles.
                                    <br/>
                                    Medium Mondays - 4 x Medium
                                    <br/>
                                    Trouble Teusdays - 4 x Extremely Hard
                                    <br/>
                                    Wild Wednesdays - 4 x Hard
                                    <br/>
                                    Tryhard Thursdays - 3 x Extremely Hard 1 x God Teir
                                    <br/>
                                    Flyin Fridays - 4 x Medium
                                    <br/>
                                    Sleepy Saturdays - 4 x Easy
                                    <br/>
                                    Standard Sundays - 4 x Hard
                                </Typography>
                                <Typography color={'textPrimary'} variant={"h4"}>
                                    Classic Puzzles
                                </Typography>
                                <Typography variant={"body1"} paragraph={true}>
                                    Classic puzzles are based on the original Game. These Puzzles only have walls that are L shaped and a goal is in the center of one of the L puzzles.
                                </Typography>
                                <Typography variant={"h4"} display={"inline"}>
                                    Random Puzzles
                                </Typography>
                                <Typography variant={"body1"} paragraph={true}>
                                    Random Puzzles are created by having a 10% chance for a wall to spawn in Any location possible wall location, Goals and Robot placements are completely random also.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid spacing={4} item xs={12} sm={6} justify={"center"} alignItems={"center"}>
                        <Card>
                            <CardContent>
                                <Typography variant={"h5"}>
                                    Easy
                                </Typography>
                                <Typography variant={"body2"} paragraph={true}>
                                    Puzzles of this difficulty always can be solved in 5-8 Moves
                                </Typography>
                                <Typography variant={"h5"}>
                                    Medium
                                </Typography>
                                <Typography variant={"body2"} paragraph={true}>
                                    Puzzles of this difficulty always can be solved in 9-13 Moves
                                </Typography>
                                <Typography variant={"h5"}>
                                    Hard
                                </Typography>
                                <Typography variant={"body2"} paragraph={true}>
                                    Puzzles of this difficulty always can be solved in 13-18 Moves
                                </Typography>
                                <Typography variant={"h5"} >
                                    Extremely Hard
                                </Typography>
                                <Typography variant={"body2"} paragraph={true}>
                                    Puzzles of this difficulty always can be solved in 18-23 Moves
                                </Typography>
                                <Typography variant={"h5"}>
                                    God Tier
                                </Typography>
                                <Typography variant={"body2"} paragraph={true}>
                                    Puzzles of this difficulty always can be solved in over 23 Moves, Note: there are a low number of these puzzles due to the CPU required to create them
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item spacing={4} xs={12} sm={4} justify={"center"} alignItems={"center"}>
                        <Paper class="card3">
                          <img src={"/static/images/284457_10151211078621477_839164197_n.jpg"} alt="Jane"/>
                          <div class="container3">
                            <h2>Kyle Kwasniewski</h2>
                            <p class="title3">Creator &amp; FullStack Dev.</p>
                            <p>I work in Software Development and Dev-Ops in New York and consider myself a Ricochet Robots enthusiast so I decided to make this application as a way to better hone my skill in web frameworks as well as pass the time during the quarantine. If you find any bugs or feature requests for RobotsEvolved please let me know by emailing me below I would love to hear some of the ideas people have. Ill get to developing the feature/fixing annoying bugs ASAP.</p>
                            <p>Thanks for playing!</p>
                            <p>robotsevolved@gmail.com</p>
                          </div>
                        </Paper>
                    </Grid>
                    <Grid item spacing={4} xs={12} sm={4} justify={"center"} alignItems={"center"}>
                        <div className="card3" style={{height: "480px"}}>
                            <img src={"/static/images/284f909d-0d5c-4ae1-b100-76c9d46ae7d4.png"} alt="Mike"/>
                            <div className="container3">
                                <h2>Jonah Tollefson</h2>
                                <p className="title3">Front-End Dev.</p>
                                <p>Went to college with these other goobers in the US and now I work professionally as a
                                    software engineer in Germany. For RobotsEvolved, I mainly worked on the frontend
                                    using React. Cats and Ultimate Frisbee are life.</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item spacing={4} xs={12} sm={4} justify={"center"} alignItems={"center"}>
                        <div className="card3" style={{height: "480px"}}>
                            <img src={"/static/images/derekschultz.jpg"} alt="John"/>
                            <div className="container3">
                                <h2>Derek Schultz</h2>
                                <p className="title3">Back-End Dev.</p>
                                <p>Full time Software Engineer. Graduated from University of Wisconsin Platteville
                                    with a BS in Computer Science and Minor in Business Administration. Worked on
                                    most of the database aspect of RobotsEvolved and some back end functionality. I
                                    enjoy video games, beer, and playing darts.</p>
                            </div>
                        </div>
                    </Grid>
                  </Grid>
                </div>


    )
}