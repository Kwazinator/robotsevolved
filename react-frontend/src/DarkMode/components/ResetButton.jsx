import React from "react";

const buttonpanel = () => {
    return {
        marginRight: '10px'
    };
};

export default (props) =>
    <div>
        <form onSubmit={props.resetPuzzle} style={buttonpanel()}>
            <button type="submit">Reset</button>
        </form>
    </div>