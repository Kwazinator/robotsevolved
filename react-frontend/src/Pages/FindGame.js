import React from 'react';
import Game from '../containers/Game';
import GameListItemView from '../components/GameListItemView';

class FindGame extends React.Component {

    constructor(props) {
        super(props);
        var gameslist = window.gameslist;
        var highscoreslist = window.highscoreslist;
        this.state = {
            gameslist: gameslist,
            highscoreslist: highscoreslist,
        }
    }

    handleGameClick = (gamedata,highscores,uri) => {
        this.props.handleGameClick(gamedata,highscores,uri);
    }

    render () {
        return (
            <div id={'GameMain'}>
                {
                    this.state.gameslist.map((game,index)=>
                        <GameListItemView handleGameClick={this.handleGameClick} game={game} highscores={this.state.highscoreslist} highscore={this.state.highscoreslist[index][0]}/>
                    )
                }
            </div>
        )
    }


}

export default FindGame;