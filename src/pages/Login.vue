<template>
    <q-page-container class="window-height window-width row justify-center items-center" >
      <q-card flat bordered class="col " style="max-width: 50%" >
      <q-tabs
      v-model="tabs"
      >
        <q-tab name="login" label="Вход" />
        <q-tab name="register" label="Регистрация" />
      </q-tabs>
        <form @submit.prevent="login" class="q-pa-md" v-if="tabs=='login'">
            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Пароль">
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

         <form @submit.prevent="register" class="q-pa-md" v-if="tabs=='register'">

            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input v-model="name" filled type="text" hint="Имя Фамилия/Название компании" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Пароль">
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
import {onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const tabs = ref('login')

    const isPwd = ref(true)
    const email = ref('')
    const name = ref('')
    const password = ref('')



    const login = async() => {
      const formData = {
       email: email.value,
       password: password.value
      }
        try {
          await store.dispatch('auth/login', formData)
          router.push('/groups/manage')

        } catch (error) {
          console.log(error);
        }
    }

    const register = async() => {
      const formData = {
       email: email.value,
       password: password.value,
       name: name.value
      }
        try {
          await store.dispatch('auth/register', formData)
          router.push('/groups/manage')

        } catch (error) {
          console.log(error);
        }
    }
    return {login, name, email, password, isPwd, tabs}
  }

}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
