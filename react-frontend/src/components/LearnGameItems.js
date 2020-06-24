import React from 'react';
import Button from "@material-ui/core/Button";


export default function LearnGameItems(props) {
    const handleLearnClickGame = () => {
        props.handleLearnClickGame(props.index)
    }
    if (props.selected === props.index) {
        return (
            <Button
                variant="contained" color="primary"
                onClick={handleLearnClickGame}
            >
                {props.game.name}
            </Button>
        )
    }
    else {
        return (
            <Button
                variant="contained"
                onClick={handleLearnClickGame}
            >
                {props.game.name}
            </Button>
        )
    }

}