// import firebaseServices from '../services/firebase'

// export default async () => {
//   const app = firebaseServices.fBInit(process.env.QENV.FIREBASE_CONFIG)

//   // Validation that our service structure is working
//   // with an initialize Firebase application and auth instance.
//   console.log('Firebase App Instantiation:', app)
//   console.log('Firebase Auth Module:', firebaseServices.auth())
// }


import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc } from 'firebase/firestore'

import { CreatePlugin as PluginFirestore } from '@magnetarjs/plugin-firestore'
import { CreatePlugin as PluginVue } from '@magnetarjs/plugin-vue3'
import { Magnetar } from 'magnetar'
import { logger } from '@magnetarjs/utils'





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

    // console.log(auth);

    const checkAuthStatus = () => {
      // console.log('running checkAuthStatus()')

      return new Promise((resolve, reject) => {
        try {
          auth
            .onAuthStateChanged(user => {
              console.log('userChecked:', user)
              resolve(user)
            })
        } catch {
          reject('api failed')
        }
      })
    }

    checkAuthStatus();


const db = getFirestore(app)
/**
 * A helper function that generates a random Firestore ID
 */
function generateRandomId () { return doc(collection(db, 'random')).id }

// ---------------------------------------------
// 1. the plugin firestore for remote data store
// ---------------------------------------------


// create the remote store plugin instance & pass your `db`:
const remote = PluginFirestore({ db })

// ---------------------------------------
// 2. the plugin vue2 for local data store
// ---------------------------------------


// create the local store plugin instance & pass your `generateRandomId`:
const local = PluginVue({ generateRandomId })

// -----------------------------------------------------
// 3. instantiate the Magnetar instance with the store plugins
// -----------------------------------------------------

const magnetar = Magnetar({
  stores: { local, remote },
  localStoreName: 'local',
  executionOrder: {
    read: ['local', 'remote'],
    write: ['local', 'remote'],
    delete: ['local', 'remote'],
  },
  on: { success: logger }, // disable this on production builds
})


}
