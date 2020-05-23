import React from 'react';


const mainStyle = () => {
    return {
        marginRight: '25px',
        marginTop: '25px',
        marginBottom: '50px',
        marginLeft: '50px',
        paddingRight: '25px',
        paddingLeft: '25px',
        paddingTop: '25px',
        paddingBottom: '25px',
        float: 'left',
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
        var highscore = this.props.highscore;
        if (typeof highscore === 'undefined') {
            highscore = {
                comment: '',
                numMoves: '',
            }
        }
        return (
        <div style={mainStyle()}>
            <div>
                <h2 onClick={this.handleGameClick}>{this.props.game.name}</h2>
            </div>
            <div style={highscoresStyle()}><h4>Highscore:</h4>
                <div><div>{highscore.comment}</div><div>{highscore.numMoves}</div></div>
            </div>
        </div>
        )
    }
}
export default GameListItemView