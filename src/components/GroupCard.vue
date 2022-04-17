<template>
   <q-card class="my-card q-pa-md column" flat bordered style="max-width: 30%">
        <q-img
            :src="group.avatar"
            :ratio="1"
            width="100%"
          />
        <p class="text-h6 q-my-sm">{{group.groupName}}</p>
        <small>{{group.link}}</small>

        <p>Количество исполнителей: {{group.numberOfAides}}</p>

        <q-card-section v-if="isUserAide" class="text-body2 q-px-none">
          Переходов за месяц: 53
        </q-card-section>
        <q-card-section v-if="isUserAide" class="text-body2 q-px-none">
          Оплачено до: 28.12.2022
        </q-card-section>
        <q-card-section v-if="isUserAide" class="text-body2 q-px-none">
         Позиция в списке: Random
        </q-card-section>

        <router-link style="text-decoration: none; color: inherit" :to="{name: linkName, params: {id: group.id}}">
          <q-btn outline color="primary"  icon="settings" label="Настройки" />
        </router-link>
      </q-card>
</template>

<script>
import { onMounted, computed } from "vue"

export default {
  props: ['group', 'isUserGroupOwner', 'isUserAide', 'linkName' ],
  setup(props) {
    // onMounted(()=> console.log('group in groupCard', props.group))
  //  const id = computed(()=> this.$route.params.id)
  //  const id = computed(()=> props.link+'/'+props.group.id)
  //   console.log(id.value);
  // }

  // props: {
  //   group: {
  //     type: Proxy
  //   },
  //   isUserGroupOwner: {
  //     type: Boolean
  //   },
  //   isUserAide: {
  //     type: Boolean
  //   },
  //   link: {
  //     type: String
  //   }
  }

}
</script>

<style>

</style>
