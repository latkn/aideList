<template>
  <q-layout view="lHh Lpr lFf" class="q-ma-xl">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          AIDELIST
        </q-toolbar-title>

        <div @click="logout">
          <q-tabs>
            <q-tab label="Выход" />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


const linksList = [
  {
    title: 'Владелец группы',
    caption: 'Добавление группы',
    icon: 'school',
    path: '/groups/manage'
  },
  {
    title: 'Кошелёк',
    caption: 'wallet',
    icon: 'chat',
    path: '/groups/wallet'
  },
  {
    title: 'Добавить группу',
    caption: '',
    icon: 'chat',
    path: '/groups/add'
  },
  {
    title: 'ЛК исполнителя',
    caption: '',
    icon: 'code',
    path: '/aide/manage'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/login')
    }


    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout
    }
  }
})
</script>

<style>
  .body--light {
    background: #edeff1;
  }
</style>
