import React from 'react';
import ResetButton from "../components/ResetButton";
import BoardResetModal from './Modals/BoardResetModal';
import CreateBoardButton from "../components/CreateBoardButton";

const controlpanel = () => {
    return {
        marginRight: '10px',
        marginTop: '25px',
        marginBottom: '10px',
        opacity: 1
    };
};

const buttonPanel = () => {
    return {
        display: 'inline-flex',
        width: '200px',
        marginTop: '15px',
        marginBottom: '15px',
    }
};

class DisplayView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            copySuccess: false
        }
    }

    isCreateMode = (createMode) => {
        if (createMode === 'Yes') {
            return (
                <CreateBoardButton onClick={this.props.createBoardPressed}/>
                );
        }
        else {
            return null
        }
    };

    copyToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = 'http://' + window.location.host + '/play/' + this.props.uri;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.setState({copySuccess: true})
    };

    render() {
        return (
            <div style={controlpanel()}>
                <div style={{display: 'inline-flex', width: '200px'}}>
                    <button style={{marginRight: "10px"}} onClick={this.copyToClipboard}>Copy Puzzle Link</button>
                    {
                        this.state.copySuccess ?
                            <div style={{"color": "green"}}>
                                Copied!
                            </div> : null
                    }
                </div>
                <div style={buttonPanel()}>
                    <ResetButton
                        resetPuzzle={this.props.resetPuzzle}
                    />
                    {this.isCreateMode(this.props.createMode)}
                </div>
            </div>
        )
    }
}

export default DisplayView;
