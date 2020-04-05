import * as firebase from 'firebase/app';
import * as firebaseConfig from 'expo-firebase-core';

import "firebase/firestore"; // for user data
import "firebase/database"; // for messages
import "firebase/auth"; // to authenticate users
import "firebase/storage" // for storing images

firebase.initializeApp(firebaseConfig.DEFAULT_APP_OPTIONS);

export default firebase
