import React from 'react';
import SignInButton from './SignInButton';


const style = () => {
    return {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        marginTop: '5px',
    };
};

const divStyle = () => {
    return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '200px',
    };
};

export default class LoggedInUser extends React.Component {

    SignInButtonPressed = () => {
        this.props.handleClick('Sign in');
    }

    render () {
        if (window.loggedin == 'No') {
            return <SignInButton onClick={this.SignInButtonPressed}/>
        }
        else {
            return (
                <div style={divStyle()}>
                    <div>{window.userInfo.username}</div>
                    <div class="dasher">
                        <img src={window.userInfo.profilePicture} style={style()}/>
                    </div>
                </div>
            )
        }
    }
}