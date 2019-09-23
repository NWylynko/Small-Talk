import * as firebase from 'firebase';

import firebaseConfig from './auth.json';

firebase.initializeApp(firebaseConfig);

export default firebase
