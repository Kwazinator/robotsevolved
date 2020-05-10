import React from "react";

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
    };
};

export default (props) =>
    <div>
        <form onSubmit={props.resetPuzzle} style={buttonpanel()}>
            <button type="submit">Reset</button>
        </form>
    </div>