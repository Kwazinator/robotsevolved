import React from 'react';
import Button from "@material-ui/core/Button";

export default function LearnGameItems(props) {
    const handleClick = () => {
        props.handleClickGame(props.index)
    }
    if (props.selected === props.index) {
        return (
            <Button
                variant="contained" color="primary"
                aria-label="vertical outlined primary button group"
                onClick={handleClick}
            >
                {props.name}
            </Button>
        )
    }
    else {
        return (
            <Button
                variant="contained"
                onClick={handleClick}
                aria-label="vertical outlined primary button group"
            >
                {props.name}
            </Button>
        )
    }

}