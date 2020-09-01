import React from 'react';
import { FaCrown } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GoVerified } from "react-icons/go";
import {Frame, Words} from 'arwes';



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
    var crowns = []
    var i;
    for (i=0; i<highscore.wins;i++) {
        crowns.push(<FaCrown/>);
    }
    return (
        <div>
            {crowns}
        </div>
    )
}

const highscorestyle = highscore => {
    return (
                    <Grid item xs={12}>
                        <Frame animate level={1} corners={3}>
                            <Grid container spacing={0}>
                                <Words animate layer='control'>{highscore.name + ' - ' + highscore.score}</Words>
                                <Grid item xs={6}>
                                        {highscore.wins == 0 || highscore.wins == null ? null : CrownCounter(highscore) }
                                        {highscore.user_id != 1 ? <GoVerified/> : null}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color={'secondary'} variant={'body2'}>{highscore.submitted}</Typography>
                                </Grid>
                             </Grid>
                        </Frame>
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