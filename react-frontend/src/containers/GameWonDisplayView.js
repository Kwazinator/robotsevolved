import React from 'react';
import ResetButton from "../components/ResetButton";
import HighScores from '../components/HighScores';

const controlpanel = () => {
    return {
        float: 'center',
        width: '15%',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    };
};

class GameWonDisplayView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={'DisplayView'} style={controlpanel()}>
                {
                    this.props.playerState.map(position =>
                        this.props.checkwin(position)
                    )
                }
                <ResetButton
                    resetPuzzle={this.props.resetPuzzle}
                />
            </div>
        )
    }
}

export default GameWonDisplayView;