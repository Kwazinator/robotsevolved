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
            <Button onClick={this.handleClick} variant="contained" color="secondary">Create New Board</Button>
        )
    }
}