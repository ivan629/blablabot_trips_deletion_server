import config from 'config';
import firebase from 'firebase';
import 'firebase/storage';
const { firebaseConfig } = config;

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
