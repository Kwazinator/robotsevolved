import React from 'react';
import ResetButton from "../components/ResetButton";
import BoardResetPanel from '../components/BoardResetPanel';

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

    isCreateMode = (createMode) => {
        if (createMode == 'Yes') {
            return (
                <BoardResetPanel
                    createBoard={this.props.createBoard}
                    width={this.props.width}
                    height={this.props.height}
                    percent={this.props.percent}
                />);
        }
        else {
            return null
        }
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
                {this.isCreateMode(this.props.createMode)}
            </div>
        )
    }
}

export default DisplayView;
