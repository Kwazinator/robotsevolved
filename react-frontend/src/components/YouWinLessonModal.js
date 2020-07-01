import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class YouWinLessonModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} container={() => document.getElementById('MainGameBoard')} style={{position: 'absolute'}} BackdropProps={{ style: { position: 'absolute' } }}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>You Win!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves!
                    </div>
                    <br/>
                    <Typography> You completed the Lesson! Move on to the next one!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YouWinLessonModal;