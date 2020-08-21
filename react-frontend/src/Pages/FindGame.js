import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FindGameElements from '../containers/FindGameElements'
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";
import InfiniteScroll from 'react-infinite-scroller';
import extend from '../constants/extend';
import CircularProgress from '@material-ui/core/CircularProgress';

const gamepanel = () => {
    return {
        width: '100%',
        paddingTop: '40px',
        paddingLeft: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '0px' : '40px',
        margin: '0 auto',
        align: 'center'
    }
}

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '100%' : 400,
    },
    input: {
        marginLeft: 5,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
        marginLeft: 8,
        marginRight: 8,
    },
});

class FindGame extends React.Component {

    constructor(props) {
        super(props);
        var gameslist = this.props.gameslist;
        var highscoreslist = this.props.highscoreslist;
        this.state = {
            gameslist: gameslist,
            highscoreslist: highscoreslist,
            anchorEl: null,
            hasMore: true,
            lastSearch: 'None',
            offsetSearch: gameslist.length,
            isLoadingSearch: false,
        }

    }

    handleGameClick = (name,gamedata,highscores,uri,authorname) => {
        this.props.handleGameClick(name,gamedata,highscores,uri,authorname);
    };

    handleFilterMenuOpen = event => {
        this.setState( {
          anchorEl: event.currentTarget
      });
    };

    handleKeyDown = (e) => {
        if (e.keycode == 13) {
            this.handleSearchSubmit(e);
        }
        return;
    }


    componentDidMount = () => {
        window.onkeydown = this.handleKeyDown;
        window.scrollTo(0,this.props.findWindowHeight);
    }

    componentWillUnmount = () => {
        this.props.setFindWindow(window.scrollY)
    }

    handleCloseFilterMenuMostPlayed = event => {
        this.setState( {
            anchorEl: null
        })
        var searchTerm = this.searchRef.value;
        axios.post('/search', {search: searchTerm, filter: 'MostPlayed', offset: 0})
            .then( res => {
                var gameslist = JSON.parse(res.data.gameslist)
                var highscoreslist = JSON.parse(res.data.highscoreslist)
                this.props.setNumFindGames(gameslist.length, 'MostPlayed', searchTerm);
                this.setState({
                    highscoreslist: highscoreslist,
                    gameslist: gameslist,
                    lastSearch: 'MostPlayed',
                    hasMore: true
                });
            });
    };

    handleCloseFilterMenuHighest = event => {
        this.setState( {
            anchorEl: null
        })
        var searchTerm = this.searchRef.value;
        axios.post('/search', {search: searchTerm, filter: 'Highest', offset: 0})
            .then( res => {
                var gameslist = JSON.parse(res.data.gameslist)
                var highscoreslist = JSON.parse(res.data.highscoreslist)
                this.props.setNumFindGames(gameslist.length, 'Highest', searchTerm);
                this.setState({
                    highscoreslist: highscoreslist,
                    gameslist: gameslist,
                    lastSearch: 'Highest',
                    hasMore: true
                });
            });
    };

    handleSearchSubmit = event => {
        this.setState( {
            anchorEl: null
        })
        var searchTerm = this.searchRef.value;

        axios.post('/search', {search: searchTerm, filter: 'None', offset: 0})
            .then( res => {
                var gameslist = JSON.parse(res.data.gameslist)
                var highscoreslist = JSON.parse(res.data.highscoreslist)
                this.props.setNumFindGames(gameslist.length, 'None', searchTerm);
                this.setState({
                    highscoreslist: highscoreslist,
                    gameslist: gameslist,
                    lastSearch: 'None',
                    hasMore: true
                });
            });
    };

    hasMore = () => {
        return ( this.state.hasMore ? null : <Grid item alignItems="center" justify="center" xs={12}><Typography style={{textAlign: 'center', display: 'block'}} variant="caption">No More Puzzles</Typography></Grid>)
    }

    loadMoreItems = () => {
        var searchTerm = this.searchRef.value;
        console.log(this.state.gameslist.length);
        console.log(this.state.offsetSearch);
        if (!this.state.isLoadingSearch) {
            this.state.isLoadingSearch = true;
            axios.post('/search', {search: searchTerm, filter: 'None', offset: this.state.offsetSearch})
                .then( res => {
                    var gameslist = JSON.parse(res.data.gameslist);
                    this.state.offsetSearch = gameslist.length + this.state.gameslist.length;
                    var highscoreslist = JSON.parse(res.data.highscoreslist);
                    this.props.setNumFindGames(gameslist.length + this.state.gameslist.length, this.state.lastSearch, searchTerm);
                    this.setState({
                        highscoreslist: this.state.highscoreslist.concat(highscoreslist),
                        gameslist: this.state.gameslist.concat(gameslist),
                        hasMore: gameslist.length == 0 ? false : true,
                        isLoadingSearch: false,
                    });
                });
        }
    }

    handleCloseFilterMenu = () => {
        this.setState({
            anchorEl: null
        });
    };

    render () {
        const  { classes } = this.props;
        console.log(this.state.highscoreslist)
        console.log(this.state.gameslist)
        return (
            <div id='MainFindPage' style={gamepanel()}>
                <Paper component="form" className={classes.root} >
                    <InputBase
                        className={classes.input}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={ref => this.searchRef = ref}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleSearchSubmit();
                                event.preventDefault()
                            }
                        }}
                    />
                    <IconButton onClick={this.handleSearchSubmit} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <Button
                        onClick={this.handleFilterMenuOpen}
                        startIcon={<FilterListIcon />}
                        variant="contained"
                        color="secondary"
                    >
                        Sort
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseFilterMenu}
                    >
                        <MenuItem onClick={this.handleSearchSubmit}>Recently Created</MenuItem>
                        <MenuItem onClick={this.handleCloseFilterMenuMostPlayed}>Most Played</MenuItem>
                        <MenuItem onClick={this.handleCloseFilterMenuHighest}>Highest Scores</MenuItem>
                    </Menu>
                </Paper>
                <br/>
                <Grid container alignItems={"stretch"} spacing={2}>
                    {
                        this.state.gameslist.map((game,index)=>
                            <FindGameElements handleGameClick={this.handleGameClick} game={game} highscores={this.state.highscoreslist[index]} highscore={this.state.highscoreslist[index][0]}/>
                        )
                    }
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadMoreItems.bind(this)}
                        hasMore={this.state.hasMore}
                        loader={<Grid item alignItems="center" justify="center" xs={12}><CircularProgress style={{textAlign: 'center',alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}} size={40} color="secondary" /></Grid>}
                        threshold={200}
                        >
                    </InfiniteScroll>
                    {this.hasMore()}
                </Grid>
            </div>
        )
    }


}

export default withStyles(styles)(FindGame);