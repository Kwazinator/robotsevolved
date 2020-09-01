import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Project,Words} from 'arwes';

const useStyles = makeStyles({
  root: {
    margin: '0 10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShowDailyChallengeScoresCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
            <Project
                        animate
                        header={props.name}
                    >
                    {anim => (
                        <p>
                              <CardContent>
                                <Typography style={{marginBottom: '30px'}} variant="h5" component="h2">
                                  {props.bestScore}
                                </Typography>
                                <Typography variant="body2" component="p">
                                  {props.MovesforPuzzle}
                                  <br/>
                                  {props.MoveSequence}
                                  <br />
                                </Typography>
                              </CardContent>
                        </p>
                    )}
            </Project>
  );
}