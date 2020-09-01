import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import {Words,Line,Frame} from 'arwes';

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
                    <Words animate layer='primary'>Move on to the next one!</Words>
                    <DialogActions>
                      <Button variant="outlined" color="secondary" onClick={this.props.moveNextPuzzle}>Next Puzzle</Button>
                      <Button color='secondary' variant='outlined' onClick={this.props.resetPuzzle}>Reset</Button>
                    </DialogActions>
                  </p>
                </Frame>
              </div>
            </Dialog>
        )
    }
}

export default YouWinLessonModal;