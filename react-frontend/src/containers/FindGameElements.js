import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, CardActions} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";


const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        height: 180
    },

    item: {
        padding: 0
    },

    upperPadding: {
        paddingTop: 3
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
        props.handleGameClick(props.game.name, props.game.puzzledata,props.highscores,props.game.uri);
    };

    var numberOfHighScores = 0;

    const highscorestyle = highscore => {
        if (numberOfHighScores === 5) return "";
        numberOfHighScores++;
        return (
            <ListItem disableGutters={true} classes={{ root: classes.item }}>
                <ListItemText primary={trimName(highscore.comment)} classes={{ root: classes.leftSideText }} />
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
        if (name.length > 10)
            name = name.substring(0, 10) + "...";
        return name
    };


    return (
        <Grid item xs={12} sm={3}>
            <Card variant="outlined" className={classes.root}>
                <CardContent>
                    <div style={contentDivStyle()}>
                        <div style={{width: '125px'}}>
                            <Typography variant="h5" classes={{ root: classes.lowerPadding }}>
                                {trimName(props.game.name)}
                            </Typography>
                            <div>
                                <Typography variant="caption">
                                    By: {trimName(props.game.authorname)}
                                </Typography>
                                <Typography>
                                    {props.game.created}
                                </Typography>
                                <Typography color="textSecondary" variant="caption">
                                    Plays: {props.highscores.length}
                                </Typography>
                            </div>
                            <br/>
                            <Button onClick={handleClick} classes={{ root: classes.upperPadding }} variant="contained" color="primary">Play</Button>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div style={{width: '125px'}}>
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