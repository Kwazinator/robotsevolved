import React from 'react';
import ResetButton from "../components/ResetButton";

const controlpanel = () => {
    return {
        marginRight: '10px',
        float: 'left',
        width: '15%',
        opacity: 1
    };
};

class DisplayView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={controlpanel()}>
                <div>
                    {'http://' + window.location.host + '/play/' + this.props.uri}
                </div>
                <ResetButton
                    resetPuzzle={this.props.resetPuzzle}
                />
            </div>
        )
    }
}

export default DisplayView;
