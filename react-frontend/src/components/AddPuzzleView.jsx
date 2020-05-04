import React from 'react';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class AddPuzzleView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.submitPuzzle} style={buttonpanel()}>
                    <button type="submit">Create Puzzle</button>
                </form>
                <input style={buttonpanel()} id={"namesubmit"} type={"text"} placeholder={"Name Of Puzzle?"}>

                </input>
            </div>
        )
    }
}

export default AddPuzzleView;
