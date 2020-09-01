import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';

class PuzzleRushWinModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.show = false;
    };

    render () {
        return (
            <Dialog onClose={this.props.closeModal}
                    aria-labelledby="customized-dialog-title-2"
                    open={this.props.show}
                    maxWidth={"xs"}
                    fullWidth={true}
                    onBackdropClick={this.props.closeModal}
            >
                <DialogTitle id="customized-dialog-title-2" onClose={this.handleClose}>Puzzle Rush - {this.props.difficulty}</DialogTitle>
                <DialogContent dividers>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6">
                            Statistics
                          </Typography>
                          <div>
                            <List dense={true}>

                                <ListItem>
                                  <ListItemText
                                    primary="Number of Puzzles Completed"
                                    secondary={this.props.numPuzzlesCompleted}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Average time Per Puzzle"
                                    secondary={this.props.averageTime}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Average Moves per Puzzle"
                                    secondary={this.props.averageMoves}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Efficiency Score: puzzles * 7 - redundant moves from best"
                                    secondary={(this.props.numPuzzlesCompleted * 7) - this.props.differenceOptimal}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Moves Per Second"
                                    secondary={this.props.movesPerSecond}
                                  />
                                </ListItem>
                            </List>
                          </div>
                        </Grid>
                      </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.props.handleClickPlayAgain}>Play Again!</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    };


}

export default PuzzleRushWinModal;

