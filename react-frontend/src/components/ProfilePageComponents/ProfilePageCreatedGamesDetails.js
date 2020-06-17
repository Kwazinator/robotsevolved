import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function ProfilePageCreatedGamesDetails(props) {
    const handleClickPlayGame = () => {
        props.handleClickPlayGame(props.game.name,props.game.puzzledata,[],props.game.uri);
    }

    return (<div>
              <Typography>
                {props.game.name}
              </Typography>
              <Button onClick={handleClickPlayGame} variant="contained" color="primary">
                    Play
              </Button>
            </div>
    );
}