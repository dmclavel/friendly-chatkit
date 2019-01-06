import React from 'react'

import classes from './Spinner.css'

const spinner = (props) => {
    return (
        <div style={props.spinnerStyle} className={classes.loader}>
        
        </div>
    );
};

export default spinner;