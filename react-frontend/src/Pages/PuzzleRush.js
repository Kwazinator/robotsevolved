import React from 'react';
import Game from '../containers/Game';
import useStyles from '../Material-UI/themes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function PuzzleRush(props) {
    const classes = useStyles();

    return (<div className={classes.grid}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                </Grid>
                <Grid
                    container xs={4}
                    spacing={4}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    wrap="nowrap"
                >
                    <Grid item xs={12}>
                        <Button onClick={props.handleClickEasyPuzzleRush} variant="contained" color="primary">
                            Easy
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={props.handleClickEasyPuzzleRush} variant="contained" color="primary">
                            Medium
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={props.handleClickEasyPuzzleRush} variant="contained" color="primary">
                            Hard
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={props.handleClickEasyPuzzleRush} variant="contained" color="primary">
                            Exteremely Hard
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                </Grid>
              </Grid>
           </div>
    )
}