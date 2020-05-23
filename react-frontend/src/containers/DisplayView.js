import React from 'react';
import useStyles from '../Material-UI/themes';
import ResetButton from "../components/ResetButton";
import BoardResetModal from './Modals/BoardResetModal';
import CreateBoardButton from "../components/CreateBoardButton";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const controlpanel = () => {
    return {
        marginRight: '10px',
        marginTop: '25px',
        marginBottom: '10px',
        opacity: 1
    };
};

const buttonPanel = () => {
    return {
        display: 'inline-flex',
        width: '200px',
        marginTop: '15px',
        marginBottom: '15px',
    }
};

const valuetext = (value) => {
    return value + 'px';
}


export default function DisplayView(props) {
    const classes = useStyles();
    const isCreateMode = (createMode) => {
        if (createMode === 'Yes') {
            return (
                <CreateBoardButton onClick={props.createBoardPressed}/>
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
            <div style={controlpanel()}>
                <div style={{display: 'inline-flex', width: '200px'}}>
                    <button style={{marginRight: "10px"}} onClick={copyToClipboard}>Copy Puzzle Link</button>
                    {
                        props.copiedToClipboard ?
                            <div style={{"color": "green"}}>
                                Copied!
                            </div> : null
                    }
                </div>
                <div style={buttonPanel()}>
                    <ResetButton
                        resetPuzzle={props.resetPuzzle}
                    />
                    {isCreateMode(props.createMode)}
                </div>
                <div style={buttonPanel()}>
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
                </div>
            </div>
        )
    }