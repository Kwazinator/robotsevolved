import React from "react";
import "./modal.css";

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }

    loginGoogle = event => {
        event.preventDefault();
        window.location.href = "/login/google";
    }

    render () {
        if (!this.props.show) {
            return null;
        }
        return (
            <div class="modal" id="modal">
                <h2>Login to Robits!</h2>
                <img onClick={this.loginGoogle} src={"/static/images/btn_google_signin_light_normal_web@2x.png"}></img>
                <button class="toggle-button" onClick={this.props.closeLoginModal}>close</button>
            </div>
            )
    }
}