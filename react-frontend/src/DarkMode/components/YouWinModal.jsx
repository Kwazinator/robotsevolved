import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {Frame, Words, Line} from 'arwes';

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

class YouWinModal extends React.Component {

    constructor(props) {
        super(props);
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
                      You Win!
                    </Words>
                    <Line animate />
                    <Words animate layer='primary'>{'You used ' + this.props.numMoves + ' Moves!'}</Words><br/>
                    <TextField
                      InputProps={{
                        className: classes.multilineColor,
                      }}
                      InputLabelProps={{
                        className: classes.multilineColorLabel,
                      }}
                      color="secondary"
                      id={"namesubmitHS"}
                      label={"Username"}
                      defaultValue={this.props.username == '' ? "Anonymous" : this.props.username}
                    />
                    <DialogActions>
                      <Button variant="outlined" color="secondary" onClick={this.props.submitAnswer}>Submit Highscore</Button>
                      <Button color='secondary' variant='outlined' onClick={this.props.resetPuzzle}>Reset</Button>
                    </DialogActions>
                  </p>
                </Frame>
              </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(YouWinModal);