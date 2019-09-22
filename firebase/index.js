import * as firebase from 'firebase';

import firebaseConfig from './auth.json';

export default firebase.initializeApp(firebaseConfig);