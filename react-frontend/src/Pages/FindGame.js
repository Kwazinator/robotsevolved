import React from 'react';
import Game from '../containers/Game';
import GameListItemView from '../components/GameListItemView';
import SearchBarFindGame from '../components/SearchBarFindGame';
import FindGameElements from '../containers/FindGameElements'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class FindGame extends React.Component {

    constructor(props) {
        super(props);
        var gameslist = window.gameslist;
        var highscoreslist = window.highscoreslist;
        console.log(gameslist)
        console.log(highscoreslist)
        this.state = {
            gameslist: gameslist,
            highscoreslist: highscoreslist,
        }
    }

    handleGameClick = (name,gamedata,highscores,uri) => {
        console.log(uri);
        this.props.handleGameClick(name,gamedata,highscores,uri);
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
    };

    render () {
        return (
            <div id={'GameMain'}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {
                            this.state.gameslist.map((game,index)=>
                                <FindGameElements handleGameClick={this.handleGameClick} game={game} highscores={this.state.highscoreslist[index]} highscore={this.state.highscoreslist[index][0]}/>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }


}
//<SearchBarFindGame submitSearch={this.handleSearchSubmit}/>
export default FindGame;