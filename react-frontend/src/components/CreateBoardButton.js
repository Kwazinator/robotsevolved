import React from 'react';

export default class CreateBoardButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = event => {
        return this.props.onClick('Create Board');
    };



    render () {
        return (
            <button onClick={this.handleClick}> Create New Board</button>
        )
    }
}