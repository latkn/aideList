<template>
  <q-page class="flex flex-center column">
    <h1>Main page Landing</h1>
    <router-link to="/groups/manage">
      <q-btn label="В кабинет" color="green"></q-btn>
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
