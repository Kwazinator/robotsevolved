import React from 'react';
import Game from '../containers/Game';

class PuzzleRushPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game
                  handleClickPlayAgain={this.props.handleClickPlayAgain}
                  handleLineDirections={this.props.handleLineDirections}
                  LineDirections={this.props.LineDirections}
                  puzzleRush={'Yes'}
                  p_id={this.props.p_id}
                  games={this.props.games}
                  difficulty={this.props.difficulty}
             />
        )
    }
}

export default PuzzleRushPage;