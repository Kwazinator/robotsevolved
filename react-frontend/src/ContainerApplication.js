


import React from 'react';
import App from './App';

export default class ContainerApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Page: <App/>
        }

    }

    render = () => this.state.Page;
}
