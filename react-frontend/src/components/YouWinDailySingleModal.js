import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import LearnGameItems from '../components/LearnGameItems';


const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class YouWinDailySingleModal extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Dialog disableAutoFocus={true} disableEnforceFocus={true} onClose={this.handleClose} container={() => document.getElementById('MainGameBoard')} style={{position: 'absolute'}} BackdropProps={{ style: { position: 'absolute' } }}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>Completed!</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">
                        You used {this.props.numMoves} Moves, for this puzzle.
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        Total Moves: {this.props.totalMoves}
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        Finish all puzzles to get submit your score!
                    </Typography>
                    <br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.undoMove}>Undo Move</Button>
                    <Button variant="contained" color="secondary" onClick={this.props.moveNextPuzzle}>Next Puzzle</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YouWinDailySingleModal;