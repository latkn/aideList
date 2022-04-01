<template>
  <!-- <q-layout class="q-ma-xl"> -->
    <q-page-container class="flex flex-center">
      <!-- <router-view /> -->
      <q-card flat bordered class="my-card center">

        <form @submit.prevent="simulateSubmit" class="q-pa-md">

            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row justify-end">
            <q-btn
              type="submit"
              :loading="submitting"
              label="Login"
              class="q-mt-md"
              color="teal"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
          </form>
      </q-card>
    </q-page-container>



  <!-- </q-layout> -->
</template>

<script>
import {onMounted} from 'vue'
// import firebase from 'firebase/compat/app';
// import "firebase/compat/auth";

// import {getAuth} from 'firebase/auth'
// import firebaseui from 'firebaseui'

export default {
  // setup() {
  //   // onMounted(()=> {
  //     // console.log('firebase.auth()',firebase.auth());
  //     // const firebase = require('firebase')
  //     // const firebaseui = require('firebaseui')

  //     // var auth = getAuth();
  //     var ui = new firebaseui.auth.AuthUI(firebase.auth());

  //     ui.start('#firebaseui-auth-container', {
  //     signInSuccessUrl: '/',
  //     signInOptions: [
  //      firebase.auth.EmailAuthProvider.PROVIDER_ID
  //     ],
  //       // Other config options...
  //     });

  //   // })
  //   }

}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
