import React from 'react';
import CreateGame from './Pages/CreateGame';
import FindGame from './Pages/FindGame';
import PlayGame from './Pages/PlayGame';
import Home from './Pages/Home';
import LoginModal from './containers/Modals/LoginModal';
import LoggedInUser from './components/LoggedInUser';
import SignInButton from './components/SignInButton';

class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(window.highscoreslist);
        console.log(window.gameslist);
        if (window.uri == '') {
            this.state = {
                PageSelected: <Home handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame}/>, //default page for website
            };
        }
        else {
            this.state = {
                PageSelected: <PlayGame gamedata={window.token.puzzledata} highscores={window.highscores} uri={window.uri}/>, //when uri is entered to play specific game
            };
        }
        this.state.showLoginModal = false;
    }

    SignInButtonPressed = (type) => {
        if (type == 'Sign in') {
            this.setState({
                showLoginModal: true
            });
        }
        else {
            window.location.href = "/auth/logout";
        }
    }

    closeLoginModal = event => {
        event.preventDefault();
        this.setState({
            showLoginModal: false
        });
    }

    handleGameClick = (gamedata,highscores,uri) => {
        this.setState({
            PageSelected: <PlayGame highscores={highscores} gamedata={gamedata} uri={uri}/>
        });
    }

    handleClickCreateGame = event => {
        event.preventDefault();
        var newGame = <CreateGame state={"new"}/>; //KNOWN bug where if you create a game you have to refresh the page to cause a re-render of <CreateGame/>
        this.setState({
            PageSelected: newGame, //if selected page is already CreateGame it wont refresh known problem
        });
    }

    handleClickFindGame = event => {
        event.preventDefault();
        console.log('here');
        this.setState({
            PageSelected: <FindGame handleGameClick={this.handleGameClick}/>,
        });
    }


    render() {
        return (
            <div>
                <header id="top">
                    <div class="site-title-nav">
                        <input type="checkbox" id="tn-tg" class="topnav-toggle fullscreen-toggle" aria-label="Navigation"/>
                            <label for="tn-tg" class="fullscreen-mask"></label>
                            <label for="tn-tg" class="hbg">
                                <span class="hbg__in"></span>
                            </label>
                            <h1 class="site-title">
                                <a href="/">RobitsEvolved
                                    <span>.com</span>
                                </a>
                            </h1>
                            <nav id="topnav" class="hover">
                                <section>
                                    <a href="/">
                                        <span class="play">Play</span>
                                        <span class="home">robitsevolved</span>
                                    </a>
                                    <div role="group">
                                        <a onClick={this.handleClickCreateGame} href="/#createGame">Create a game</a>
                                        <a onClick={this.handleClickFindGame} href="/#findgame">Find a game</a>
                                        <a href="/simul">Puzzle Rush</a>
                                    </div>
                                </section>
                                <section>
                                    <a href="/training">Learn</a>
                                    <div role="group">
                                        <a href="/learn">Robits Basics</a>
                                        <a href="/training">Starter Puzzles</a>
                                    </div>
                                </section>
                                <section>
                                    <a href="/player">Community</a>
                                    <div role="group">
                                        <a href="/player">Players</a>
                                        <a href="/team">Teams</a>
                                        <a href="/forum">Forum</a>
                                    </div>
                                </section>
                                <section>
                                    <a href="/analysis">Tools</a>
                                    <div role="group">
                                        <a href="/analysis">Robits solver (test)</a>
                                        <a href="/analysis#explorer">Settings</a>
                                    </div>
                                </section>
                            </nav>
                    </div>
                    <div class="site-buttons">
                        <div id="clinput">
                            <a class="link">
                                <span data-icon="y"></span>
                            </a>
                            <input spellcheck="false" autocomplete="false" aria-label="Search" placeholder="Search"></input>
                        </div>
                        <div class="dasher">
                            <a class="toggle link anon">
                                <span title="Preferences" data-icon="%"></span>
                            </a>
                        </div>
                        <LoggedInUser/>
                        <SignInButton onClick={this.SignInButtonPressed}/>
                    </div>
                </header>
                {this.state.PageSelected}
                <LoginModal closeLoginModal={this.closeLoginModal} show={this.state.showLoginModal}/>
            </div>
        )
    }
}

export default App;
