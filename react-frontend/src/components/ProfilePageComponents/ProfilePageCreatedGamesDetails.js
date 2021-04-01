import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function ProfilePageCreatedGamesDetails(props) {
    const handleClickPlayGame = () => {
        props.handleClickPlayGame(props.game.name,props.game.puzzledata,[],props.game.uri, props.game.authorname, props.game.votes, props.game.hasVoted);
    }

    return (<div style={{width: "100%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography> Highscore Holder: {props.game.username} - {props.game.numMoves} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleClickPlayGame} variant="contained" color="primary">Play</Button>
                    </Grid>
                </Grid>
            </div>
    );
}
