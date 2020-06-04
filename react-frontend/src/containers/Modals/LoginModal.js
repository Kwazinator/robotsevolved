import React from "react";
import "./modal.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }

    loginGoogle = event => {
        event.preventDefault();
        window.location.href = "/login/google";
    };

    render () {
        return (
            <Dialog onClose={this.props.closeLoginModal}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.props.closeLoginModal}>Login to Robits</DialogTitle>
                <DialogContent dividers>
                    <img onClick={this.loginGoogle} src={"/static/images/btn_google_signin_light_normal_web@2x.png"}></img>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeLoginModal}>Close</Button>
                </DialogActions>
            </Dialog>
            )
    }
}