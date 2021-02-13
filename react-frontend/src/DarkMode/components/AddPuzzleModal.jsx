import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {withStyles} from '@material-ui/core/styles';
import {Frame,Words,Line} from 'arwes';


const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}

const styles = theme => ({
    multilineColor:{
        color:'#12599b',
    },
    multilineColorLabel:{
        color:'#12599b',
    },

});


class AddPuzzleModal extends React.Component {

    constructor(props) {
        super(props);
    }

    campaignPuzzle = () => {
        if (window.loggedin === 'Yes') {
            if (window.userInfo.userID == 2 || window.userInfo.userID == 3 || window.userInfo.userID == 7 || window.userInfo.userID == 4) {
                return <Button variant='outlined' color='secondary' onClick={this.props.submitPuzzleCampaign}>Campaign Puzzle</Button>
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
        const  { classes } = this.props;
        return (
            <Dialog
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
              overlayStyle={{ backgroundColor: "transparent" }}
              disableAutoFocus={true}
              disableEnforceFocus={true}
              onClose={this.handleClose}
              container={() => document.getElementById("MainGameBoard")}
              style={{ position: "absolute" }}
              BackdropProps={{ style: { position: "absolute" } }}
              aria-labelledby="customized-dialog-title"
              open={this.props.show}
              maxWidth={"xs"}
            >
              <div style={{ margin: "20px" }}>
                <Frame animate levels={1} corners={3}>
                  <p style={{ margin: "10px" }}>
                    <Words animate layer="control">
                      Submit Puzzle
                    </Words>
                    <Line animate />
                    <TextField
                      InputProps={{
                        className: classes.multilineColor,
                      }}
                      InputLabelProps={{
                        className: classes.multilineColorLabel,
                      }}
                      color="secondary"
                      id={"namesubmit"}
                      label={"Name of Puzzle"}
                      defaultValue={"PuzzleName"}
                    />
                    <DialogActions>
                      <Button variant="outlined" color="secondary" onClick={this.props.submitPuzzle}>Submit Puzzle</Button>
                      <Button variant='outlined' color='secondary' onClick={this.props.resetPuzzle}>Reset</Button>
                      {this.campaignPuzzle()}
                    </DialogActions>
                  </p>
                </Frame>
              </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(AddPuzzleModal);
