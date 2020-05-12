import React from 'react';

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
            <a onClick={this.handleClick} class="signin button button-empty">{textToShow}</a>
        )
    }
}