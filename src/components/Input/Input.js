import React from 'react';

import classes from './Input.css';

const input = (props) => {
    return (
        <div className={classes.Input}>
            <input
                style={props.inputStyle}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}
                required={props.isRequired}
            />
        </div>
    );
    
};

export default input;