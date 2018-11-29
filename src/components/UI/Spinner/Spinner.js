import React from 'react'

import classes from './Spinner.css'

const spinner = (props) => {
    let style = {};
    if (props.modal) {
        style = {
            color: '#CD295A'
        }
    } else if (props.chatBox) {
        style = {
            color: 'silver'
        }
    }
    return (
        <div style={style} className={classes.loader}>
        
        </div>
    );
};

export default spinner;