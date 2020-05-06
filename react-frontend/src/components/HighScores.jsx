import React from 'react';

const styleouter = () => {
    return {
        marginleft: '15px',
        float: 'left'
    };

}

const styleelements = () => {
    return {
        marginBottom: '20px',
        marginTop: '10px'
    };

}

const highscorestyle = highscore => {
    return (
        <div style={styleelements()}>{'By: ' + highscore.comment}
            <div>
                {'Moves: ' + highscore.numMoves}
            </div>
        </div>

    )
};


export default ({highscores}) => (
    <div style={styleouter()}>{'All Highscores:'}
        {
            highscores.map(highscore =>
                highscorestyle(highscore)
            )
        }
    </div>
)