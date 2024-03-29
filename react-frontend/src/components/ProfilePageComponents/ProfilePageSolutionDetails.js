import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function ProfilePageSolutionDetails(props) {
    const handleClickPlayGame = () => {
        props.handleClickPlayGame(props.solution.name,props.solution.puzzledata,[],props.solution.uri);
    }
    return (<div style={{width: "100%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography style={{marginTop: 3}} color={'secondary'} variant={'body2'}> {props.solution.WinnerCreated} </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            Highscore Holder: {props.solution.WinnerUsername} - {props.solution.numMoves}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleClickPlayGame} variant="contained" color="primary">
                            Play
                        </Button>
                    </Grid>
                </Grid>
            </div>
    );
}
