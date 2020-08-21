import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";
import axios from 'axios';

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '100%' : 360,
        minWidth: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '100%' : 235,
        height: 225,
        position: 'relative',
        background: 'linear-gradient(100deg, #ffd34d 55%, #fff178 55%)'
    },

    item: {
        padding: 0
    },

    upperPadding: {
        paddingTop: 3
    },
    upperPaddingButton: {
        paddingTop: 3,
        position: 'absolute',
        bottom: 15,
        left: 25
    },

    lowerPadding: {
        paddingBottom: 3
    },

    rightSideText: {
        textAlign: "right",
        marginTop: 0,
        marginBottom: 0
    },

    leftSideText: {
        marginTop: 0,
        marginBottom: 0
    }
});

export default withStyles(styles)(ComplexGrid)

function ComplexGrid(props) {
    const { classes } = props;
    const handleClick = () => {
        axios.get('/getFindGameData?uri=' + props.game.uri)
                .then( res => {
                    console.log(res.data);
                    var game = JSON.parse(res.data.game);
                    console.log(game);
                    props.handleGameClick(game.name, game.puzzledata,props.highscores,game.uri,props.game.authorname);
                });
    };

    var numberOfHighScores = 0;

    const highscorestyle = highscore => {
        if (numberOfHighScores === 6) return "";
        numberOfHighScores++;
        return (
            <ListItem disableGutters={true} classes={{ root: classes.item }}>
                <ListItemText primary={trimNameShort(highscore.comment)} classes={{ root: classes.leftSideText }} />
                <ListItemText secondary={highscore.numMoves} classes={{ root: classes.rightSideText }} />
            </ListItem>
        )
    };

    const contentDivStyle = () => {
        return {
            display: 'flex',
            justifyContent: 'space-between'
        };

    };

    const trimName = name => {
        var separated = (name + '').split(" ")
        var toreturn = '';
        separated.map((word) => {
            if (word.length > 17)
                toreturn += word.substring(0, 17) + "..." + ' ';
            else {
                toreturn += word + ' '
            }
        });
        return toreturn.substring(0, toreturn.length - 1);
    };

    const trimNameShort = name => {
        if (name.length > 10)
            name = name.substring(0, 10) + "...";
        return name
    };


    return (
        <Grid item xs={12} md={3} sm={6}>
            <Card variant="outlined" className={classes.root}>
                <CardContent>
                    <div style={contentDivStyle()}>
                        <div style={{width: '150px'}}>
                            <Tooltip title={props.game.name}>
                                <Typography variant="h6" classes={{ root: classes.lowerPadding }}>
                                    {trimName(props.game.name)}
                                </Typography>
                            </Tooltip>
                            <div>
                                <Typography variant="caption">
                                    By: {trimName(props.game.authorname)}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="caption">
                                    {props.game.created}
                                </Typography>
                            </div>
                            <div>
                                <Typography color="textSecondary" variant="caption">
                                    Plays: {props.game.plays}
                                </Typography>
                            </div>
                            <br/>
                            <Button onClick={handleClick} classes={{ root: classes.upperPaddingButton }} variant="contained" color="primary">Play</Button>
                        </div>
                        <div style={{width: '105px'}}>
                            <Typography color="textSecondary" variant="caption">
                                Top Scores
                            </Typography>
                            <List>
                                {
                                    props.highscores.map(highscore =>
                                        highscorestyle(highscore)
                                    )
                                }
                            </List>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}