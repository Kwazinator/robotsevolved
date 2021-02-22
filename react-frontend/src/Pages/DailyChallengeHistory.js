import React from 'react';
import Game from '../containers/Game';
import useStyles from '../Material-UI/themes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FaCrown } from 'react-icons/fa';
import ShowDailyPuzzleHistory from '../components/ShowDailyPuzzleHistory';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ProfilePageCreatedGamesDetails from "../components/ProfilePageComponents/ProfilePageCreatedGamesDetails";
import {MOBILE_INNER_SCREEN_WIDTH} from "../constants/constants";

const gamepanel = () => {
    return {
        width: '100%',
        paddingTop: '40px',
        paddingLeft: window.innerWidth < MOBILE_INNER_SCREEN_WIDTH ? '0px' : '40px',
        margin: '0 auto',
        align: 'center',
    }
}

export default function DailyChallengeHistory(props) {
    const [expandedPanel, setExpandedPanel] = React.useState(false);
    const handleChangePanel = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };
    const classes = useStyles();
    return (<div style={gamepanel()}>
                <Typography className={classes.titlehome} variant="h3">Daily Challenge History</Typography>
                {
                    props.dailychallengehistory.map((history, index) =>
                        <ExpansionPanel expanded={expandedPanel === 'panelgame' + index} onChange={handleChangePanel('panelgame' + index)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={"panel" + index + "-content"}
                                id={"panel" + index + "-header"}
                            >
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography className={classes.heading}>{history.created}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography noWrap style={{marginLeft: 5, marginRight: 5}} className={classes.secondaryHeading}>{history.nameSubmitted}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <ShowDailyPuzzleHistory history={history} handleDailyPuzzleHistoryClick={props.handleDailyPuzzleHistoryClick}/>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={3}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <FaCrown/> {history.nameSubmitted} - {history.scoreSubmitted} <FaCrown/>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography className={classes.secondaryHeading}>Lowest possible solution: {history.bestScore}</Typography>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }
           </div>
    )
}
