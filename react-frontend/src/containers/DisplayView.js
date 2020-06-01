import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
};


class DisplayView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { copyButtonText: "Copy Puzzle Link" };
    }

    isCreateMode = (createMode) => {
        if (createMode === 'Yes') {
            return (
                    <Button onClick={this.handleCreateBoardClick}> Create New Board</Button>
                );
        }
        else {
            return null
        }
    };

    handleCreateBoardClick = event => {
        return this.props.createBoardPressed('Create Board');
    };

    copyToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = 'http://' + window.location.host + '/play/' + this.props.uri;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.props.copiedClipboard();
        var thisThing = this;
        thisThing.setState({copyButtonText: "Link Copied"});
        setTimeout(function () {
            thisThing.setState({copyButtonText: "Copy Puzzle Link"})
        }, 1500)
    };

    handleDimensionChange = (event,value) => {
        var dimension = parseInt(value);
        if (dimension.toString() === "NaN") {
            dimension = 10;
        } else if (dimension > 16) {
            dimension = 16;
        } else if (dimension < 2) {
            dimension = 2;
        }
        this.props.DimensionChanged(dimension);
    };

     render() {
         return (
             <div style={controlpanel()}>
                 <div style={{display: 'inline-flex', width: '200px', paddingBottom: '10px'}}>
                     <Button variant="contained" color="secondary" style={{marginRight: "10px"}}
                             onClick={this.copyToClipboard}>{this.state.copyButtonText}</Button>
                 </div>
                 <ButtonGroup color="secondary" aria-label="contained primary button group">
                     <Button onClick={this.props.resetPuzzle}>Reset</Button>
                     {this.isCreateMode(this.props.createMode)}
                 </ButtonGroup>
                 <div style={buttonPanel()}>
                     <Typography id="discrete-slider-small-steps" gutterBottom>
                         Size Of Board
                     </Typography>
                     <Slider
                         onChangeCommitted={this.handleDimensionChange}
                         getAriaValueText={valuetext}
                         aria-labelledby="discrete-slider-small-steps"
                         step={1}
                         marks
                         min={2}
                         max={16}
                         defaultValue={10}
                         valueLabelDisplay="auto"
                     />
                 </div>
             </div>
         )
     }
    }

export default DisplayView