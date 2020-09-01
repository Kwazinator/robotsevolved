import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Dialog from "@material-ui/core/Dialog";
import {Project, Words,Line,Frame} from 'arwes';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    multilineColor:{
        color:'#12599b',
    },
    multilineColorLabel:{
        color:'#12599b',
    },

});


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
                      You Completed the Challenge!
                    </Words>
                    <Line animate />
                    <Words animate layer='primary'>{"You used " + this.props.numMoves + " Moves!"}</Words>
                    <Line animate />
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
                    {this.state.error}
                    {this.props.submitted}
                    <DialogActions>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.props.undoMove}
                      >
                        Undo Move
                      </Button>
                      {this.props.submitted == null ? (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={this.handleClickSubmitGame}
                        >
                          Submit Highscore
                        </Button>
                      ) : null}
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={this.props.resetPuzzle}
                      >
                        Reset
                      </Button>
                    </DialogActions>
                  </p>
                </Frame>
              </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(YouWinDailyFinalModal);