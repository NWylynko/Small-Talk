import * as firebase from 'firebase';

import firebaseConfig from '../../firebase/auth.json';

firebase.initializeApp(firebaseConfig);

export default firebase