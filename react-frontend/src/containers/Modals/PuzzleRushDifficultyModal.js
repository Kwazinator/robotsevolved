import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
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
import FormLabel from '@material-ui/core/FormLabel';


const divStyle = () => {
    return ({
            display: 'flex',
            marginTop: '50px',
            marginBottom: '50px'
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
        return (
            <Dialog onClose={this.props.closeModal}
                    aria-labelledby="customized-dialog-title-2"
                    open={this.props.show}
                    maxWidth={"xs"}
                    fullWidth={true}
                    onBackdropClick={this.props.closeModal}
            >
                <DialogTitle id="customized-dialog-title-2" onClose={this.handleClose}>Select a Difficulty</DialogTitle>
                <DialogContent dividers>
                                {this.state.isLoading ? (
                                    <Grid
                                        container xs={12}
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
                                        container xs={12}
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
                                            <Button onClick={this.handleClickEasyPuzzleRush} variant="contained" color="primary">
                                                Easy
                                            </Button>
                                            <Button onClick={this.handleClickMediumPuzzleRush} variant="contained" color="primary">
                                                Medium
                                            </Button>
                                            <Button onClick={this.handleClickHardPuzzleRush} variant="contained" color="primary">
                                                Hard
                                            </Button>
                                            <Button onClick={this.handleClickExHardPuzzleRush} variant="contained" color="primary">
                                                Exteremely Hard
                                            </Button>
                                          </ButtonGroup>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl component="fieldset">
                                              <FormLabel component="legend">Game Type</FormLabel>
                                              <RadioGroup aria-label="game type" name="gametype" value={this.state.value} onChange={this.handleChange}>
                                                <FormControlLabel value="classic v2" control={<Radio />} label="Classic V2" />
                                                <FormControlLabel value="classic" control={<Radio />} label="Classic" />
                                                <FormControlLabel value="random" control={<Radio />} label="Random" />
                                              </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                            )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    };


}

export default PuzzleRushDifficultyModal;

