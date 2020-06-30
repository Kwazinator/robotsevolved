import React from 'react';
import Game from '../containers/Game';

class DailyChallengePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game dailyChallengeMode={'Yes'} playerStateList={this.props.playerStateList} savedMoves={this.props.savedMoves} games={window.dailyChallengeGameslist} dc_id={window.dc_id} highscores={window.dchighscores}
             />
        )
    }


}

export default DailyChallengePage;