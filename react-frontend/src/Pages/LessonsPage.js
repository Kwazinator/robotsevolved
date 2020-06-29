import React from 'react';
import Game from '../containers/Game';

class LessonsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Game learnMode={'Yes'} games={window.learngameslist}/>
        )
    }


}

export default LessonsPage;