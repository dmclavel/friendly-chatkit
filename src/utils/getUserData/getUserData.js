import fire from '../../config/fire';

export const getUserData = () => {
    return new Promise((resolve, reject) => {
        fire.database().ref('usersData/' + fire.auth().currentUser.uid).on('value', snapshot => {
            resolve(snapshot.val());
        },
        err => {
            reject(err);
        });
    });
};