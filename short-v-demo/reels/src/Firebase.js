
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

//Step 1
import "firebase/compat/auth";

import "firebase/compat/storage";

// require('dotenv').config()

const firebaseConfig  = {
    apiKey: "AIzaSyBiTNldIFGGmgw3LeA9NZtAxrlqqh6FdEc",
    authDomain: "reels-aa46c.firebaseapp.com",
    projectId: "reels-aa46c",
    storageBucket: "reels-aa46c.appspot.com",
    messagingSenderId: "555550331593",
    appId: "1:555550331593:web:4a85b542bbd13e45243318",
    measurementId: "G-1VKE1GJ2RV"
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

//Step 2
export const auth = firebase.auth();

export const storage = firebase.storage()

//Step 3=> firebase console; enable google login in auth panel

//Step 4
let provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;