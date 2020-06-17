import React from 'react';
import Game from '../containers/Game';
import GameListItemView from '../components/GameListItemView';
import SearchBarFindGame from '../components/SearchBarFindGame';
import FindGameElements from '../containers/FindGameElements'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../Material-UI/themes';


export default function ProfilePage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
            <div id={'GameMain'}>
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid item xs={4}>
                        <Typography variant="h3">Your Created Games:</Typography>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography className={classes.heading}>General settings</Typography>
                              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                              </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h3">Your Highscores:</Typography>
                        <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel5bh-content"
                              id="panel5bh-header"
                            >
                              <Typography className={classes.heading}>General settings</Typography>
                              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                              </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h3">Puzzle Rush Data:</Typography>
                        <ExpansionPanel expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel9bh-content"
                              id="panel9bh-header"
                            >
                              <Typography className={classes.heading}>General settings</Typography>
                              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                maximus est, id dignissim quam.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
    )
}