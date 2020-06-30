import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import LearnGameItems from '../components/LearnGameItems';


const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class YouWinDailySingleModal extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>You Completed one of the puzzles!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves, for this puzzle. Complete all for your final score.
                    </div>
                    <br/>
                    {
                        this.props.games.map((game,index) =>
                            <LearnGameItems selected={this.props.numPuzzleon} game={game} name={'Puzzle #' + (index + 1)} index={index} handleClickGame={this.props.handleClickGame}/>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.props.undoMove}>Undo Move</Button>
                    <Button variant="contained" color="secondary" onClick={this.props.moveNextPuzzle}>Next Puzzle</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YouWinDailySingleModal;