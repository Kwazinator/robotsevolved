import React from 'react';
import MovesView from '../components/MovesView';

class DailyChallengeHistoryData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.nameSubmitted} - {this.props.scoreSubmitted}
                <br/>
                Difficulty of: {this.props.difficultyforPuzzle}
                <br/>
                Best Possible of: {this.props.lowestMovesforPuzzle}
                <br/>
                {this.props.lowestMoveSequence}
                <br/>
                Player
                <br/>
                <MovesView
                    moveHistory={this.props.playerMovedSequence} playerState={[{colorSignifier: "blue"},{colorSignifier: "green"},{colorSignifier: "yellow"},{colorSignifier: "red"}]}
                />
            </div>
        )
    }
}

export default DailyChallengeHistoryData;