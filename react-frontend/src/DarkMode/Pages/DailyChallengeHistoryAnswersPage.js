import React from 'react';
import Game from '../containers/Game';

class DailyChallengeHistoryAnswersPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        console.log(this.props.history);
        return (
            <Game
                handleLineDirections={this.props.handleLineDirections}
                LineDirections={this.props.LineDirections}
                dailyChallengeModeAnswers={'Yes'}
                nameSubmitted={this.props.history.nameSubmitted}
                bestScore={this.props.history.bestScore}
                created={this.props.history.created}
                games={this.props.history.games}
                playerStateList={this.props.history.playerStateList}
                scoreSubmitted={this.props.history.scoreSubmitted}
                solutionDataSubmitted={this.props.history.solutionDataSubmitted}
                submitted={this.props.history.submitted}
                user_id={this.props.user_id}
                />
        )
    }


}

export default DailyChallengeHistoryAnswersPage;