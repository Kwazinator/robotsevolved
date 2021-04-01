import React from 'react';
import { FaCrown } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GoVerified } from "react-icons/go";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";


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
                    <Grid container spacing={0} xs={12}>
                        <Grid item container spacing={0} xs={8}>
                            <Grid item xs={12}>
                                <div style={{display: "flex", marginLeft: 1}}>
                                    <Typography noWrap color={'primary'} style={{float: 'left'}}>
                                        {highscore.comment ? highscore.comment : highscore.name}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography style={{marginLeft: 2, marginTop: 9}}  color={'textSecondary'}>{highscore.numMoves ? highscore.numMoves : highscore.score}</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography style={{marginTop: 12}} color={'secondary'} variant={'body2'}>{highscore.created ? highscore.created : (highscore.submitted ? highscore.submitted : "") }</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} container spacing={1}>
                            {highscore.user_id !== 1 ? <Grid item xs={12}><div style={{float: 'right'}}><GoVerified/></div></Grid> : null}
                            {(highscore.daily_crowns !== null && highscore.daily_crowns !== 0) || (highscore.weekly_crowns !== null && highscore.weekly_crowns !== 0) ?
                                <Grid item xs={12}>
                                    <div style={{float: "right", justifyContent: "space-between", marginBottom: 1}}>
                                        {highscore.daily_crowns !== null && highscore.daily_crowns !== 0 ?
                                            <Tooltip title="Daily Challenge Crowns">
                                                <Badge
                                                    color={"primary"}
                                                    style={{marginRight: highscore.weekly_crowns !== null && highscore.weekly_crowns !== 0 ? 18 : 8}}
                                                    badgeContent={highscore.daily_crowns}
                                                    max={999}>
                                                    <FaCrown size={20} />
                                                </Badge>
                                            </Tooltip>
                                            : null
                                        }
                                        {highscore.weekly_crowns !== null && highscore.weekly_crowns !== 0 ?
                                            <Tooltip title="Weekly 100 Crowns">
                                                <Badge color={"secondary"} style={{marginRight: 8}} badgeContent={highscore.weekly_crowns} max={999}><FaCrown size={20}/></Badge>
                                            </Tooltip>
                                            : null
                                        }
                                    </div>
                                </Grid> : null
                            }
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
