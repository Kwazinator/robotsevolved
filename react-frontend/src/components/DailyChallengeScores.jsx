import React from 'react';
import { FaCrown } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const styleouter = () => {
    return {
        marginTop: '30px',
    };

}

const styleelements = () => {
    return {
        marginBottom: '20px',
        marginTop: '10px'
    };

}

const highscorestyle = highscore => {
    return (<Grid item xs={12}>
        <Paper elevation={3}>
            <Grid container spacing={0}>
                <Grid item xs={9}>
                    <Typography color={'primary'}>
                        {highscore.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                        {highscore.wins == 0 || highscore.wins == null ? null : highscore.wins}
                        {highscore.wins == 0 || highscore.wins == null ? null : <FaCrown/> }
                </Grid>
                <Grid item xs={6}>
                <Typography color={'textSecondary'}>{highscore.score}</Typography>
                </Grid>
             </Grid>
        </Paper>
        </Grid>

    )
};


export default ({highscores}) => (
    <Grid style={styleouter()} container direction={'column'} spacing={1}>
        {
                highscores.map(highscore =>
                    highscorestyle(highscore)
                )
        }
    </Grid>
)