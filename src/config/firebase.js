import firebase from 'firebase';
import { apiKey } from "../keys/Keys";

const config = {
    apiKey,
    authDomain: "sample-ada8e.firebaseapp.com",
    databaseURL: "https://sample-ada8e.firebaseio.com",
    projectId: "sample-ada8e",
    storageBucket: "sample-ada8e.appspot.com",
    messagingSenderId: "621164607010"
  };

firebase.initializeApp(config);