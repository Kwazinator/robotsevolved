import React from 'react';
import useStyles from '../Material-UI/themes';
import ResetButton from "../components/ResetButton";
import BoardResetModal from './Modals/BoardResetModal';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const valuetext = (value) => {
    return value + 'px';
}


export default function DisplayView(props) {
    const classes = useStyles();
    const createBoardPressed = () => {
        props.createBoardPressed('Create Board');
    }
    const isCreateMode = (createMode) => {
        if (createMode === 'Yes') {
            return (
                <Button onClick={createBoardPressed} variant="contained" color="secondary">Create New Board</Button>
                );
        }
        else {
            return null
        }
    };

    const copyToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = 'http://' + window.location.host + '/play/' + props.uri;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        props.copiedClipboard();
    };

    const handleDimensionChange = (event,value) => {
        var dimension = parseInt(value);
        console.log(value);
        if (dimension.toString() === "NaN") {
            dimension = 10;
        } else if (dimension > 16) {
            dimension = 16;
        } else if (dimension < 2) {
            dimension = 2;
        }
        props.DimensionChanged(dimension);
    }
    return (
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button onClick={copyToClipboard} variant="contained" color="secondary">Copy Puzzle Link</Button>
                    {
                        props.copiedToClipboard ?
                            <div style={{"color": "green"}}>
                                Copied!
                            </div> : null
                    }
                </Grid>
                <Grid item xs={4}>
                    <Button
                        onClick={props.resetPuzzle}
                        variant="contained" color="secondary"
                    >
                    Reset
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    {isCreateMode(props.createMode)}
                </Grid>
            </Grid>
        )
    }

    /*
                    <Grid item xs={2}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                          Size Of Board
                        </Typography>
                        <Slider
                          onChangeCommitted={handleDimensionChange}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-small-steps"
                          step={1}
                          marks
                          min={2}
                          max={16}
                          valueLabelDisplay="auto"
                        />
                </Grid>

    */