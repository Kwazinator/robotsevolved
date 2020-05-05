import React from 'react';
import Game from '../containers/Game';

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game loadedGame={'Yes'} gamedata={this.props.gamedata} highscores={this.props.highscores} uri={this.props.uri}/>
        )
    }


}

export default PlayGame;