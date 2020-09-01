import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import {Project, Words, Button} from 'arwes';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const divStyle = () => {
    return ({
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            margin: '0 auto',
            top: '25%',
        });
}

class PuzzleRushDifficultyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            value: 'classic v2',
        }
    }

    handleClose = () => {
        this.props.show = false;
    };

    handleClickPuzzleRushModal = (difficulty) => {
        console.log(difficulty)
        axios.post('/puzzlerush', {difficulty: difficulty, action: 'start',type: this.state.value})
                .then( res => {
                        var games = JSON.parse(res.data.games);
                        var p_id = res.data.p_id;
                        this.setState({
                            isLoading: false,
                        });
                        this.props.handleClickPuzzleRush(difficulty,games,p_id);
                });
    };

    handleClickEasyPuzzleRush = (event) => {
        event.preventDefault();
        this.handleClickPuzzleRushModal('easy',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickMediumPuzzleRush = (event) => {
        event.preventDefault();
        this.handleClickPuzzleRushModal('medium',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickHardPuzzleRush = (event) => {
        event.preventDefault();
        this.handleClickPuzzleRushModal('hard',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickExHardPuzzleRush = (event) => {
        event.preventDefault();
        this.handleClickPuzzleRushModal('Exteremly Hard',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleChange = (event) => {
        this.setState(
            {value: event.target.value}
        )
    }


    render () {
        return (<div style={divStyle()}>
                  <Project animate header="Select a Difficulty">
                    {(anim) => (
                      <p>
                        {this.state.isLoading ? (
                          <Grid
                            container
                            xs={12}
                            spacing={4}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            wrap="nowrap"
                          >
                            <div style={divStyle()}>
                              <CircularProgress />
                            </div>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            xs={12}
                            spacing={4}
                            alignItems="center"
                            justify="center"
                            wrap="nowrap"
                          >
                            <Grid item xs={6}>
                              <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group"
                              >
                                <Button
                                  animate
                                  onClick={this.handleClickEasyPuzzleRush}
                                  variant="contained"
                                  color="primary"
                                >
                                  Easy
                                </Button>
                                <Button
                                  animate
                                  onClick={this.handleClickMediumPuzzleRush}
                                  variant="contained"
                                  color="primary"
                                >
                                  Medium
                                </Button>
                                <Button
                                  animate
                                  onClick={this.handleClickHardPuzzleRush}
                                  variant="contained"
                                  color="primary"
                                >
                                  Hard
                                </Button>
                                <Button
                                  animate
                                  onClick={this.handleClickExHardPuzzleRush}
                                  variant="contained"
                                  color="primary"
                                >
                                  Exteremely Hard
                                </Button>
                              </ButtonGroup>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Game Type</FormLabel>
                                <RadioGroup
                                  aria-label="game type"
                                  name="gametype"
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                >
                                  <FormControlLabel
                                    value="classic v2"
                                    control={<Radio />}
                                    label="Classic V2"
                                  />
                                  <FormControlLabel
                                    value="classic"
                                    control={<Radio />}
                                    label="Classic"
                                  />
                                  <FormControlLabel
                                    value="random"
                                    control={<Radio />}
                                    label="Random"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                        )}
                        <DialogActions>
                          <Button animate onClick={this.props.backButton}>
                            Back
                          </Button>
                        </DialogActions>
                      </p>
                    )}
                  </Project>
                </div>
        )
    };


}

export default PuzzleRushDifficultyModal;

