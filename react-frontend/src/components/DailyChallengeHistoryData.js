import React from 'react';
import MovesView from '../components/MovesView';
import ShowDailyChallengeScoreCard from '../components/ShowDailyChallengeScoresCard'

class DailyChallengeHistoryData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Difficulty of: {this.props.difficultyforPuzzle}
                <ShowDailyChallengeScoreCard
                    name={"Robit God"}
                    bestScore={this.props.bestScore}
                    MovesforPuzzle={this.props.lowestMovesforPuzzle}
                    MoveSequence={this.props.lowestMoveSequence}
                />
                <ShowDailyChallengeScoreCard
                    name={this.props.nameSubmitted}
                    bestScore={this.props.scoreSubmitted}
                    MovesforPuzzle={this.props.playerMovedSequence.length}
                    MoveSequence={<MovesView
                                        moveHistory={this.props.playerMovedSequence} playerState={[{colorSignifier: "blue"},{colorSignifier: "green"},{colorSignifier: "yellow"},{colorSignifier: "red"}]}
                                  />}
                 />
            </div>
        )
    }
}

export default DailyChallengeHistoryData;