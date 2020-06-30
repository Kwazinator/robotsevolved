import React from 'react';
import Game from '../containers/Game';
import Button from '@material-ui/core/Button';
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



export default function ProfilePage(props) {
    const classes = useStyles();
    const [expandedGame, setExpandedGame] = React.useState(false);
    const [expandedHighscores, setExpandedHighscores] = React.useState(false);
    const [expandedPuzzleRush, setExpandedPuzzleRush] = React.useState(false);
    const handleChangeGame = (panel) => (event, isExpandedGame) => {
        setExpandedGame(isExpandedGame ? panel : false);
    };
    const handleChangeHighscores = (panel) => (event, isExpandedHighScores) => {
        setExpandedHighscores(isExpandedHighScores ? panel : false);
    };
    const handleChangePuzzleRush = (panel) => (event, isExpandedPuzzleRush) => {
        setExpandedPuzzleRush(isExpandedPuzzleRush ? panel : false);
    };
    return (
            <div id={'GameMain'} className={classes.root}>
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid item xs={4}>
                        <Typography variant="h3">Games Created</Typography>
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
                    <Grid item xs={4}>
                        <Typography variant="h3">Games Solved</Typography>
                        {
                            props.solutionsview.map((solution,index) =>
                                <ExpansionPanel expanded={expandedHighscores === 'panelhigh' + index} onChange={handleChangeHighscores('panelhigh' + index)}>
                                    <ExpansionPanelSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={"panel" + index + "-content"}
                                      id={"panel" + index + "-header"}
                                    >
                                      <Typography className={classes.heading}>{solution.name}</Typography>
                                      <Typography className={classes.secondaryHeading}>Score: {solution.numMoves}</Typography>
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
                    <Grid item xs={4}>
                        <Typography variant="h3">Puzzle Rush Data:</Typography>
                        <ExpansionPanel expanded={expandedPuzzleRush === 'panel9'} onChange={handleChangePuzzleRush('panel9')}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel9bh-content"
                              id="panel9bh-header"
                            >
                              <Typography className={classes.heading}>COMING SOON</Typography>
                              <Typography className={classes.secondaryHeading}>COMING SOON</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
    )
}