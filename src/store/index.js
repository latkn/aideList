import auth from './modules/auth'
import aide from './modules/aide'
import groups from './modules/groups'
import { createStore } from 'vuex'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth,
      groups,
      aide

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}






// import Vue from 'vue'
// import Vuex from 'vuex'
// import VuexEasyFirestore from 'vuex-easy-firestore'

// Vue.use(Vuex)

// // import from step 1
// import { Firebase, initFirebase } from '../config/firebase'
// // import from step 3 (below)
// import myModule from './modules/myModule.js'

// // do the magic 🧙🏻‍♂️
// const easyFirestore = VuexEasyFirestore(
//   [myModule],
//   {logging: true, FirebaseDependency: Firebase}
// )

// // include as PLUGIN in your vuex store
// // please note that "myModule" should ONLY be passed via the plugin
// const storeData = {
//   plugins: [easyFirestore],
//   // ... your other store data
// }

// // initialise Vuex
// const Store = new Vuex.Store(storeData)

// // initFirebase
// initFirebase()
//   .catch(error => {
//     // take user to a page stating an error occurred
//     // (might be a connection error, or the app is open in another tab)
//   })

// export default Store
