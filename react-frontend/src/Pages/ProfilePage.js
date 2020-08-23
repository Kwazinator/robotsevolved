import React from 'react';
import Game from '../containers/Game';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import GameListItemView from '../components/GameListItemView';
import SearchBarFindGame from '../components/SearchBarFindGame';
import FindGameElements from '../containers/FindGameElements'
import Grid from '@material-ui/core/Grid';
import {Table,TableContainer,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core';
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


    const createData = (name,col1,col2) => {
        return {name,col1,col2}
    }

    const columns = [
          { id: 'difficulty', label: 'Difficulty', maxWidth: 75 },
          { id: 'classic', label: 'Classic', maxWidth: 75 },
          { id: 'random', label: 'Random', maxWidth: 75 },
        ];

    const rows = [
        createData('Easy', props.puzzlerushview.maxeasyc,props.puzzlerushview.maxeasyp),
        createData('Medium', props.puzzlerushview.maxmediumc,props.puzzlerushview.maxmediump),
        createData('Hard', props.puzzlerushview.maxhardc,props.puzzlerushview.maxhardp),
        createData('Extremely Hard', props.puzzlerushview.maxexhardc,props.puzzlerushview.maxexhardp)
    ]

    const rowseff = [
        createData('Easy', props.puzzlerushview.maxeffec,props.puzzlerushview.maxeffep),
        createData('Medium', props.puzzlerushview.maxeffmc,props.puzzlerushview.maxeffmp),
        createData('Hard', props.puzzlerushview.maxeffhc,props.puzzlerushview.maxeffhp),
        createData('Extremely Hard', props.puzzlerushview.maxeffexc,props.puzzlerushview.maxeffexp)
    ]

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
            <div style={gamepanel()}>
                <Grid container spacing={4}>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        <TextField className={classes.centeredProfile} id={"ProfileName"} label={"Username"} defaultValue={window.userInfo.username}/>
                        <Button className={classes.centeredProfile} variant="contained" color="secondary" onClick={submitAnswer}>Change Username</Button>
                        <Typography color={"secondary"}>{error}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
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
                                          <Typography className={classes.secondaryHeading}>Plays: {game.plays}</Typography>
                                          <Typography className={classes.secondaryHeading}>Likes: {game.Likes}</Typography>
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
                    <Grid item xs={12} sm={12} md={4}>
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
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography className={classes.titlehome} variant="h3">Puzzle Rush Records</Typography>
                        <Typography variant="body1">Most Puzzles Solved</Typography>
                        <TableContainer component={Paper}>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ maxWidth: column.maxWidth, backgroundColor: 'black', color: 'white' }}
                                    >
                                      {column.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell align="left">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="left">{row.col1}</TableCell>
                                  <TableCell align="left">{row.col2}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography style={{marginTop: '40px'}} variant="body1">Highest Efficiency Scores</Typography>
                        <Typography variant="caption">Calculated by (total puzzles completed) * 7 - (total redundany moves from best score)</Typography>
                        <TableContainer component={Paper}>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ maxWidth: column.maxWidth, backgroundColor: 'black', color: 'white' }}
                                    >
                                      {column.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {rowseff.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell align="left">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="left">{row.col1}</TableCell>
                                  <TableCell align="left">{row.col2}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
    )
}
