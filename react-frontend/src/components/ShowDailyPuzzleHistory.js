import React from 'react';
import Button from '@material-ui/core/Button';
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";


export default function ShowDailyPuzzleHistory(props) {
    const handleDailyPuzzleHistoryClick = event => {
        console.log(props.history)
        props.handleDailyPuzzleHistoryClick(props.history)
    }
    return (
            <Button variant="contained" size="small" color="primary" onClick={handleDailyPuzzleHistoryClick}>
                 answers
            </Button>
    )
}
