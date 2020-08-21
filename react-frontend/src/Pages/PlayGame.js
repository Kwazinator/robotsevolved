import React from 'react';
import Game from '../containers/Game';

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game
                  handleLineDirections={this.props.handleLineDirections}
                  LineDirections={this.props.LineDirections}
                  loadedGame={'Yes'}
                  name={this.props.name}
                  author={this.props.authorname}
                  gamedata={this.props.gamedata}
                  highscores={this.props.highscores}
                  uri={this.props.uri}
             />
        )
    }


}

export default PlayGame;