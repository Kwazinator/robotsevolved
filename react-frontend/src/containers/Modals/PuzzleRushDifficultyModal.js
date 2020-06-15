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



class PuzzleRushDifficultyModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.show = false;
    };

    render () {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title-2"
                    open={this.props.show}
                    maxWidth={"xs"}
                    fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title-2" onClose={this.handleClose}>Select a Difficulty</DialogTitle>
                <DialogContent dividers>
                            <Grid
                                container xs={12}
                                spacing={4}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                wrap="nowrap"
                            >
                                <Grid item xs={12}>
                                    <Button onClick={this.props.handleClickEasyPuzzleRush} variant="contained" color="primary">
                                        Easy
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={this.props.handleClickMediumPuzzleRush} variant="contained" color="primary">
                                        Medium
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={this.props.handleClickHardPuzzleRush} variant="contained" color="primary">
                                        Hard
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={this.props.handleClickExHardPuzzleRush} variant="contained" color="primary">
                                        Exteremely Hard
                                    </Button>
                                </Grid>
                            </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    };


}

export default PuzzleRushDifficultyModal;

