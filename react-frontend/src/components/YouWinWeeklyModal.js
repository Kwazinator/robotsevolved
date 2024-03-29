import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Dialog from "@material-ui/core/Dialog";

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class YouWinWeeklyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    handleClickSubmitGame = () => {
        if (document.getElementById("namesubmitHS").value == '') {
            this.setState({
                error: <Alert severity="error">You must choose a submit name</Alert>
            })
        }
        else {
            this.props.submitAnswer(this.props.newPlayerState);
            this.setState({
                error: null
            });
        }
    }

    render() {
        var buttontext = this.props.numMoves > 100 ? 'Show Progress' : 'Submit Highscore';
        return (
            <Dialog disableAutoFocus={true} disableEnforceFocus={true} onClose={this.handleClose} container={() => document.getElementById('MainGameBoard')} style={{position: 'absolute'}} BackdropProps={{ style: { position: 'absolute' } }}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>You got all the puzzles!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves!
                        <br/>
                        {this.props.numMoves == 100 ? 'you receive a crown!' : 'Get total moves to 100 to receive a crown!'}
                    </div>
                    <br/>
                    <TextField id={"namesubmitHS"} label={"Username"} defaultValue={this.props.username}/>
                    {this.state.error}
                    {this.props.submitted}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.undoMove}>Undo Move</Button>
                    {this.props.submitted == null ? <Button variant="contained" color="secondary" onClick={this.handleClickSubmitGame}>{buttontext}</Button> : null}
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YouWinWeeklyModal;