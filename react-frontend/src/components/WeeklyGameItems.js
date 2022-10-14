import React from 'react';
import Button from "@material-ui/core/Button";


const leftstyle = () => {
    return {
        width: '100%',
        paddingRight: '0px',
        textAlign: 'left'
    }
}


const rightstyle = () => {
    return {
        width: '100%',
        paddingRight: '0px',
        textAlign: 'right'
    }
}

export default function WeeklyGameItems(props) {
    const handleClick = () => {
        props.handleClickGame(props.index)
    }
    const numMoves = props.moveHistoryList[props.index] == undefined ? 0 : props.moveHistoryList[props.index].length;
    const bestScore = props.bestScore[props.index] == undefined ? 0 : props.bestScore[props.index].length
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
                    <div style={leftstyle()}>
                        {'Best: ' + bestScore}
                    </div>
                    <div style={rightstyle()}>
                        {'Min is ' + [props.game.g_moves]}
                    </div>
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
                    <div style={leftstyle()}>
                        {'Best: ' + bestScore}
                    </div>
                    <div style={rightstyle()}>
                        {'Min is ' + [props.game.g_moves]}
                    </div>
                </Button>
            )
    }

}