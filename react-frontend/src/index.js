import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './containers/Game';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Game boardSize={640} playerSize={40}/>, document.getElementById('postscontainer'));
//ReactDOM.render(<ChartZ type={'bar'}/>, document.getElementById('row2'));
//ReactDOM.render(<ChartZ type={'line'}/>, document.getElementById('row3'));

//ReactDOM.render(<Graph width={400} height={240}/>, document.getElementById('row3'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
