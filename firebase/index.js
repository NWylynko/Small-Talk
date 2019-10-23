import * as firebase from 'firebase/app';

import "firebase/firestore"; // for user data
import "firebase/database"; // for messages
import "firebase/auth"; // to authenticate users

import firebaseConfig from './auth.json'; // file with firebase api 

firebase.initializeApp(firebaseConfig);

export default firebase
