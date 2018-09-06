import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3gh8GjgEj4K30m-lY9xN6dCSqTWgr9u4",
    authDomain: "superherobattle-61d9c.firebaseapp.com",
    databaseURL: "https://superherobattle-61d9c.firebaseio.com",
    projectId: "superherobattle-61d9c",
    storageBucket: "superherobattle-61d9c.appspot.com",
    messagingSenderId: "1080702085190"
};
firebase.initializeApp(config);

export default firebase;