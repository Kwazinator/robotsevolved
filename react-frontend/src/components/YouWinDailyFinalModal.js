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
class YouWinDailyFinalModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClickSubmitGame = () => {
        this.props.submitAnswer(this.props.robotPosition)
    }

    render() {
        return (
            <Dialog disableAutoFocus={true} disableEnforceFocus={true} onClose={this.handleClose} container={() => document.getElementById('MainGameBoard')} style={{position: 'absolute'}} BackdropProps={{ style: { position: 'absolute' } }}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>You Completed the Challenge!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves!
                    </div>
                    <br/>
                    <TextField id={"namesubmitHS"} label={"Username"} defaultValue={this.props.username}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.undoMove}>Undo Move</Button>
                    <Button variant="contained" color="secondary" onClick={this.handleClickSubmitGame}>Submit Highscore</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YouWinDailyFinalModal;