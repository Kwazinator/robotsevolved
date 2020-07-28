import React from 'react';
import Game from '../containers/Game';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import GameListItemView from '../components/GameListItemView';
import SearchBarFindGame from '../components/SearchBarFindGame';
import FindGameElements from '../containers/FindGameElements'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../Material-UI/themes';
import ProfilePageCreatedGamesDetails from '../components/ProfilePageComponents/ProfilePageCreatedGamesDetails';
import ProfilePageSolutionDetails from '../components/ProfilePageComponents/ProfilePageSolutionDetails';
import { FaCrown } from 'react-icons/fa';



export default function ProfilePage(props) {
    const classes = useStyles();
    const submitAnswer = () => {
        axios.post('/userUpdate',{newuser: document.getElementById("ProfileName").value})
            .then( res => {
                if (res.data == 'OK') {
                    window.location.href = '/';
                }
                else {
                    setError(res.data);
                }
            });
    };

    const [error, setError] = React.useState(null)
    const [expandedGame, setExpandedGame] = React.useState(false);
    const [expandedHighscores, setExpandedHighscores] = React.useState(false);
    const handleChangeGame = (panel) => (event, isExpandedGame) => {
        setExpandedGame(isExpandedGame ? panel : false);
    };
    const handleChangeHighscores = (panel) => (event, isExpandedHighScores) => {
        setExpandedHighscores(isExpandedHighScores ? panel : false);
    };
    console.log(props.puzzlerushview);
    return (
            <div id={'GameMain'} className={classes.root}>
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        <TextField className={classes.centeredProfile} id={"ProfileName"} label={"Username"} defaultValue={window.userInfo.username}/>
                        <Button className={classes.centeredProfile} variant="contained" color="secondary" onClick={submitAnswer}>Change Username</Button>
                        <Typography color={"secondary"}>{error}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography className={classes.titlehome} variant="h3">Games Created</Typography>
                        {
                            props.gamesview.map((game,index) =>
                                    <ExpansionPanel expanded={expandedGame === 'panelgame' + index} onChange={handleChangeGame('panelgame' + index)}>
                                        <ExpansionPanelSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={"panel" + index + "-content"}
                                          id={"panel" + index + "-header"}
                                        >
                                          <Typography className={classes.heading}>{game.name}</Typography>
                                          <Typography className={classes.secondaryHeading}>Plays: </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          <ProfilePageCreatedGamesDetails
                                            game={game}
                                            handleClickPlayGame={props.handleClickPlayGame}
                                          />
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography className={classes.titlehome} variant="h3">Games Solved</Typography>
                        {
                            props.solutionsview.map((solution,index) =>
                                <ExpansionPanel expanded={expandedHighscores === 'panelhigh' + index} onChange={handleChangeHighscores('panelhigh' + index)}>
                                    <ExpansionPanelSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={"panel" + index + "-content"}
                                      id={"panel" + index + "-header"}
                                    >
                                      <Typography className={classes.heading}>{solution.name}</Typography>
                                      <Typography className={classes.secondaryHeading}>Best: {solution.numMoves}</Typography>
                                      {solution.WinnerUserId == window.userInfo.userID ? <FaCrown style={{marginLeft: '30px'}}/> : null}
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <ProfilePageSolutionDetails
                                            solution={solution}
                                            handleClickPlayGame={props.handleClickPlayGame}
                                        />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography className={classes.titlehome} variant="h3">Puzzle Rush Data:</Typography>
                        <Paper>
                              <Typography className={classes.heading}>Easy</Typography>
                              <Typography className={classes.secondaryHeading}>Best Score: {props.puzzlerushview.maxeasy}</Typography>
                              <Typography>
                                Average Score: {props.puzzlerushview.averageeasy}
                              </Typography>
                              <Typography>
                                Average Difference of Moves from Optimal Solution: {props.puzzlerushview.averagediffeasy}
                              </Typography>
                          </Paper>
                          <br/>
                          <Paper>
                              <Typography className={classes.heading}>Medium</Typography>
                              <Typography className={classes.secondaryHeading}>Best Score: {props.puzzlerushview.maxmedium}</Typography>
                              <Typography>
                                Average Score: {props.puzzlerushview.averagemedium}
                              </Typography>
                              <Typography>
                                Average Difference of Moves from Optimal Solution: {props.puzzlerushview.averagediffmedium}
                              </Typography>
                            </Paper>
                            <br/>
                            <Paper>
                              <Typography className={classes.heading}>Hard</Typography>
                              <Typography className={classes.secondaryHeading}>Best Score: {props.puzzlerushview.maxhard}</Typography>
                              <Typography>
                                Average Score: {props.puzzlerushview.averagehard}
                              </Typography>
                              <Typography>
                                Average Difference of Moves from Optimal Solution: {props.puzzlerushview.averagediffhard}
                              </Typography>
                            </Paper>
                            <br/>
                            <Paper>
                              <Typography className={classes.heading}>Extremely Hard</Typography>
                              <Typography className={classes.secondaryHeading}>Best Score: {props.puzzlerushview.maxexhard}</Typography>
                              <Typography>
                                Average Score: {props.puzzlerushview.averageexhard}
                              </Typography>
                              <Typography>
                                Average Difference of Moves from Optimal Solution: {props.puzzlerushview.averagediffexhard}
                              </Typography>
                            </Paper>
                    </Grid>
                </Grid>
            </div>
    )
}