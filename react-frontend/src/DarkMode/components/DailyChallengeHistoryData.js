import React from 'react';
import MovesView from '../components/MovesView';
import ShowDailyChallengeScoreCard from '../components/ShowDailyChallengeScoresCard'
import Typography from '@material-ui/core/Typography';

const stylebelow = () => {
    return {
        marginTop: '40px',
        marginBottom: '20px'
    }
}

class DailyChallengeHistoryData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Typography style={stylebelow()} variant="h4"> {this.props.difficultyforPuzzle} </Typography>
                <ShowDailyChallengeScoreCard
                    name={"Robot God"}
                    bestScore={this.props.bestScore}
                    MovesforPuzzle={this.props.lowestMovesforPuzzle}
                    MoveSequence={this.props.lowestMoveSequence}
                />
                <ShowDailyChallengeScoreCard
                    name={this.props.nameSubmitted}
                    bestScore={this.props.scoreSubmitted}
                    MovesforPuzzle={null}
                    MoveSequence={<MovesView
                                        moveHistory={this.props.playerMovedSequence} playerState={[{colorSignifier: "blue"},{colorSignifier: "green"},{colorSignifier: "red"},{colorSignifier: "yellow"}]}
                                  />}
                 />
            </div>
        )
    }
}

export default DailyChallengeHistoryData;