import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { GoVerified } from "react-icons/go";
import {Frame,Words} from 'arwes';

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
                <Frame animate level={1} corners={3}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Words animate layer='control'>{highscore.comment + ' - ' + highscore.numMoves}</Words>
                    </Grid>
                    <Grid item xs={6}>
                            {highscore.userid != 1 ? <GoVerified/> : null}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color={'secondary'} variant={'body2'}>{highscore.created}</Typography>
                    </Grid>
                 </Grid>
                </Frame>
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