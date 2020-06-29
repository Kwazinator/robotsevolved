import React from 'react';
import Game from '../containers/Game';

class DailyChallengePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game dailyChallengeMode={'Yes'} games={window.dailyChallengeGameslist} dc_id={window.dc_id} highscores={window.dchighscores}
             />
        )
    }


}

export default DailyChallengePage;