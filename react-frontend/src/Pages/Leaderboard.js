import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody
} from "@material-ui/core";
import useStyles from "../Material-UI/themes";
import {FaCrown} from "react-icons/fa";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

const gamepanel = () => {
    return {
        width: '100%',
        paddingTop: '40px',
        paddingLeft: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '0px' : '40px',
        margin: '0 auto',
        align: 'center',
    }
}

export default function Leaderboard(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [puzzleRushTabValue, setPuzzleRushTabValue] = React.useState(0);
    const [puzzleRushDifficultyValue, setPuzzleRushDifficultyValue] = React.useState("easy");
    const [puzzleRushDifficultyLabel, setPuzzleRushDifficultyLabel] = React.useState("Easy");
    const [puzzleRushCurrentScoreList, setPuzzleRushCurrentScoreList] = React.useState(props.puzzle_rush_leaderboard.easyrandomscore);
    const [puzzleRushCurrentUserList, setPuzzleRushCurrentUserList] = React.useState(props.puzzle_rush_leaderboard.easyrandomusername);

    const handlePuzzleRushTabChange = (event, newValue) => {
        setPuzzleRushTabValue(newValue);
    };

    const handlePuzzleRushDifficultyChange = (value, label) => {
        setPuzzleRushDifficultyValue(value)
        setPuzzleRushDifficultyLabel(label)
        setAnchorEl(null)
    }

    React.useEffect(() => {
        updatePuzzleRushList()
    }, [puzzleRushTabValue, puzzleRushDifficultyValue])

    const updatePuzzleRushList = () => {
        if (puzzleRushTabValue === 0) {
            if (puzzleRushDifficultyValue === "easy") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.easyrandomscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.easyrandomusername)
            } else if (puzzleRushDifficultyValue === "medium") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.mediumrandomscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.mediumrandomusername)
            } else if (puzzleRushDifficultyValue === "hard") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.hardrandomscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.hardrandomusername)
            } else {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.exhardrandomscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.exhardrandomusername)
            }
        } else if (puzzleRushTabValue === 1) {
            if (puzzleRushDifficultyValue === "easy") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.easyclassicscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.easyclassicusername)
            } else if (puzzleRushDifficultyValue === "medium") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.mediumclassicscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.mediumclassicusername)
            } else if (puzzleRushDifficultyValue === "hard") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.hardclassicscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.hardclassicusername)
            } else {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.exhardclassicscore)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.exhardclassicusername)
            }
        } else {
            if (puzzleRushDifficultyValue === "easy") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.easyclassicv2score)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.easyclassicv2username)
            } else if (puzzleRushDifficultyValue === "medium") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.mediumclassicv2score)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.mediumclassicv2username)
            } else if (puzzleRushDifficultyValue === "hard") {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.hardclassicv2score)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.hardclassicv2username)
            } else {
                setPuzzleRushCurrentScoreList(props.puzzle_rush_leaderboard.exhardclassicv2score)
                setPuzzleRushCurrentUserList(props.puzzle_rush_leaderboard.exhardclassicv2username)
            }
        }
    }

    return (
        <div style={gamepanel()}>
            <Grid container spacing={4}>
                <Grid item xs={12} justify={"center"} alignItems={"center"}>
                    <Typography className={classes.titlehome} variant="h3">Leaderboards</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Typography className={classes.titledailyroto} variant="h5">Find Game</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell align={"right"}>Crowns</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.findGame_leaderboard.map((entry,index) =>
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{entry.username}</TableCell>
                                            <TableCell align={"right"}>{entry.Crowns} <FaCrown/></TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Typography className={classes.titledailyroto} variant="h5">Daily Challenge</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell align={"right"}>Crowns</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dailyChallenge_leaderboard.map((entry,index) =>
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{entry.username}</TableCell>
                                            <TableCell align={"right"}>{entry.Crowns} <FaCrown/></TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <div style={{width: "100%", display: "inline-flex"}}>
                        <Typography style={{flexGrow: 1}} className={classes.titledailyroto} variant="h5">Puzzle Rush</Typography>
                        <Button
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            variant="contained"
                            color="secondary"
                            style={{height: "20%"}}
                        >
                            {puzzleRushDifficultyLabel}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={() => handlePuzzleRushDifficultyChange("easy", "Easy")}>Easy</MenuItem>
                            <MenuItem onClick={() => handlePuzzleRushDifficultyChange("medium", "Medium")}>Medium</MenuItem>
                            <MenuItem onClick={() => handlePuzzleRushDifficultyChange("hard", "Hard")}>Hard</MenuItem>
                            <MenuItem onClick={() => handlePuzzleRushDifficultyChange("extra_hard", "Extra Hard")}>Extra Hard</MenuItem>
                        </Menu>
                    </div>
                    <Paper square>
                        <Tabs
                            value={puzzleRushTabValue}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handlePuzzleRushTabChange}
                            aria-label="disabled tabs example"
                            variant={"fullWidth"}
                        >
                            <Tab label="Random" />
                            <Tab label="Classic"/>
                            <Tab label="Classic V2" />
                        </Tabs>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell align={"right"}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    puzzleRushCurrentUserList.map((userName,index) =>
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{userName}</TableCell>
                                            <TableCell align={"right"}>{puzzleRushCurrentScoreList[index]}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
