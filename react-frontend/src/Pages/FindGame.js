import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FindGameElements from '../containers/FindGameElements'
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
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
        var gameslist = window.gameslist;
        var highscoreslist = window.highscoreslist;
        console.log(gameslist);
        console.log(highscoreslist);
        this.state = {
            gameslist: gameslist,
            highscoreslist: highscoreslist,
            anchorEl: null
        }
    }

    handleGameClick = (name,gamedata,highscores,uri) => {
        this.props.handleGameClick(name,gamedata,highscores,uri);
    };

    handleFilterMenuOpen = event => {
        this.setState( {
          anchorEl: event.currentTarget
      });
    };

    handleCloseFilterMenu = event => {
        this.setState( {
            anchorEl: null
        })
    };

    handleSearchSubmit = event => {
        var searchTerm = this.searchRef.value;
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
        const  { classes } = this.props;
        return (
            <div id={'GameMain'}>
                <Paper component="form" className={classes.root} >
                    <InputBase
                        className={classes.input}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={ref => this.searchRef = ref}
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
                        <MenuItem onClick={this.handleCloseFilterMenu}>Most Popular</MenuItem>
                        <MenuItem onClick={this.handleCloseFilterMenu}>Hottest</MenuItem>
                        <MenuItem onClick={this.handleCloseFilterMenu}>Newest</MenuItem>
                    </Menu>
                </Paper>
                <br/>
                <Grid container alignItems={"stretch"} spacing={2}>
                    {
                        this.state.gameslist.map((game,index)=>
                            <FindGameElements handleGameClick={this.handleGameClick} game={game} highscores={this.state.highscoreslist[index]} highscore={this.state.highscoreslist[index][0]}/>
                        )
                    }
                </Grid>
            </div>
        )
    }


}

export default withStyles(styles)(FindGame);