import React from "react";

import Spinner from "../UI/Spinner/Spinner";
import fire from "../../config/fire";
import classes from "./MessageList.css";

const messageList = props => {
    let content = <Spinner chatBox={true} />;
    if (!props.loading) {
        content = (
            <ul className={classes.MessageList}>
                {
                    props.messages.map(message => {
                        let style = {}, alignRightStyle={};
                        if (message.senderId === fire.auth().currentUser.uid) {
                            style = {backgroundColor: '#38ADAE', color: '#fff'};
                            alignRightStyle = {alignItems: 'flex-end'}
                        }

                        return (
                            <div style={alignRightStyle} className={classes.MessageBox} key={message.id}>
                                <li style={style}>
                                    <div>
                                        Sender: {message.sender.name}
                                    </div>
                                    <div style={{padding: '0 20px'}}>
                                        {message.text}
                                    </div>
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
        );
    }
    return content;
};

export default messageList;