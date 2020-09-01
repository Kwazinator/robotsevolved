import React from 'react';
import {Button} from 'arwes';

export default function LearnGameItems(props) {
    const handleClick = () => {
        props.handleClickGame(props.index)
    }
    if (props.selected === props.index) {
        return (
            <Button animate active={true}
                onClick={handleClick}
            >
                {props.name}
            </Button>
        )
    }
    else {
        return (
            <Button animate
                variant="contained"
                onClick={handleClick}
                aria-label="vertical outlined primary button group"
            >
                {props.name}
            </Button>
        )
    }

}