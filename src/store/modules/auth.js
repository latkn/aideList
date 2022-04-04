import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue} from "firebase/database";
import { getFirestore} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


import {store} from 'vuex'

const actions = {
    async login({commit, dispatch}, {email, password}) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        //   // Signed in
          const user = userCredential.user;
        //   // ...
          console.log('user: ', user);
        })
        // this.$store.dispatch('getBillByUid')
      } catch(error) {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // commit('setError', errorCode)
        throw error
      }
    },

    async register({commit, dispatch}, {email, password, name}) {
      try {
        const auth = getAuth();
        const db = getFirestore();

          await createUserWithEmailAndPassword(auth, email, password, name)
          .then((userCredential) => {
            console.log(userCredential);

          })
          const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef.id);
            // let uid = await dispatch('auth/getUid')



      } catch(error) {
        // console.log(e);
        const errorCode = error.code;
        commit('setError', errorCode);
        setTimeout(()=> commit('clearError'), 5000)

        throw error
      }

    },

    async logout({commit}) {
      try {
        const auth = getAuth();
        await signOut(auth)
        commit('clearInfo')


      } catch(e) {

      }
    },

    getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    },

  //  async getNameByUid({commit, dispatch}) {
  //     const auth = getAuth();
  //     const user = auth.currentUser;
  //     const database = getDatabase();
  //     let userNameRef = await ref(database, `/users/${user.uid}/info/name`);
  //     onValue(userNameRef, (snapshot) => {
  //       commit('setUserName', snapshot.val())
  //     })
  //   },


  }

export default {
  namespaced: true,
  actions
}




