import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import CasinoIcon from '@material-ui/icons/Casino';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import CreateGame from './Pages/CreateGame';
import FindGame from './Pages/FindGame';
import PlayGame from './Pages/PlayGame';
import Home from './Pages/Home';
import LoginModal from './containers/Modals/LoginModal';
import LoggedInUser from './components/LoggedInUser';
import SignInButton from './components/SignInButton';
import axios from 'axios';
import Game from './containers/Game';
import withStyles from "@material-ui/core/styles/withStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from "@material-ui/core/Badge";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import WarningIcon from '@material-ui/icons/Warning'
import ExtensionIcon from '@material-ui/icons/Extension';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {MOBILE_INNER_SCREEN_WIDTH} from "./constants/constants";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import PuzzleRushDifficultyModal from "./containers/Modals/PuzzleRushDifficultyModal";
import RandomGameDifficultyModal from "./containers/Modals/RandomGameDifficultyModal";
import ProfilePage from "./Pages/ProfilePage";
import RandomGamePage from "./Pages/RandomGamePage";
import PuzzleRushPage from "./Pages/PuzzleRushPage";

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'inline-flex',
        justifyContent: 'space-between',
    },
    drawerHeaderRight: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerHeaderLeft: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    darkmode: {
          body: '#363537',
          text: '#FAFAFA',
          toggleBorder: '#6B8096',
          gradient: 'linear-gradient(#091236, #1E215D)',
    },
});



class App extends React.Component {

    constructor(props) {
        super(props);
        if (window.uri === '') {
            this.state = {
                PageSelected: <Home handleClickRandomGame={this.handleClickRandomGame} handleClickLearnGame={this.handleClickLearnGame} handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame} handleClickPuzzleRush={this.handleClickPuzzleRush}/>, //default page for website
            };
        }
        else {
            this.state = {
                PageSelected: <PlayGame name={window.token.name} gamedata={window.token.puzzledata} highscores={window.highscores} uri={window.uri}/>, //when uri is entered to play specific game
            };
        }
        this.state.open = true;
        this.state.mobileAnchorEl = null;
        this.state.mobileMenuOpen = false;
        this.state.showLoginModal = false;
        this.state.showPuzzleRushModal = false;

        if (window.loggedin === 'Yes') {
            this.state.gamesview = window.gamesview;
            this.state.solutionsview = window.solutionsview;
            this.state.puzzlerushview = window.puzzlerushview;
        }
    }

    handleDrawerClose = () => {
        this.setState( {
            open: false
        })
    };

    handleDrawerOpen = () => {
        this.setState( {
            open: true
        })
    };

    SignInButtonPressed = (type) => {
        if (type === 'Sign in') {
            this.setState({
                showLoginModal: true
            });
        }
        else {
            window.location.href = "/auth/logout";
        }
    };

    handleClickRandomGameModal = (game,difficulty) => {
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            showRandomGameModal: false,
            PageSelected: <RandomGamePage randomGame={'Yes'} game={game} difficulty={difficulty}/>,
            open: isOpen,
        });
    }

    handleClickRandomGame = (event) => {
        event.preventDefault();
        this.setState({
            showRandomGameModal: true,
        });
    }


    handleClickPuzzleRush = event => {
        event.preventDefault();
        this.setState({
            showPuzzleRushModal: true,
        });
    };


    handleClickPuzzleRushModal = (difficulty,games,p_id) => {
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            showPuzzleRushModal: false,
            PageSelected: <PuzzleRushPage puzzleRush={'Yes'} games={games} p_id={p_id} difficulty={difficulty}/>,
            open: isOpen
        });
    };

    closeLoginModal = event => {
        event.preventDefault();
        this.setState({
            showLoginModal: false
        });
    };

    closePuzzleRushLoginModal = event => {
        event.preventDefault();
        this.setState({
            showPuzzleRushModal: false
        });
    }

    closeRandomGameLoginModal = event => {
        event.preventDefault();
        this.setState({
            showRandomGameModal: false
        });
    }

    handleGameClick = (name, gamedata,highscores,uri) => {
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <PlayGame name={name} highscores={highscores} gamedata={gamedata} uri={uri}/>,
            open: isOpen
        });
    };

    handleClickCreateGame = event => {
        event.preventDefault();
        var newGame = <CreateGame state={"new"}/>; //KNOWN bug where if you create a game you have to refresh the page to cause a re-render of <CreateGame/>

        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: newGame, //if selected page is already CreateGame it wont refresh known problem
            open: isOpen
        });
    };


    handleClickProfile = event => {
        event.preventDefault();
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        if (window.loggedin === 'Yes') {
            this.setState({
                PageSelected: <ProfilePage handleClickPlayGame={this.handleGameClick} gamesview={this.state.gamesview} solutionsview={this.state.solutionsview} puzzlerushview={this.state.puzzlerushview}/>,
                open: isOpen
            });
        }
        else {
            this.SignInButtonPressed('Sign in');
        }
    };


    handleClickFindGame = event => {
        event.preventDefault();
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <FindGame handleGameClick={this.handleGameClick}/>,
            open: isOpen
        });
    };

    handleClickLearnGame = event => {
        event.preventDefault();
        var isOpen = true;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        console.log(window.learngameslist);
        this.setState({
            PageSelected: <Game learnMode={'Yes'} games={window.learngameslist}/>,
            open: isOpen
        });

    };

    handleMobileMenuClose = () => {
        this.setState({
            mobileAnchorEl: null,
            mobileMenuOpen: false
        });
    };


    handleMobileMenuOpen = (event) => {
        this.setState({
            mobileAnchorEl: event.currentTarget,
            mobileMenuOpen: true
        });
    };

    render() {
        const { classes } = this.props;
        const theme = createMuiTheme({
            palette: {
                primary: teal,
                secondary: {
                    main: '#e65100',
                },
            }
        });
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                     >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title} noWrap>
                                <a href="/" style={{color: 'white'}}>RobotsEvolved
                                    <span>.com</span>
                                </a>
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <LoggedInUser/>
                                <IconButton aria-label="show 2 new notifications" color="inherit">
                                    <Badge badgeContent={2} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={"primary-search-account-menu-mobile"}
                                    aria-haspopup="true"
                                    onClick={this.handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Menu
                        anchorEl={this.state.mobileAnchorEl}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        id={"primary-search-account-menu-mobile"}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={this.state.mobileMenuOpen}
                        onClose={this.handleMobileMenuClose}
                    >
                        <MenuItem>
                            <LoggedInUser/>
                        </MenuItem>
                        <MenuItem>
                            <p>Notifications</p>
                            <IconButton aria-label="show 11 new notifications" color="inherit">
                                <Badge badgeContent={11} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </MenuItem>
                    </Menu>
                    <Drawer
                        id="MainDrawer"
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <div className={classes.drawerHeaderLeft}>
                                <SignInButton onClick={this.SignInButtonPressed}/>
                            </div>
                            <div className={classes.drawerHeaderRight}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {useTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Play
                        </Typography>
                        <List>
                            <ListItem button key={'Create a Game'} onClick={this.handleClickCreateGame}>
                                <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                                <ListItemText primary={'Create a Game'} />
                            </ListItem>
                            <ListItem button key={'Find a Game'} onClick={this.handleClickFindGame}>
                                <ListItemIcon><SearchIcon /></ListItemIcon>
                                <ListItemText primary={'Find a Game'} />
                            </ListItem>
                            <ListItem button key={'Random Game'} onClick={this.handleClickRandomGame}>
                                <ListItemIcon><CasinoIcon /></ListItemIcon>
                                <ListItemText primary={'Random Game'} />
                            </ListItem>
                            <ListItem button key={'Puzzle Rush'} onClick={this.handleClickPuzzleRush}>
                                <ListItemIcon><ExtensionIcon /></ListItemIcon>
                                <ListItemText primary={'Puzzle Rush'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Learn
                        </Typography>
                        <List>
                            <ListItem button key={'Lessons'} onClick={this.handleClickLearnGame}>
                                <ListItemIcon><SchoolIcon /></ListItemIcon>
                                <ListItemText primary={'Lessons'} />
                            </ListItem>
                            <ListItem button key={'Starter Puzzles'}>
                                <ListItemIcon><WarningIcon /></ListItemIcon>
                                <ListItemText primary={'Starter Puzzles'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Community
                        </Typography>
                        <List>
                            <ListItem button key={'Profile'} onClick={this.handleClickProfile}>
                                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>
                            <ListItem button key={'Teams'}>
                                <ListItemIcon><WarningIcon /></ListItemIcon>
                                <ListItemText primary={'Teams'} />
                            </ListItem>
                            <ListItem button key={'Forum'}>
                                <ListItemIcon><WarningIcon /></ListItemIcon>
                                <ListItemText primary={'Forum'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <Typography
                            className={classes.dividerFullWidth}
                            color="textSecondary"
                            display="block"
                            variant="caption"
                        >
                            Tools
                        </Typography>
                        <List>
                            <ListItem button key={'About Us'}>
                                <ListItemIcon><InfoIcon /></ListItemIcon>
                                <ListItemText primary={'About Us'} />
                            </ListItem>
                            <ListItem button key={'Settings'}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary={'Settings'} />
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}>
                        <div className={classes.drawerHeader} />
                        {this.state.PageSelected}
                    </main>
                    <LoginModal closeLoginModal={this.closeLoginModal} show={this.state.showLoginModal}/>
                    <PuzzleRushDifficultyModal
                        closeModal={this.closePuzzleRushLoginModal}
                        show={this.state.showPuzzleRushModal}
                        handleClickPuzzleRush={this.handleClickPuzzleRushModal}
                    />
                    <RandomGameDifficultyModal
                        closeModal={this.closeRandomGameLoginModal}
                        show={this.state.showRandomGameModal}
                        handleClickRandomGame={this.handleClickRandomGameModal}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(useStyles)(App);
