import React, { Component } from "react";

import Spinner from "../UI/Spinner/Spinner";
import fire from "../../config/fire";
import classes from "./MessageList.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";

export default class MessageList extends Component {

    scrollToBottom = () => {
        document.getElementById('latest').scrollIntoView({ behavior: "smooth" });
    };

    render () {
        let content = <Spinner chatBox={true} />, count = 0;
        if (!this.props.loading) {
            content = (
                <Aux>
                    <div className={classes.ScrollDownDiv}>
                        <span onClick={this.scrollToBottom}> Scroll down to the latest message</span>
                        <i onClick={this.scrollToBottom} className="material-icons"> vertical_align_bottom </i>
                    </div>
                    <ul className={classes.MessageList}>
                        {
                            this.props.messages.map(message => {
                                let style = {}, id='', you=false;
                                count++;
                                if (count === this.props.messages.length) id='latest';
                                if (message.senderId === fire.auth().currentUser.uid) {
                                    style = {backgroundColor: '#38ADAE', color: '#fff', float: 'right'};
                                    you = true;
                                }

                                return (
                                    <Aux key={message.id}>
                                        <li style={style}>
                                            <span className={classes.TimeStyle}> {message.createdAt} </span>
                                            <div>
                                                Sender: {you ? 'You' : message.sender.name}
                                            </div>
                                            <div style={{padding: '0 20px'}}>
                                                {message.text}
                                            </div>
                                        </li>
                                        <div id={id} style={{height: '1px', display: count === this.props.messages.length ? 'block':'none'}}> </div>
                                    </Aux>
                                )
                            })
                        }
                    </ul>
                </Aux>
            );
        }
        return content;
    }
}