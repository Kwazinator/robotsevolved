import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function AboutUs(props) {
    return (<div id="GameMain">
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid item spacing={4} xs={12} justify={"center"} alignItems={"center"}>
                        <Typography variant={'body1'}>
                            RobotsEvolved.com is based on the board game Ricochet Robots. We have several game modes and variants that are inspired by the several Chess variants on the internet. Tell your friends about the site and get people on here!
                        </Typography>
                    </Grid>
                    <Grid spacing={4} item xs={6} justify={"center"} alignItems={"center"}>
                        <Paper>
                            <Typography color={'textPrimary'} variant={"h2"}>
                                Classic
                            </Typography>
                            <Typography variant={"body1"} paragraph={true}>
                                Classic Puzzles are based on the original Game. These Puzzles only have walls that are L shaped and a goal is in the center of one of them.
                            </Typography>
                            <Typography variant={"h2"} display={"inline"}>
                                Random
                            </Typography>
                            <Typography variant={"body1"} paragraph={true}>
                                Random Puzzles are created by having a 10% chance for a wall to spawn in Any location possible wall location, Goals and Robit placements are completely random also.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid spacing={4} item xs={6} justify={"center"} alignItems={"center"}>
                        <Paper>
                            <Typography variant={"h4"}>
                                Easy
                            </Typography>
                            <Typography variant={"body2"} paragraph={true}>
                                Puzzles of this difficulty always can be solved in 5-8 Moves
                            </Typography>
                            <Typography variant={"h4"}>
                                Medium
                            </Typography>
                            <Typography variant={"body2"} paragraph={true}>
                                Puzzles of this difficulty always can be solved in 9-13 Moves
                            </Typography>
                            <Typography variant={"h4"}>
                                Hard
                            </Typography>
                            <Typography variant={"body2"} paragraph={true}>
                                Puzzles of this difficulty always can be solved in 13-18 Moves
                            </Typography>
                            <Typography variant={"h4"} >
                                Extremely Hard
                            </Typography>
                            <Typography variant={"body2"} paragraph={true}>
                                Puzzles of this difficulty always can be solved in 18-23 Moves
                            </Typography>
                            <Typography variant={"h4"}>
                                God Tier
                            </Typography>
                            <Typography variant={"body2"} paragraph={true}>
                                Puzzles of this difficulty always can be solved in over 23 Moves
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item spacing={4} xs={12} justify={"center"} alignItems={"center"}>
                        <div class="row3">
                          <div class="column3">
                            <div class="card3">
                              <img src={"/static/images/284457_10151211078621477_839164197_n.jpg"} alt="Jane"/>
                              <div class="container3">
                                <h2>Kyle Kwasniewski</h2>
                                <p class="title3">Creator &amp; FullStack Dev.</p>
                                <p>This Project was made in order to learn React as a web-framework. If there are any features that you would like to see then feel free to email my personal email below.</p>
                                <p>robotsevolved@gmail.com</p>
                              </div>
                            </div>
                          </div>
                          <div class="column3">
                            <div class="card3">
                              <img src={"/static/images/284f909d-0d5c-4ae1-b100-76c9d46ae7d4.png"} alt="Mike"/>
                              <div class="container3">
                                <h2>Jonah Tollefson</h2>
                                <p class="title3">Front-End Dev.</p>
                                <p>Went to college with these other goobers in the US and now I work professionally as a software engineer in Germany. For RobotsEvolved, I mainly worked on the frontend using React. Cats and Ultimate Frisbee are life.</p>
                              </div>
                            </div>
                          </div>
                          <div class="column3">
                            <div class="card3">
                              <img src={"/static/images/derekschultz.jpg"} alt="John"/>
                              <div class="container3">
                                <h2>Derek Schultz</h2>
                                <p class="title3">Back-End Dev.</p>
                                <p>Full time Software Engineer. Graduated from University of Wisconsin Platteville with a BS in Computer Science and Minor in Business Administration. Worked on most of the database aspect of RobotsEvolved and some back end functionality. I enjoy video games, beer, and playing darts.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Grid>
                  </Grid>
                </div>


    )
}