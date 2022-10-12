import React from 'react';
import Game from '../containers/Game';

class DailyEvolutionPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game
                daily_start_timer_seconds={this.props.daily_start_timer_seconds}
                daily_start_timer_minutes={this.props.daily_start_timer_minutes}
                handleClickDailyEvolution={this.props.handleClickDailyEvolution}
                handleLineDirections={this.props.handleLineDirections}
                LineDirections={this.props.LineDirections}
                dailyEvolutionMode={'Yes'}
                playerStateList={this.props.playerStateList}
                savedMoves={this.props.savedMoves}
                games={this.props.dailyChallengeGameslist}
                dce_id={this.props.dce_id}
                highscores={this.props.dcehighscores}
             />
        )
    }


}

export default DailyEvolutionPage;