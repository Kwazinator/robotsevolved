import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import CasinoIcon from '@material-ui/icons/Casino';
import TodayIcon from '@material-ui/icons/Today';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Leaderboard from './Pages/Leaderboard';
import clsx from 'clsx';
import CreateGame from './Pages/CreateGame';
import FindGame from './Pages/FindGame';
import PlayGame from './Pages/PlayGame';
import Home from './Pages/Home';
import WeeklyChallengePage from './Pages/WeeklyChallengePage';
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
import BrushIcon from '@material-ui/icons/Brush';
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
import LessonsPage from "./Pages/LessonsPage";
import DailyChallengePage from "./Pages/DailyChallenge";
import AboutUs from "./Pages/AboutUs";
import DailyChallengeHistory from "./Pages/DailyChallengeHistory";
import DailyChallengeHistoryAnswersPage from "./Pages/DailyChallengeHistoryAnswersPage";
import { FaMedal } from 'react-icons/fa';
import TimerIcon from '@material-ui/icons/Timer';
import LoadingPage from './components/LoadingPage';
import ChatIcon from '@material-ui/icons/Chat';
import Popover from "@material-ui/core/Popover";
import {GiPuzzle,GiPodium} from "react-icons/gi";


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
    toolbar1: {
        backgroundColor: '#14A76C',
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
                PageSelected: <Home handleClickDailyChallenge={this.handleClickDailyChallenge} handleClickRandomGame={this.handleClickRandomGame} handleClickLearnGame={this.handleClickLearnGame} handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame} handleClickPuzzleRush={this.handleClickPuzzleRush}/>,
                dailychallengehistoryloaded: false,
                profileDataloaded: false,
            };
        }
        else {
            if (window.token.g_id == undefined) {
                const linedir = window.loggedin === 'No' ? true : window.userInfo.LineDirFlag === 'Y';
                this.state = {
                    PageSelected: <PlayGame handleLineDirections={this.handleLineDirections} LineDirections={linedir} name={window.token.name} gamedata={window.token.puzzledata} highscores={window.highscores} uri={window.uri} authorname={window.token.authorname} votes={window.token.votes} hasVoted={window.token.hasVoted} signInModalOpen={this.SignInButtonPressed}/>, //when uri is entered to play specific game
                    dailychallengehistoryloaded: false,
                    profileDataloaded: false,
                };
            }
            else {
                const linedir = window.loggedin === 'No' ? true : window.userInfo.LineDirFlag === 'Y';
                this.state = {
                    PageSelected: <RandomGamePage handleLineDirections={this.handleLineDirections} LineDirections={linedir} randomGame={'Yes'} game={window.token} difficulty={window.token.g_difficulty}/>,
                    dailychallengehistoryloaded: false,
                    profileDataloaded: false,
                }
            }
        }
        this.state.openChat = false;
        this.state.chatAnchor = null;
        this.state.open = window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? false : true;
        this.state.mobileAnchorEl = null;
        this.state.mobileMenuOpen = false;
        this.state.showLoginModal = false;
        this.state.showPuzzleRushModal = false;
        this.state.loadingPage = false;
        this.state.filterTerm = 'None'
        this.state.searchTerm = ''
        this.state.findWindowHeight = 0;
        this.state.numFindGames = window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? 8 : 20;
         if (window.loggedin === 'Yes') {
            this.state.LineDirections = window.userInfo.LineDirFlag === 'Y';
         }
         else {
            this.state.LineDirections = true;
         }
    }

    handleChatOpen = (event) => {
        this.setState({
            openChat: true,
            chatAnchor: event.currentTarget
        })
    };

    handleChatClose = () => {
      this.setState({
          openChat: false
      })
    };

    handleDrawerClose = () => {
        this.setState( {
            open: false
        })
    };

    handleLineDirections = (boolean) => {
        if (window.loggedin === 'Yes') {
            axios.post('/settingsChange', {LineDirections: boolean ? 'Y' : 'N'})
                .then( res => {
                    console.log('changed');
                });
        }
        this.setState({
            LineDirections: boolean
        });
    };

    handleClickDailyChallenge = () => {
        this.state.loadingPage = true;
        axios.get('/getDailyChallengeData')
            .then( res => {
                    var isOpen = this.state.open;
                    if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                        isOpen = false
                    }
                    const dc_movesList = res.data.dc_movesList == null ? null : JSON.parse(res.data.dc_movesList)
                    const dc_playerList = res.data.dc_playerList == null ? null : JSON.parse(res.data.dc_playerList)
                    if (this.state.loadingPage) {
                        this.setState({
                                        PageSelected: <DailyChallengePage
                                                            handleClickDailyChallenge={this.handleClickDailyChallenge}
                                                            dailyChallengeGameslist={JSON.parse(res.data.dailyChallengeGameslist)}
                                                            dc_id={res.data.dc_id}
                                                            dchighscores={JSON.parse(res.data.dchighscores)}
                                                            handleLineDirections={this.handleLineDirections}
                                                            LineDirections={this.state.LineDirections}
                                                            savedMoves={dc_movesList}
                                                            playerStateList={dc_playerList}
                                        />,
                                        open: isOpen,
                                        loadingPage: false,
                                    });
                        }
                    });
        this.setState({
            PageSelected: <LoadingPage/>,
        });
    };

    handleDrawerOpen = () => {
        this.setState( {
            open: true
        });
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
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: null
        });
        this.setState({
            showRandomGameModal: false,
            PageSelected: <RandomGamePage handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections} randomGame={'Yes'} game={game} difficulty={difficulty}/>,
            open: isOpen,
            loadingPage: false,
        });
    };

    handleClickRandomGame = (event) => {
        event.preventDefault();
        this.setState({
            showRandomGameModal: true,
        });
    };


    handleClickPuzzleRush = event => {
        event.preventDefault();
        this.setState({
            showPuzzleRushModal: true,
        });
    };

    handleClickDailyChallengeHistory = (event) => {
        event.preventDefault();
        this.state.loadingPage = true;
        axios.get('/getDailyChallengeHistory')
            .then( res => {
                    var isOpen = this.state.open;
                    if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                        isOpen = false
                    }
                    var historydata = JSON.parse(res.data)
                    if (this.state.loadingPage) {
                        this.setState({
                            PageSelected: <DailyChallengeHistory handleDailyPuzzleHistoryClick={this.handleDailyPuzzleHistoryClick} dailychallengehistory={historydata}/>,
                            challengeHistoryData: historydata,
                            dailychallengehistoryloaded: true,
                            open: isOpen,
                            loadingPage: false,
                        });
                    }
            });
        this.setState({
            PageSelected: <LoadingPage/>,
        });
    };

    handleDailyPuzzleHistoryClick = history => {
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <DailyChallengeHistoryAnswersPage handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections} history={history}/>,
            open: isOpen,
            loadingPage: false,
        });
    };

    handleClickPuzzleRushModal = (difficulty,games,p_id) => {
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: null
        });
        this.setState({
            showPuzzleRushModal: false,
            PageSelected: <PuzzleRushPage handleClickPlayAgain={this.handleClickPuzzleRush} handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections} puzzleRush={'Yes'} games={games} p_id={p_id} difficulty={difficulty}/>,
            open: isOpen,
            loadingPage: false,
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
    };

    closeRandomGameLoginModal = event => {
        event.preventDefault();
        this.setState({
            showRandomGameModal: false
        });
    };

    handleGameClick = (name, gamedata, highscores, uri, authorname, votes, hasVoted) => {
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <PlayGame handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections} name={name} highscores={highscores} gamedata={gamedata} uri={uri} authorname={authorname} votes={votes} hasVoted={hasVoted} signInModalOpen={this.SignInButtonPressed}/>,
            open: isOpen,
            loadingPage: false,
        });
    };

    handleClickCreateGame = event => {
        event.preventDefault();
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <CreateGame handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections} state={"new"}/>,
             open: isOpen,
             loadingPage: false,
        });
    };


    handleClickProfile = event => {
        if (window.loggedin === 'Yes') {
            this.state.loadingPage = true;
                    axios.get('/getProfileData')
                        .then( res => {
                            var isOpen = this.state.open;
                            if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                                isOpen = false
                            }
                            var profileData = res.data;
                            var gamesview = JSON.parse(profileData.gamesview)
                            var solutionsview = JSON.parse(profileData.solutionsview)
                            var puzzlerushview = JSON.parse(profileData.puzzlerushview)
                            if (this.state.loadingPage) {
                                this.setState({
                                    PageSelected: <ProfilePage handleClickPlayGame={this.handleGameClick} gamesview={gamesview} solutionsview={solutionsview} puzzlerushview={puzzlerushview}/>,
                                    gamesview: gamesview,
                                    solutionsview: solutionsview,
                                    puzzlerushview: puzzlerushview,
                                    profileDataloaded: true,
                                    open: isOpen,
                                    loadingPage: false,
                                });
                            }
                        });
                    this.setState({
                        PageSelected: <LoadingPage/>,
                    });
                }
        else {
            this.SignInButtonPressed('Sign in');
        }
    };

    setNumFindGames = (num,filterTerm,searchTerm) => {
        this.setState({
            numFindGames: num,
            searchTerm: searchTerm,
            filterTerm: filterTerm,
        })
    }

    setFindWindow = height => {
        this.setState({
            findWindowHeight: height
        })
    }

    handleWeeklyClick = event => {
        this.state.loadingPage = true;
        axios.get('/getWCData')
            .then( res => {
                    console.log(res.data);
                    var isOpen = this.state.open;
                    if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                        isOpen = false
                    }
                    const wc_movesList = res.data.wc_movesList == null ? null : JSON.parse(res.data.wc_movesList)
                    const wc_playerList = res.data.wc_playerList == null ? null : JSON.parse(res.data.wc_playerList)
                    if (this.state.loadingPage) {
                        this.setState({
                                        PageSelected: <WeeklyChallengePage
                                                            handleWeeklyClick={this.handleWeeklyClick}
                                                            weeklyChallengeGameslist={JSON.parse(res.data.weeklyChallengeGameslist)}
                                                            wc_id={res.data.wc_id}
                                                            wchighscores={JSON.parse(res.data.wchighscores)}
                                                            handleLineDirections={this.handleLineDirections}
                                                            LineDirections={this.state.LineDirections}
                                                            savedMoves={wc_movesList}
                                                            playerStateList={wc_playerList}
                                        />,
                                        open: isOpen,
                                        loadingPage: false,
                                    });
                        }
                    });
        this.setState({
            PageSelected: <LoadingPage/>,
        });
    };

    handleClickFindGame = event => {
        event.preventDefault();
        this.state.loadingPage = true;
        axios.post('/search', {search: this.state.searchTerm, filter: this.state.filterTerm, offset: 0, numGames: this.state.numFindGames})
            .then( res => {
                const gameslist = JSON.parse(res.data.gameslist);
                const highscoreslist = JSON.parse(res.data.highscoreslist);
                var isOpen = this.state.open;
                if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                    isOpen = false
                }
                if (this.state.loadingPage) {
                    this.setState({
                        PageSelected: <FindGame findWindowHeight={this.state.findWindowHeight} setFindWindow={this.setFindWindow} setNumFindGames={this.setNumFindGames} gameslist={gameslist} highscoreslist={highscoreslist} handleGameClick={this.handleGameClick}/>,
                        open: isOpen,
                        loadingPage: false,
                    });
                }
        });
        this.setState({
            PageSelected: <LoadingPage/>,
        });
    };

    handleHomePageClick = () => {
        this.setState({
            PageSelected: <Home handleClickDailyChallenge={this.handleClickDailyChallenge} handleClickRandomGame={this.handleClickRandomGame} handleClickLearnGame={this.handleClickLearnGame} handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame} handleClickPuzzleRush={this.handleClickPuzzleRush}/>,
            loadingPage: false,
        });
    };


    handleClickWebsiteLeaderboard = event => {
        event.preventDefault();
        this.state.loadingPage = true;
        axios.get('/leaderboard')
            .then( res => {
                const dailyChallenge_leaderboard = res.data.dailyChallenge_leaderboard
                const findGame_leaderboard = res.data.findGame_leaderboard
                const puzzle_rush_leaderboard = res.data.puzzle_rush_leaderboard
                var isOpen = this.state.open;
                if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
                    isOpen = false
                }
                if (this.state.loadingPage) {
                    this.setState({
                        PageSelected: <Leaderboard
                                        dailyChallenge_leaderboard={dailyChallenge_leaderboard}
                                        findGame_leaderboard={findGame_leaderboard}
                                        puzzle_rush_leaderboard={puzzle_rush_leaderboard}
                                        />,
                        open: isOpen,
                        loadingPage: false,
                    });
                }
        });
        this.setState({
            PageSelected: <LoadingPage/>,
        });

    }

    handleClickAboutUs = event => {
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <AboutUs/>,
            open: isOpen,
            loadingPage: false,
        });
    };

    handleClickLearnGame = event => {
        event.preventDefault();
        var isOpen = this.state.open;
        if (window.innerWidth < MOBILE_INNER_SCREEN_WIDTH) {
            isOpen = false
        }
        this.setState({
            PageSelected: <LessonsPage handleLineDirections={this.handleLineDirections} LineDirections={this.state.LineDirections}/>,
            open: isOpen,
            loadingPage: false,
        });

    };

    handleMobileMenuClose = () => {
        this.setState({
            mobileAnchorEl: null,
            mobileMenuOpen: false
        });
    };

    showPage = () => {
        return(
            this.state.PageSelected
        )
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
                        <Toolbar className={classes.toolbar1}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <img onClick={this.handleHomePageClick} width={50} height={50} src="/static/images/logo150.png"/>
                            <Typography variant="h6" className={classes.title} noWrap>
                                <a href="/" style={{color: 'white'}}>RobotsEvolved
                                    <span>.com</span>
                                </a>
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <LoggedInUser handleClick={this.SignInButtonPressed}/>
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
                            <LoggedInUser handleClick={this.SignInButtonPressed}/>
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
                            <ListItem button key={'Find a Game'} onClick={this.handleClickFindGame}>
                                <ListItemIcon><SearchIcon /></ListItemIcon>
                                <ListItemText primary={'Find a Game'} />
                            </ListItem>
                            <ListItem button key={'Weekly 100'} onClick={this.handleWeeklyClick}>
                                <ListItemIcon><GiPuzzle /> </ListItemIcon>
                                <ListItemText primary={'Weekly 100'} />
                            </ListItem>
                            <ListItem button key={'Daily Challenge'} onClick={this.handleClickDailyChallenge}>
                                <ListItemIcon><TodayIcon /></ListItemIcon>
                                <ListItemText primary={'Daily Challenge'} />
                            </ListItem>
                            <ListItem button key={'Create a Game'} onClick={this.handleClickCreateGame}>
                                <ListItemIcon><BrushIcon /></ListItemIcon>
                                <ListItemText primary={'Create a Game'} />
                            </ListItem>
                            <ListItem button key={'Random Game'} onClick={this.handleClickRandomGame}>
                                <ListItemIcon><CasinoIcon /></ListItemIcon>
                                <ListItemText primary={'Random Game'} />
                            </ListItem>
                            <ListItem button key={'Puzzle Rush'} onClick={this.handleClickPuzzleRush}>
                                <ListItemIcon><TimerIcon /></ListItemIcon>
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
                            <ListItem button key={'Daily Challenge History'} onClick={this.handleClickDailyChallengeHistory}>
                                <ListItemIcon><FaMedal /></ListItemIcon>
                                <ListItemText primary={'Daily Challenge History'} />
                            </ListItem>
                            <ListItem button key={'Website Leaderboard'} onClick={this.handleClickWebsiteLeaderboard}>
                                <ListItemIcon><GiPodium /></ListItemIcon>
                                <ListItemText primary={'Website Leaderboard'} />
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
                            <ListItem button key={'About'} onClick={this.handleClickAboutUs}>
                                <ListItemIcon><InfoIcon /></ListItemIcon>
                                <ListItemText primary={'About'} />
                            </ListItem>
                            <ListItem button key={'Dark Mode'} onClick={this.props.handleClickDarkMode}>
                                <ListItemIcon><Brightness6Icon /></ListItemIcon>
                                <ListItemText primary={'Space Mode (Beta)'} />
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}>
                        <div className={classes.drawerHeader} />
                        {this.showPage()}
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
                <div style={{position: "fixed", bottom: "10px", right: "10px"}}>
                    <IconButton
                        style = {{backgroundColor: "#14a76c"}}
                        onClick={this.handleChatOpen}
                    >
                        <ChatIcon />
                    </IconButton>
                    <Popover
                        open={this.state.openChat}
                        anchorEl={this.state.chatAnchor}
                        onClose={this.handleChatClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                    >
                        <iframe
                            src="https://titanembeds.com/embed/740127738345554021?css=140&username=guest&defaultchannel=740270339900178583"
                            height= {window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? (parseInt(window.innerHeight/2)) + '': "600"}
                            width= {window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? (window.innerWidth - 40) + '': "400"}
                            frameBorder="0"
                        />
                    </Popover>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(useStyles)(App);
