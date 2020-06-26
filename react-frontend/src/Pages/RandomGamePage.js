import React from 'react';
import Game from '../containers/Game';

class RandomGamePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game randomGame={'Yes'}
                  game={this.props.game}
                  difficulty={this.props.difficulty}
             />
        )
    }
}

export default RandomGamePage;