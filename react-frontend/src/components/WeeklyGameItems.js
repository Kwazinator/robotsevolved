import React from 'react';
import Button from "@material-ui/core/Button";

export default function WeeklyGameItems(props) {
    const handleClick = () => {
        props.handleClickGame(props.index)
    }
    const numMoves = props.moveHistoryList[props.index] == undefined ? 0 : props.moveHistoryList[props.index].length;
    if (props.selected === props.index) {
        return props.game.g_moves == numMoves ?
             (
            <Button
                variant="contained" color="secondary"
                aria-label="vertical outlined primary button group"
                onClick={handleClick}
            >
                {'Solved in minimum moves!'}
            </Button>
            )
            :
            (
                <Button
                    variant="contained" color="secondary"
                    aria-label="vertical outlined primary button group"
                    onClick={handleClick}
                >
                    {numMoves + ' Moves'}
                </Button>
            )
    }
    else {
        return props.game.g_moves == numMoves ?
             (
            <Button
                variant="contained" color="primary"
                aria-label="vertical outlined primary button group"
                onClick={handleClick}
            >
                {'Solved in minimum moves!'}
            </Button>
            )
            :
            (
                <Button
                    variant="contained"
                    aria-label="vertical outlined primary button group"
                    onClick={handleClick}
                >
                    {numMoves + ' Moves'}
                </Button>
            )
    }

}