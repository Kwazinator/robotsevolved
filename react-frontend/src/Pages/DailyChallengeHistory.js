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



export default function DailyChallengeHistory(props) {
    const [expandedPanel, setExpandedPanel] = React.useState(false);
    const handleChangePanel = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    };
    const classes = useStyles();
    return (<div id={'GameMain'}>
                <Typography className={classes.titlehome} variant="h3">Daily Challenge History</Typography>
                {
                    props.dailychallengehistory.map((history, index) =>
                        <ExpansionPanel expanded={expandedPanel === 'panelgame' + index} onChange={handleChangePanel('panelgame' + index)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={"panel" + index + "-content"}
                                id={"panel" + index + "-header"}
                            >
                                <Typography className={classes.heading}>{history.created}</Typography>
                                <Typography className={classes.secondaryHeading}>Winner: {history.nameSubmitted}</Typography>
                                <ShowDailyPuzzleHistory history={history} handleDailyPuzzleHistoryClick={props.handleDailyPuzzleHistoryClick}/>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <FaCrown/> {history.nameSubmitted} - {history.scoreSubmitted} <FaCrown/>
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>Lowest possible solution: {history.bestScore}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }
           </div>
    )
}