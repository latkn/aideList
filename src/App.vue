<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import EmptyLayout from './layouts/EmptyLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default defineComponent({
  name: 'App',
  computed: {
    layout() {
      console.log(this.$route.meta.layout);
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {EmptyLayout, MainLayout}
})
</script>
