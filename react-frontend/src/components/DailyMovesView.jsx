import React from 'react';
import {DIRECTION_MAP_IMAGES} from '../constants/constants';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const style = () => {
    return {
            width: '15%',
            float: 'left',
            display: 'contents'
        };
    };


class DailyMovesView extends React.Component {

    constructor(props) {
        super(props);
    }


    resetToBest = () => {
        this.props.resetToBest(this.props.moveHistory,this.props.playerState)
    }

    render() {
        return (
            this.props.moveHistory.length == 0 ?
            <div style={style()}>
                <Typography>Personal Best</Typography>
                <Divider />
                <Typography>None</Typography>
            </div> :
            <div style={style()}>
                <Typography>Personal Best</Typography>
                <Divider />
                {
                    this.props.moveHistory.map(move =>
                        <img src={DIRECTION_MAP_IMAGES[this.props.playerState[move.robot].colorSignifier][move.dir]}/>
                    )
                }
                <Divider />
                <Button color="secondary" onClick={this.resetToBest}>Reset to best</Button>
            </div>
        )
    }
}

export default DailyMovesView;