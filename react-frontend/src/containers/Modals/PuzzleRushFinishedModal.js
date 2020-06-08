import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px'
    };
};

const labelStyle = () => {
    return {
        display: 'inline-block',
        textAlign: 'right',
        width: '140px',
        paddingRight: '20px'
    };
};


class PuzzleRushWinModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.show = false;
    };

    render () {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title-2"
                    open={this.props.show}
                    maxWidth={"xs"}
                    fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title-2" onClose={this.handleClose}>Puzzle Rush - {this.props.difficulty}</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <label style={labelStyle()} >{'Number of Puzzles Completed:\t\t'}</label>
                        <Paper elevation={3}>{this.props.numPuzzlesCompleted}</Paper>
                    </div>
                    <div>
                        <label style={labelStyle()} >{'Percentile:\t\t'}</label>
                        <Paper elevation={3}>{this.props.percentile}</Paper>
                    </div>
                    <div>
                        <label style={labelStyle()} >{'Average time Per Puzzle:\t\t'}</label>
                        <Paper elevation={3}>{this.props.averageTime}</Paper>
                    </div>
                    <div>
                        <label style={labelStyle()} >{'Average Moves per Puzzle:\t\t'}</label>
                        <Paper elevation={3}>{this.props.averageMoves}</Paper>
                    </div>
                    <div>
                        <label style={labelStyle()} >{'Difference from most optimal Solution:\t\t'}</label>
                        <Paper elevation={3}>{this.props.differenceOptimal}</Paper>
                    </div>
                    <div>
                        <label style={labelStyle()} >{'Moves Per Second:\t\t'}</label>
                        <Paper elevation={3}>{this.props.movesPerSecond}</Paper>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.props.playPuzzleRushAgain}>Play Again!</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    };


}

export default PuzzleRushWinModal;

