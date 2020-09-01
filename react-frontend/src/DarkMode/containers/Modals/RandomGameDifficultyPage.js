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
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {Project, Words, Button} from 'arwes';
import FormLabel from '@material-ui/core/FormLabel';
import {MOBILE_INNER_SCREEN_WIDTH} from "../../constants/constants";

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

class RandomGameDifficultyPage extends React.Component {

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

    handleClickRandomGameModal = (difficulty,type) => {
        axios.get('/randomgame?difficulty=' + difficulty + '&type=' + type)
            .then( res => {
                var game = JSON.parse(res.data.game);
                this.setState({
                    isLoading: false,
                });
                this.props.handleClickRandomGame(game,difficulty);
            })
    }

    handleClickEasy = event => {
        event.preventDefault();
        this.handleClickRandomGameModal('easy',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickMedium = event => {
        event.preventDefault();
         this.handleClickRandomGameModal('medium',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickHard = event => {
        event.preventDefault();
         this.handleClickRandomGameModal('hard',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickExHard = event => {
        event.preventDefault();
        this.handleClickRandomGameModal('Exteremly Hard',this.state.value)
        this.setState({
            isLoading: true
        })
    }

    handleClickGodMode = event => {
        event.preventDefault();
        this.handleClickRandomGameModal('GodTeir',this.state.value)
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
                                  <Button animate
                                    onClick={this.handleClickEasy}
                                  >
                                    Easy
                                  </Button>
                                  <Button animate
                                    onClick={this.handleClickMedium}
                                  >
                                    Medium
                                  </Button>
                                  <Button animate
                                    onClick={this.handleClickHard}
                                  >
                                    Hard
                                  </Button>
                                  <Button animate
                                    onClick={this.handleClickExHard}
                                  >
                                    Extremely Hard
                                  </Button>
                                  <Button animate
                                    onClick={this.handleClickGodMode}
                                  >
                                    God Tier
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
                          <Button animate onClick={this.props.backButton}>Back</Button>
                        </DialogActions>
                      </p>
                    )}
                  </Project>
                  </div>)
            }
}

export default RandomGameDifficultyPage;

