import React from 'react';
import Game from '../containers/Game';

class WeeklyChallengePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game handleWeeklyClick={this.props.handleWeeklyClick}
                    handleLineDirections={this.props.handleLineDirections}
                    LineDirections={this.props.LineDirections}
                    weeklyChallengeMode={'Yes'}
                    playerStateList={this.props.playerStateList}
                    savedMoves={this.props.savedMoves}
                    games={this.props.weeklyChallengeGameslist}
                    wc_id={this.props.wc_id}
                    highscores={this.props.wchighscores}
                    gamesWon={this.props.gamesWon}
             />
        )
    }


}

export default WeeklyChallengePage;