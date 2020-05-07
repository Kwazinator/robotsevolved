import React from 'react';
import HighScores from '../components/HighScores';

const controlpanel = () => {
    return {
        marginRight: '10px',
        float: 'left',
        width: '15%',
    };
}

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}

class DisplayView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={'DisplayView'} style={controlpanel()}>
                <div>
                    {'http://' + window.location.host + '/play/' + this.props.uri}
                </div>
                {
                    this.props.playerState.map(position =>
                        this.props.checkwin(position)
                    )
                }
                <div>
                    <form onSubmit={this.props.resetPuzzle} style={buttonpanel()}>
                        <button type="submit">Reset</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default DisplayView;