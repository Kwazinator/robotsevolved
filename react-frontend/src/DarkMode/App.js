import React from 'react';
import Home from './Pages/Home';
import { Header, Project, Words, Button,ThemeProvider, createTheme, withStyles, Frame} from 'arwes';
import InfoIcon from '@material-ui/icons/Info';
import CasinoIcon from '@material-ui/icons/Casino';
import TodayIcon from '@material-ui/icons/Today';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import withStyles2 from "@material-ui/core/styles/withStyles";
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import CreateGame from './Pages/CreateGame';
import FindGame from './Pages/FindGame';
import PlayGame from './Pages/PlayGame';
import LoginModal from './containers/Modals/LoginModal';
import LoggedInUser from './components/LoggedInUser';
import SignInButton from './components/SignInButton';
import axios from 'axios';
import Game from './containers/Game';
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
import RandomGameDifficultyPage from "./containers/Modals/RandomGameDifficultyPage";
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
        backgroundColor: 'transparent',
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
        opacity: '1'
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



const MyColor = withStyles(theme => ({
    root: {
        width: 300,
        height: 120,
        transition: `background-color ${theme.animTime}ms ease-out`,
        backgroundColor: theme.color.primary.base,
    },
}))(props => (
    <div className={props.classes.root} />
));


class MyApp extends React.Component {
    constructor(props) {
        super(props);
        if (window.uri === '') {
            this.state = {
                PageSelected: <Home handleClickDailyChallengeHistory={this.handleClickDailyChallengeHistory} handleClickProfile={this.handleClickProfile} handleClickAbout={this.handleClickAboutUs} handleClickDailyChallenge={this.handleClickDailyChallenge} handleClickRandomGame={this.handleClickRandomGame} handleClickLearnGame={this.handleClickLearnGame} handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame} handleClickPuzzleRush={this.handleClickPuzzleRush}/>,
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
        this.state.open = window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? false : false;
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
        const color = '#1976d2';
        this.state.theme = this.getTheme(color);
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

    getTheme (color) {
        return createTheme({
            color: {
                primary: { base: color }
            }
        });
    }

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
            PageSelected: <RandomGameDifficultyPage
                                closeModal={this.closeRandomGameLoginModal}
                                show={this.state.showRandomGameModal}
                                handleClickRandomGame={this.handleClickRandomGameModal}
                                backButton={this.handleHomePageClick}
                            />,
        });
    };

    handleClickPuzzleRush = event => {
        event.preventDefault();
        this.setState({
            PageSelected:   <PuzzleRushDifficultyModal
                                closeModal={this.closePuzzleRushLoginModal}
                                show={this.state.showPuzzleRushModal}
                                handleClickPuzzleRush={this.handleClickPuzzleRushModal}
                                backButton={this.handleHomePageClick}
                            />,
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
            PageSelected: <Home handleClickDailyChallengeHistory={this.handleClickDailyChallengeHistory} handleClickProfile={this.handleClickProfile} handleClickAbout={this.handleClickAboutUs} handleClickDailyChallenge={this.handleClickDailyChallenge} handleClickRandomGame={this.handleClickRandomGame} handleClickLearnGame={this.handleClickLearnGame} handleClickCreateGame={this.handleClickCreateGame} handleClickFindGame={this.handleClickFindGame} handleClickPuzzleRush={this.handleClickPuzzleRush}/>,
            loadingPage: false,
        });
    };


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

    render () {
        const { color, theme } = this.state;
        const { classes } = this.props;
        const theme2 = createMuiTheme({
            palette: {
                primary: teal,
                secondary: {
                    main: '#e65100',
                },
            }
        });
        return (<MuiThemeProvider theme={theme2}>
            <ThemeProvider theme={theme}>
                asdf
            </ThemeProvider>
            </MuiThemeProvider>
        );
    }
}

export default withStyles2(useStyles)(MyApp);