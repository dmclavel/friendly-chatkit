import React, { Component } from "react";

import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "../../components/MessageList/MessageList";
import SendMessageForm from "../../components/UI/SendMessageForm/SendMessageForm";
import dotenv from "dotenv";
import classes from "./Chat.css";
import { getName } from "../../utils/getName/getName";

const Chatkit = require('@pusher/chatkit-server');

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            currentUser: null,
            stillFetching: true
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        setTimeout(async () => {
            dotenv.load();
            let username = '';
            const chatkit = new Chatkit.default({
                instanceLocator: process.env.REACT_APP_INSTANCE_LOC,
                key: process.env.REACT_APP_CHATKIT_KEY
            });
            await getName()
                .then(name => {
                    username = name;
                })
                .catch(err => {
                    throw new Error(err);
                });
            await chatkit.getUser({
                id: this.props.userId
            })
                .then(() => {

                })
                .catch(() => {
                    chatkit.createUser({
                        id: this.props.userId,
                        name: username
                    })
                        .then(res => {
                            this.setState({ currentUser: res });
                            // console.log(`User created successfully!`);
                        })
                        .catch(err => {
                            // console.log(err);
                        });
                });

            const chatManager = new ChatManager({
                instanceLocator: process.env.REACT_APP_INSTANCE_LOC,
                userId: this.props.userId,
                tokenProvider: new TokenProvider({ url: process.env.REACT_APP_TEST_TOKEN })
            });

            await chatManager.connect()
                .then(currentUser => {
                    this.setState({ currentUser });
                    // console.log(`Successful connection ${currentUser}`);
                    currentUser.joinRoom({ roomId: process.env.REACT_APP_ROOM_ID })
                        .then(room => {
                            this.setState({ stillFetching: false });
                            // console.log(`Joined room with ID: ${room.id}`);
                        })
                        .catch(err => {
                            // console.log(`Error joining room ${someRoorID}: ${err}`);
                        });

                    currentUser.subscribeToRoom({
                        roomId: process.env.REACT_APP_ROOM_ID,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: this.state.messages.concat(message)
                                });
                            }
                        },
                        messageLimit: 50
                    })
                })
                .catch(err => {
                    // console.log(`Error on connection ${err}`);
                });
        }, 3000);
    }

    handleMessageChange(e) {
        e.preventDefault();
        this.setState({
            message: e.target.value
        });
    };

    handleSubmit(e) {
        dotenv.load();
        e.preventDefault();
        if (this.state.message)
        this.state.currentUser.sendMessage({
            text: this.state.message,
            roomId: process.env.REACT_APP_ROOM_ID
        })
            .then(res => {
                this.setState({ message: '' });
                // console.log(res);
            })
            .catch(err => {
                // console.log(err);
            })
    }

    render () {
        return (
          <div className={classes.Chat}>
              <h1 style={{color: 'silver', textAlign: 'center'}}> General Chat Page </h1>
              <hr />
              <MessageList loading={this.state.stillFetching} messages={this.state.messages} />
              <hr />
              <SendMessageForm message={this.state.message} handleSubmit={this.handleSubmit} changed={(event) => this.handleMessageChange(event)} />
          </div>
        );
    }
}