import fire from "../../config/fire";
const Chatkit = require('@pusher/chatkit-server');
const dotenv = require('dotenv');


dotenv.load();
export const instantiateChat = () => {
    return new Promise((resolve, reject) => {
        const chatkit = new Chatkit.default({
            instanceLocator: process.env.REACT_APP_INSTANCE_LOC,
            key: process.env.REACT_APP_CHATKIT_KEY
        });

        chatkit.createUser({
            id: fire.auth().currentUser.uid,
            name: fire.database().ref('usersData/' + fire.auth().currentUser.uid).on('value', snapshot => {
                return snapshot.val().displayName;
            }, err => {
                reject(err);
            })
        })
            .then(() => {
                resolve(chatkit);
            })
    });
};