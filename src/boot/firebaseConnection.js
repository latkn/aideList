// import firebaseServices from '../services/firebase'

// export default async () => {
//   const app = firebaseServices.fBInit(process.env.QENV.FIREBASE_CONFIG)

//   // Validation that our service structure is working
//   // with an initialize Firebase application and auth instance.
//   console.log('Firebase App Instantiation:', app)
//   console.log('Firebase Auth Module:', firebaseServices.auth())
// }


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



export default async () => {
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
      apiKey: "AIzaSyCpeh7G6At9ZFUontKFkbG3mauxJbgzNB4",
      authDomain: "aidelist-c5153.firebaseapp.com",
      projectId: "aidelist-c5153",
      storageBucket: "aidelist-c5153.appspot.com",
      messagingSenderId: "567515058901",
      appId: "1:567515058901:web:99a65f9f4992987edfc85c",
      measurementId: "G-Y1R6ZYTS0N"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    console.log(auth);

}
