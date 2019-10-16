import * as firebase from 'firebase';

import firebaseConfig from './auth.json';

firebase.initializeApp(firebaseConfig);

const perf = firebase.performance();

export default firebase
