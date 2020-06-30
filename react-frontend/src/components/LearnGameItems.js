import React from 'react';
import Button from "@material-ui/core/Button";


export default function LearnGameItems(props) {
    const handleClick = () => {
        props.handleClickGame(props.index)
    }
    console.log(props.name);
    if (props.selected === props.index) {
        return (
            <Button
                variant="contained" color="primary"
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
            >
                {props.name}
            </Button>
        )
    }

}