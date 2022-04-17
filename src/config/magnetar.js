// ---------------------------------------------
// 1. the plugin firestore for remote data store
// ---------------------------------------------
import { CreatePlugin as PluginFirestore } from '@magnetarjs/plugin-firestore'
import { getFirestore, collection, doc } from 'firebase/firestore'
import {db} from '../boot/firebaseConnection'

// // const firebaseApp = initializeApp({ /* pass your config... */ })
// const db = getFirestore(firebaseApp)
// create the remote store plugin instance & pass your `db`:
const remote = PluginFirestore({ db })




function generateRandomId () { return doc(collection(db, 'random')).id }

// ---------------------------------------
// 2. the plugin vue2 for local data store
// ---------------------------------------
import { CreatePlugin as PluginVue } from '@magnetarjs/plugin-vue3'

// // create the local store plugin instance & pass your `generateRandomId`:
const local = PluginVue({ generateRandomId })

// -----------------------------------------------------
// 3. instantiate the Magnetar instance with the store plugins
// -----------------------------------------------------
import { Magnetar } from 'magnetar'
import { logger } from '@magnetarjs/utils'

export const magnetar = Magnetar({
  stores: { local, remote },
  localStoreName: 'local',
  executionOrder: {
    read: ['local', 'remote'],
    write: ['local', 'remote'],
    delete: ['local', 'remote'],
  },
  on: { success: logger }, // disable this on production builds
})
