import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function ProfilePageSolutionDetails(props) {
    const handleClickPlayGame = () => {
        props.handleClickPlayGame(props.solution.name,props.solution.puzzledata,[],props.solution.uri);
    }
    return (<div>
              <Grid container xs={12}>
                <Grid item xs={6}>
                    <Typography> Highscore Holder: </Typography>
                </Grid>
                 <Grid item xs={6}>
                  <Typography>
                    {props.solution.name} - {props.solution.numMoves}
                  </Typography>
              </Grid>
              </Grid>
              <Button onClick={handleClickPlayGame} variant="contained" color="primary">
                    Play
              </Button>
            </div>
    );
}