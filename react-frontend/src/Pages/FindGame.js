import React from 'react';
import Game from '../containers/Game';
import GameListItemView from '../components/GameListItemView';
import SearchBarFindGame from '../components/SearchBarFindGame';

import axios from 'axios';

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

    handleSearchSubmit = event => {
        event.preventDefault();
        var searchTerm = document.getElementById("searchBarFindGame").value;
        axios.post('/search', {search: searchTerm})
            .then( res => {
                console.log(res);
                this.setState({
                    highscoreslist: JSON.parse(res.data.highscoreslist),
                    gameslist: JSON.parse(res.data.gameslist)
                });
            });
    }

    render () {
        return (
            <div id={'GameMain'}>
                <SearchBarFindGame submitSearch={this.handleSearchSubmit}/>
                {
                    this.state.gameslist.map((game,index)=>
                        <GameListItemView handleGameClick={this.handleGameClick} game={game} highscores={this.state.highscoreslist[index]} highscore={this.state.highscoreslist[index][0]}/>
                    )
                }
            </div>
        )
    }


}

export default FindGame;