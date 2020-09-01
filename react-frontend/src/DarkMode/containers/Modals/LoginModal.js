import React from "react";
import "./modal.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { FaCrown } from 'react-icons/fa';
import Button from "@material-ui/core/Button";

const stylecol = () => {
    return({
            float: 'left',
            width: '50%',
            margin: 'auto',
            padding: '0 50px',
            marginTop: '6px',
    });
}

const spacing = () => {
    return({
            marginBottom: '10px',
    });
}

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }

    loginGoogle = event => {
        event.preventDefault();
        window.location.href = "/login/google";
    };

    loginFacebook = event => {
        event.preventDefault();
        window.location.href = "/login/facebook";
    }

    render () {
        return (
            <Dialog onClose={this.props.closeLoginModal}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.props.closeLoginModal}>Login to RobotsEvolved</DialogTitle>
                <DialogContent dividers>
                        <Typography style={spacing()} variant="body2" display="inline">
                           • Gain <FaCrown/>s when winning the Daily Challenge (stacks)
                        </Typography>
                        <br/>
                        <Typography style={spacing()} variant="body2" display="inline">
                            • Be able to give a like to your favorite puzzles
                        </Typography>
                        <br/>
                        <Typography style={spacing()} variant="body2" display="inline">
                            • Saving settings and your moves in the daily challenge
                        </Typography>
                        <br/>
                        <Typography variant="body2" display="inline">
                            • Profile Page to keep track of your submissions.
                        </Typography>
                    <div class="col">
                        <a href="#" onClick={this.loginFacebook} id={"buttonfb"}>
                          <i class="fa fa-facebook fa-fw"></i> Login with Facebook
                         </a>
                        <a onClick={this.loginGoogle} href="#" id={"buttongoogle"}><i class="fa fa-google fa-fw">
                          </i> Login with Google
                        </a>
                    </div>
                    <Typography variant="caption" display="block">
                            We will NEVER distribute/sell your facebook or google email address.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeLoginModal}>Close</Button>
                </DialogActions>
            </Dialog>
            )
    }
}
