import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class RandomGameStatsModal extends React.Component {

    constructor(props) {
        super(props);
    }

    showStatsModal = () => {
        console.log('do some shit here to show the stats');
    };

    render() {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title-random" onClose={this.handleClose}>You Win!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves!
                    </div>
                    <br/>
                    <div>
                        lowest possible moves: {this.props.lowestMoves}
                    </div>
                    <div>
                        Sequence: {this.props.lowestMoveSequence}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.showStatsModal}>Show Puzzle Answers</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default RandomGameStatsModal;