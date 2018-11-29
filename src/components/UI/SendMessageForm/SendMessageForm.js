import React from "react";

import classes from "./SendMessageForm.css";

const sendMessageForm = props => (
    <form className={classes.MessageForm} onSubmit={props.handleSubmit}>
        <input
            onChange={(event) => props.changed(event)}
            type="text"
            placeholder="Your message..."
            value={props.message} />
            <i onClick={props.handleSubmit} className={"material-icons " + classes.SendButton}>send</i>
    </form>
);

export default sendMessageForm;