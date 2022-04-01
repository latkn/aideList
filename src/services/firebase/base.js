// import firebase from 'firebase/app'
// import 'firebase/auth'
import { getAuth } from "firebase/auth";


import { initializeApp } from 'firebase/app';


// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// /* eslint-disable */



/**
 * Convenience method to initialize firebase app
 * https://firebase.google.com/docs/reference/js/firebase?authuser=1#initializeapp
 * @param  {Object} config - FIREBASE_CONFIG during the build process
 * @returns {App} - Creates and initializes a Firebase app instance.
 */
export const app = (config) => {
  return initializeApp(config)
}



/**
 * Returns Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @returns {auth} - The Firebase Auth service interface
 */

export const auth = () => {
  return getAuth(app)
}
// const auth = getAuth(app)
