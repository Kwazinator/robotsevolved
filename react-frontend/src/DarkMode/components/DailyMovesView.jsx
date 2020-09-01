import React from 'react';
import {DIRECTION_MAP_IMAGES} from '../constants/constants';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Words,Line,Frame} from 'arwes';

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
            <Frame animate levels={1} corners={3}>
                <p style={{margin: '15px'}}>
                <Words animate layer='control'>Personal Best</Words>
                <Line animate/>
                <Typography>None</Typography>
                </p>
            </Frame> :
            <Frame animate levels={1} corners={3}>
            <p style={{margin: '15px'}}>
                <Words animate layer='control'>Personal Best</Words>
                <Line animate/>
                {
                    this.props.moveHistory.map(move =>
                        <img src={DIRECTION_MAP_IMAGES[this.props.playerState[move.robot].colorSignifier][move.dir]}/>
                    )
                }
                <Divider />
                <Button color="secondary" variant={"outlined"} onClick={this.resetToBest}>Reset to best</Button>
                </p>
            </Frame>
        )
    }
}

export default DailyMovesView;