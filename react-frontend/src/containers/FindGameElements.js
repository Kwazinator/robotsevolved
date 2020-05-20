import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    Width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const handleClick = (callback,puzzledata,highscores,uri) => {
    callback(puzzledata,highscores,uri);
}




export default function ComplexGrid(props) {
  const classes = useStyles();
  console.log(props);
  if (typeof props.highscore !== 'undefined') {
    var highscore = props.highscore.numMoves;
    var highscoreauthor = props.highscore.comment;
  }
  else {
    var highscore = 'None'
    var highscoreauthor = ''
  }
  const handleClick = () => {
    props.handleGameClick(props.game.puzzledata,props.highscores,props.game.uri);
  }

  return (
    <Grid onClick={handleClick} style={{ cursor: 'pointer' }} item>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://scx1.b-cdn.net/csz/news/800/2019/3-robot.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={15} sm container>
            <Grid item xs container direction="column" spacing={5}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.game.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Type {props.game.type} • {props.game.difficulty}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {props.game.authorname}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid spacing={2} item>
              <Typography variant="body2">
                  {highscore}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                  {highscoreauthor}
              </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}