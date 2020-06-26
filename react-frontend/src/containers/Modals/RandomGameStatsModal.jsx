import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    MAX_WIDTH,
    MAX_HEIGHT,
    ROBOT_BLUE,
    ROBOT_GREEN,
    ROBOT_RED,
    ROBOT_YELLOW,
    GREEN_UP_PICTURE,
    DIRECTION_MAP_IMAGES,
    LINE_INDICATOR_COLOR
} from '../../constants/constants';



const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class RandomGameStatsModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: null,
        }
    }

    showStatsModal = () => {
        this.props.handleShowRandomAnswers()
        this.setState({
            answers: this.props.lowestMoveSequence
        })
    };

    render() {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
            >
                <DialogTitle id="customized-dialog-title-random" onClose={this.handleClose}>You Win!</DialogTitle>
                <DialogContent dividers>
                    <div>
                        You used {this.props.numMoves} Moves!
                    </div>
                    <br/>
                    <div>
                        lowest possible moves: {this.props.lowestMoves}
                    </div>
                    {this.state.answers}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.showStatsModal}>Show Puzzle Answers</Button>
                    <Button onClick={this.props.resetPuzzle}>Reset</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default RandomGameStatsModal;