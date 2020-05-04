import React from 'react';


const handleSubmit = () => {
    this.props.onSubmit();
}

export default (props) =>
    <div>
        <form onSubmit={handleSubmit}>
            <button type="submit">Add</button>
        </form>
    </div>
