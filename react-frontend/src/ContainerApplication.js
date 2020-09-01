


import React from 'react';
import DarkModeApp from './DarkMode/App';
import App from './App';

export default class ContainerApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Page: <App handleClickDarkMode={this.handleClickDarkMode}/>
        }

    }

    handleClickDarkMode = () => {
        this.setState({
            Page: <DarkModeApp/>
        })
    }

    render = () => this.state.Page;
}
