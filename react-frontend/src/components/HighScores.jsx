import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { FaMedal } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { GoVerified } from "react-icons/go";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    error: {
      main: '#FFD700'  // gold color
    },
    primary: {
        main: '#CD7F32'
    },
    secondary: {
        main: '#C0C0C0'
    },
    black: {
        main: '#000000'
    }
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
  },
});


const styleouter = () => {
    return {
        marginTop: '30px',
        padding: '10px',
    };

}

const styleelements = () => {
    return {
        marginBottom: '20px',
        marginTop: '10px'
    };

}

const highscorestyle = highscore => {
    return (<MuiThemeProvider theme={theme}>
            <Grid item xs={12} spacing={0}>
                <Paper elevation={3}>
                    <Grid container spacing={0} xs={12}>
                        <Grid item container spacing={0} xs={8}>
                            <Grid item xs={12}>
                                <div style={{display: "flex", marginLeft: 1}}>
                                    <Typography noWrap color={'black'} style={{float: 'left', fontWeight: 'bold'}}>
                                        {highscore.comment ? highscore.comment : highscore.name}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography style={{marginLeft: 2, marginTop: 9}}  color={'black'}>{highscore.numMoves ? highscore.numMoves : highscore.score}</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography style={{marginTop: 12}} color={'black'} variant={'body2'}>{highscore.created ? highscore.created : (highscore.submitted ? highscore.submitted : "") }</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} container spacing={1}>
                            {highscore.user_id !== 1 ? <Grid item xs={12}><div style={{float: 'right'}}><GoVerified/></div></Grid> : null}
                            {(highscore.gold_medals !== undefined && highscore.gold_medals !== 0) || (highscore.silver_medals !== undefined && highscore.silver_medals !== 0) || (highscore.bronze_medals !== undefined && highscore.bronze_medals !== 0) ?
                                <Grid item xs={12}>
                                    <div style={{float: "right", justifyContent: "space-between", marginBottom: 1}}>
                                        {highscore.gold_medals !== undefined && highscore.gold_medals !== 0 ?
                                            <Tooltip title="Gold Medals">
                                                <Badge
                                                    color={"error"}
                                                    style={{marginRight: highscore.silver_medals !== undefined && highscore.silver_medals !== 0 ? 18 : 8}} //
                                                    badgeContent={highscore.gold_medals}
                                                    sx={{
                                                          '& .MuiBadge-anchorOriginTopRightRectangle': {
                                                            backgroundColor: 'gold'
                                                          }
                                                        }}
                                                    max={999}>
                                                    <FaMedal size={20} />
                                                </Badge>
                                            </Tooltip>
                                            : null
                                        }
                                        {highscore.silver_medals !== undefined && highscore.silver_medals !== 0 ?
                                            <Tooltip title="Silver Medals">
                                                <Badge color={"secondary"} style={{marginRight: 8}} badgeContent={highscore.silver_medals} max={999}><FaMedal size={20}/></Badge>
                                            </Tooltip>
                                            : null
                                        }
                                        {highscore.bronze_medals !== undefined && highscore.bronze_medals !== 0 ?
                                            <Tooltip title="Bronze Medals">
                                                <Badge color={"primary"} style={{marginRight: 8}} badgeContent={highscore.bronze_medals} max={999}><FaMedal size={20}/></Badge>
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
            </MuiThemeProvider>

    )
};


export default ({highscores}) => (
    <Grid style={styleouter()} container spacing={1}>
        {
                highscores.map(highscore =>
                    highscorestyle(highscore)
                )
        }
    </Grid>
)

