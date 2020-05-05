import React from 'react';
import CreateGame from './Pages/CreateGame';
import FindGame from './Pages/FindGame';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PageSelected: <CreateGame/>, //default page for website
        };
    }


    handleClickCreateGame = event => {
        event.preventDefault();
        this.setState({
            PageSelected: <CreateGame/>, //if selected page is already CreateGame it wont refresh known problem
        });
    }

    handleClickFindGame = event => {
        event.preventDefault();
        this.setState({
            PageSelected: <FindGame/>,
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
                        <a href="/login?referrer=/" class="signin button button-empty">Sign in</a>
                    </div>
                </header>
                      {this.state.PageSelected}
            </div>
        )
    }
}

export default App;
