import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBiTNldIFGGmgw3LeA9NZtAxrlqqh6FdEc",
    authDomain: "reels-aa46c.firebaseapp.com",
    projectId: "reels-aa46c",
    storageBucket: "reels-aa46c.appspot.com",
    messagingSenderId: "555550331593",
    appId: "1:555550331593:web:4a85b542bbd13e45243318",
    measurementId: "G-1VKE1GJ2RV"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;