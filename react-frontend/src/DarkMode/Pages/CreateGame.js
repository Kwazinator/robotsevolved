import React from 'react';
import Game from '../containers/Game';

class CreateGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settingsWidth: 16,
            settingsHeight: 16,
            settingsPercent: .9,
        }
    }
    render () {
        return (
            <Game loadedGame='No'
                  handleLineDirections={this.props.handleLineDirections}
                  LineDirections={this.props.LineDirections}
                  settingsWidth={this.state.settingsWidth}
                  settingsHeight={this.state.settingsHeight}
                  settingsPercent={this.state.settingsPercent}
            />
        )
    }


}

export default CreateGame;