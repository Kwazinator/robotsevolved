import React from 'react';
import Typography from "@material-ui/core/Typography";


export default function LearnGameItems(props) {
    const handleLearnClickGame = () => {
        props.handleLearnClickGame(props.index)
    }
    if (props.selected === props.index) {
        return (
            <Typography
                color="primary"
                display="block"
                variant={"h2"}
                onClick={handleLearnClickGame}
            >
                {props.game.name}
            </Typography>
        )
    }
    else {
        return (
            <Typography
                color="secondary"
                display="block"
                variant={"h4"}
                onClick={handleLearnClickGame}
            >
                {props.game.name}
            </Typography>
        )
    }

}