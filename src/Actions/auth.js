import {auth, db, usersCollectionRef } from '../utils/firebase';
import 'firebase/compat/firestore';


export const login = (email, password) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            })
            .catch((error) => {
                dispatch({ type: 'LOGIN_ERROR', error });
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGOUT_REQUEST' });
        auth.signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT_SUCCESS' });
            })
            .catch((error) => {
                dispatch({ type: 'LOGOUT_ERROR', error });
            });
    };
};

export function register(username, email, password) {
	return async (dispatch) => {
	  dispatch({ type: 'REGISTER_REQUEST' });
	  try {
		
		await auth.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			usersCollectionRef.doc(userCredential.user.uid).set({
				username: username,
				email: email,
				favoris : []
			  }).then(() => {
				dispatch({ type: 'REGISTER_SUCCESS', userCredential });
			 })
			 .catch((error) => {
				 dispatch({ type: 'REGISTER_FAILURE', error });
			 });
		})
		.catch((error) => {
			dispatch({ type: 'LOGIN_ERROR', error });
		});
		// add user data to firebase database
	
		
	  } catch (error) {
		dispatch({ type: 'REGISTER_FAILURE', error });
	  }
	}
  }

export const setAuthIsLoaded = () => {
    return {
        type: 'AUTH_IS_LOADED',
    }
}
