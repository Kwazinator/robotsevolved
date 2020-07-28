import React from 'react';
import Button from '@material-ui/core/Button';


export default function ShowDailyPuzzleHistory(props) {
    const handleDailyPuzzleHistoryClick = event => {
        console.log(props.history)
        props.handleDailyPuzzleHistoryClick(props.history)
    }
    return (
            <Button style={{marginLeft: '60px'}} variant="contained" size="small" color="primary" onClick={handleDailyPuzzleHistoryClick}>
                 show answers
            </Button>
    )
}