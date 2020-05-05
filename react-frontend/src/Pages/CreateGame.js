import React from 'react';
import Game from '../containers/Game';

class CreateGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game loadedGame='No'/>
        )
    }


}

export default CreateGame;