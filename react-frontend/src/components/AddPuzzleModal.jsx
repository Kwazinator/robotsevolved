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
class AddPuzzleModal extends React.Component {

    constructor(props) {
        super(props);
    }

    campaignPuzzle = () => {
        if (window.userInfo != null) {
            if (window.userInfo.userID == 2 || window.userInfo.userID == 3 || window.userInfo.userID == 7 || window.userInfo.userID == 5) {
                return <Button variant="contained" color="secondary" onClick={this.props.submitPuzzleCampaign}>Campaign Puzzle</Button>
            }
            else {
                return null
            }
        }
        else {
            return null
        }
    }

    render() {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>Submit Puzzle</DialogTitle>
                <DialogContent dividers>
                    <TextField id={"namesubmit"} label={"Name of Puzzle"} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.props.submitPuzzle}>Submit Puzzle</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                    {this.campaignPuzzle()}
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddPuzzleModal;
