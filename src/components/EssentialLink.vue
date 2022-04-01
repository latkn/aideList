<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="route"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import { toRef } from 'vue'


export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    path: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // const path = toRef(props, 'path')
    const path = props.path
    const router = useRouter()
    function route() {
      // console.log(path);
      // console.log(path._object.path);
      router.push(path)
    }
    return {route}
  },


})
</script>
