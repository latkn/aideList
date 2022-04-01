// import * as Firebase from 'firebase/app'
// import 'firebase/firestore'

// function initFirebase () {
//   Firebase.initializeApp({
//     apiKey: "AIzaSyCpeh7G6At9ZFUontKFkbG3mauxJbgzNB4",
//     authDomain: "aidelist-c5153.firebaseapp.com",
//     projectId: "aidelist-c5153",
//     storageBucket: "aidelist-c5153.appspot.com",
//     messagingSenderId: "567515058901",
//     appId: "1:567515058901:web:99a65f9f4992987edfc85c",
//     measurementId: "G-Y1R6ZYTS0N"})

//     const FirebaseDependency = Firebase

//   return new Promise((resolve, reject) => {
//     Firebase.firestore().enablePersistence()
//       .then(resolve)
//       .catch(err => {
//         if (err.code === 'failed-precondition') {
//           reject(err)
//           // Multiple tabs open, persistence can only be
//           // enabled in one tab at a a time.
//         } else if (err.code === 'unimplemented') {
//           reject(err)
//           // The current browser does not support all of
//           // the features required to enable persistence
//         }
//       })
//   })
// }

// export { Firebase, initFirebase }
