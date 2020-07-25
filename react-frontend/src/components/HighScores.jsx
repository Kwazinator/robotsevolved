import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { GoVerified } from "react-icons/go";

const styleouter = () => {
    return {
        marginleft: '15px',
        float: 'left'
    };
}

const paperstyle = () => {
    return {
        marginBottom: '15px'
    }
}

const highscorestyle = highscore => {
    return (
                <Paper style={paperstyle()}elevation={3}>
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <Typography color={'primary'} style={{float: 'left'}}>
                                {highscore.comment}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                                {highscore.userid != 1 ? <GoVerified/> : null}
                        </Grid>
                        <Grid item xs={6}>
                        <Typography color={'textSecondary'}>{highscore.numMoves}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography color={'secondary'} variant={'body2'}>{highscore.created}</Typography>
                        </Grid>
                     </Grid>
                </Paper>

    )
};


export default ({highscores}) => (
    <Grid item xs={12} style={styleouter()}>
        {
            highscores.map(highscore =>
                highscorestyle(highscore)
            )
        }
    </Grid>
)