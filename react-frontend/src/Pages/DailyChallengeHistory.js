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
import { FaCrown } from 'react-icons/fa';
import ShowDailyPuzzleHistory from '../components/ShowDailyPuzzleHistory';



export default function DailyChallengeHistory(props) {
    const classes = useStyles();
    return (<div className={classes.grid}>
                    {
                        props.dailychallengehistory.map(history =>
                            <Grid item xs={12} alignItems="center" justify="center">
                                <Card className={classes.iconcards}>
                                  <CardActionArea onClick={props.handleClickCreateGame}>
                                    <CardContent>
                                      <Typography gutterBottom variant="caption" component="p">
                                        {history.created}
                                      </Typography>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        <FaCrown/> {history.nameSubmitted} - {history.scoreSubmitted} <FaCrown/>
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                        Lowest possible solution: {history.bestScore}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions>
                                    <ShowDailyPuzzleHistory history={history} handleDailyPuzzleHistoryClick={props.handleDailyPuzzleHistoryClick}/>
                                  </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
           </div>
    )
}