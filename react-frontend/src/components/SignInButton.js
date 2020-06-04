import React from 'react';

import Button from "@material-ui/core/Button";

export default class SignInButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = event => {
        if (window.loggedin == 'Yes') {
            return this.props.onClick('Logout');
        }
        else {
            return this.props.onClick('Sign in');
        }
    }



    render () {
        if (window.loggedin == 'Yes') {
            var textToShow = 'Logout';
        }
        else {
            var textToShow = 'Sign in';
        }
        return (
            <Button color="primary" onClick={this.handleClick}>{textToShow}</Button>
        )
    }
}