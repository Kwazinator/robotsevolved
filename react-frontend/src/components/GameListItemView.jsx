import React from 'react';


const mainStyle = () => {
    return {
        width: '90%',
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
    }

}

const highscoresStyle = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
    }

}


class GameListItemView extends React.Component {

    constructor(props) {
        super(props);
    }

    handleGameClick = () => {
        this.props.handleGameClick(this.props.game.puzzledata,this.props.highscores,this.props.game.uri);
    }


 render() {
        return (
        <div style={mainStyle()}>
            <div>
                <h2 onClick={this.handleGameClick}>{this.props.game.name}</h2>
            </div>
            <div style={highscoresStyle()}><h3>Highscores:</h3>
                {
                    this.props.highscores.map(highscore =>
                        <div><div>{highscore.comment}</div><div>{highscore.numMoves}</div></div>
                    )
                }
            </div>
        </div>
        )
    }
}
export default GameListItemView