import React from 'react';
import { FaCrown } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GoVerified } from "react-icons/go";


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

const CrownCounter = highscore => {
    if (highscore.wins > 0) {
        return (
            <div> {highscore.wins} x <FaCrown/> </div>
        )
    }
    else {
        return null
    }
}

const highscorestyle = highscore => {
    return (<Grid item xs={12}>
                <Paper elevation={3}>
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <div style={{display: "flex", marginLeft: 1}}>
                                <Typography noWrap color={'primary'} style={{float: 'left'}}>
                                    {highscore.name}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{display: "inline-flex"}}>
                                {highscore.wins === 0 || highscore.wins === null ? null : CrownCounter(highscore) }
                                {highscore.user_id !== 1 ? <div style={{marginLeft: 6, marginTop: 1}}><GoVerified/></div> : null}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={'textSecondary'}>{highscore.score}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={'secondary'} variant={'body2'}>{highscore.submitted}</Typography>
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
