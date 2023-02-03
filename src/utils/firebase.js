
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCISyT-mIkWjsMSLUBBVkDgiiTFPvjtkzg",
	authDomain: "rickandmorty-b5e18.firebaseapp.com",
	projectId: "rickandmorty-b5e18",
	storageBucket: "rickandmorty-b5e18.appspot.com",
	messagingSenderId: "646839328847",
	appId: "1:646839328847:web:b1168baa06dee154d28a3a",
	measurementId: "G-2PXYLT5QTR"
  };


firebase.initializeApp(firebaseConfig);
//firebase.firestore().enablePersistence()
export const auth = firebase.auth();
export const db = firebase.firestore();
export const usersCollectionRef = db.collection('users');