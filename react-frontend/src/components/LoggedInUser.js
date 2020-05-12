import React from 'react';

const style = () => {
    return {
        borderRadius: '50%',
        height: '50px',
        width: '50px',
    };
}

export default class LoggedInUser extends React.Component {

    render () {
        if (window.loggedin == 'No') {
            return null
        }
        else {
            return (
                <div>
                    <div class="dasher">
                        <img src={window.userInfo.profilePicture} style={style()}/>
                    </div>
                    <div>{window.userInfo.username}
                    </div>
                </div>
            )
        }
    }
}