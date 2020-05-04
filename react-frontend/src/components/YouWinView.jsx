import React from 'react';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class YouWinView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                You Win! with {this.props.numMoves} Moves!
                </div>
                <input style={buttonpanel()} id={"namesubmitHS"} type={"text"} placeholder={"Username"}>
                </input>
                <form onSubmit={this.props.submitAnswer} style={buttonpanel()}>
                    <button type="submit">Submit Highscore </button>
                </form>
            </div>
        )
    }
}

export default YouWinView;