import React from 'react';
import {DIRECTION_MAP_IMAGES} from '../constants/constants';

const style = () => {
    return {
            width: '15%',
            float: 'left',
        };
    };


class MovesView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style()}><h3>Moves:</h3>
                {
                    this.props.moveHistory.map(move =>
                        <img src={DIRECTION_MAP_IMAGES[this.props.playerState[move.robot].colorSignifier][move.dir]}/>
                    )
                }
            </div>
        )
    }
}

export default MovesView;