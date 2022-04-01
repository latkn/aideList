<template>
  <q-page class="flex-center q-ma-xl">
    <h3>Список подключенных групп</h3>
    <q-btn color="green" class="q-mb-lg" icon="add" label="Подключить новое сообщество" />
    <div class="row ">
    <group-card
    class="q-mr-md q-mb-md"
    v-for="group of groups" :key="group.groupName"
    :group="group"
    :link="'/groups/edit'"
    ></group-card>
    </div>



  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import GroupCard from 'src/components/GroupCard.vue'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    let groups = [
      {
        groupName: 'Учёба в УрГУПС',
        groupLink: 'vk.com/usurt_study',
        numberOfAides: 6,
        groupAvatar: 'https://sun9-71.userapi.com/impf/bz485gW1e-GGxlyNUcus_saYMEfayESd6BzbIw/l5Xvk3GBjOA.jpg?size=1500x1500&quality=95&sign=30da46a74d7af5db0607af43abfb5537&type=album'
      },
      {
        groupName: 'Подслушано УрФУ',
        groupLink: 'vk.com/overhearurfu',
        numberOfAides: 8,
        groupAvatar: 'https://sun9-49.userapi.com/impf/c629406/v629406532/11446/drSlx8Dc94E.jpg?size=604x604&quality=96&sign=c55a68ec1cb1ba76ed1abd28fc127907&type=album'
      },
    ]

    return {groups}
  },
  components: {GroupCard}
})
</script>


