import React from "react";

import Spinner from "../UI/Spinner/Spinner";
import fire from "../../config/fire";
import classes from "./MessageList.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const messageList = props => {
    let content = <Spinner chatBox={true} />;
    if (!props.loading) {
        content = (
            <ul className={classes.MessageList}>
                {
                    props.messages.map(message => {
                        let style = {};
                        if (message.senderId === fire.auth().currentUser.uid)
                            style = {backgroundColor: '#38ADAE', color: '#fff', float: 'right'};


                        return (
                            <li style={style} key={message.id}>
                                <span className={classes.TimeStyle}> {message.createdAt} </span>
                                <div>
                                    Sender: {message.sender.name}
                                </div>
                                <div style={{padding: '0 20px'}}>
                                    {message.text}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
    return content;
};

export default messageList;