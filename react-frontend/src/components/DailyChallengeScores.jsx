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
        <div style={styleelements()}>{'By: ' + highscore.name}
            <div>
                {'Moves: ' + highscore.score}
            </div>
            <div>
                {highscore.user_id != 1 ? 'verified' : 'not verified'}
            </div>
        </div>

    )
};


export default ({highscores}) => (
    <div style={styleouter()}>{'All Submissions:'}
        {
            highscores.map(highscore =>
                highscorestyle(highscore)
            )
        }
    </div>
)