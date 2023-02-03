
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './firebase.config';
import 'firebase/compat/firestore';



firebase.initializeApp(firebaseConfig);
//firebase.firestore().enablePersistence()
export const auth = firebase.auth();
export const db = firebase.firestore();
export const usersCollectionRef = db.collection('users');