import React from 'react';
import Game from '../containers/Game';

class PuzzleRushPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game puzzleRush={'Yes'}
                  p_id={this.props.p_id}
                  games={this.props.games}
                  difficulty={this.props.difficulty}
             />
        )
    }
}

export default PuzzleRushPage;