import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";
import axios from 'axios';
import {Project, Words, Button, Line} from 'arwes';

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
        marginBottom: 0,
        color: '#009688'
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
                    var game = JSON.parse(res.data.game);
                    props.handleGameClick(game.name, game.puzzledata,props.highscores,game.uri,props.game.authorname,
                        props.game.votes, props.game.hasVoted);
                });
    };

    var numberOfHighScores = 0;

    const highscorestyle = highscore => {
        if (numberOfHighScores === 6) return "";
        numberOfHighScores++;
        return (
            <ListItem disableGutters={true} classes={{ root: classes.item }}>
                <Typography color='primary' classes={{ root: classes.leftSideText }}> {trimNameShort(highscore.comment)} </Typography>
                <Typography color='primary' classes={{ root: classes.rightSideText }}> {highscore.numMoves} </Typography>
            </ListItem>
        )
    };

    const contentDivStyle = () => {
        return {
            display: 'flex',
            justifyContent: 'space-between',
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
            <Project
                            animate
                            header={props.game.name}
                        >
                        {anim => (
                            <p>
                                <CardContent style={{width: "100%",
                                    maxWidth: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '100%' : 360,
                                    minWidth: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '100%' : 235,
                                    height: 225,
                                    position: 'relative',
                                    }}>
                                    <div style={contentDivStyle()}>
                                        <div style={{width: '100%'}}>
                                <Typography style={{fontSize: '13px'}} color='primary' variant="caption">
                                    By: {trimName(props.game.authorname)}
                                </Typography>
                                <br/>
                                <Typography color='primary' variant="caption">
                                    {props.game.created}
                                </Typography>
                            <Line animate/>
                            <Typography color="textSecondary" color='secondary' variant="caption">
                                Plays: {props.game.plays}
                            </Typography>
                            <br/>
                            <Typography color="textSecondary" color='secondary' variant="caption">
                                Likes: {props.game.votes}
                            </Typography>
                                            <br/>
                                            <Button animate onClick={handleClick} classes={{ root: classes.upperPaddingButton }} variant="contained" color="primary">Play</Button>
                                        </div>
                                        <div style={{width: '105px', marginLeft:'20px'}}>
                                            <Typography color="textSecondary" color='secondary' variant="caption">
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
                            </p>
                        )}
                </Project>
        </Grid>
    );
}