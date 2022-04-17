<template>
  <!-- <q-page class="flex-center"> -->

    <h3>Личный кабинет исполнителя</h3>
    <!-- <q-card > -->
      <!-- <q-qard-section class="text-h6"> -->

      <!-- </q-qard-section> -->
    <!-- </q-card> -->
    <div class="q-py-xs row" style="width: 80%">
      <div class="text-h6">Ваша карточка (шаблон для всех групп):</div>
      <q-space/>
      <q-btn @click="openEditDialog = !openEditDialog" label="Редактировать" icon="edit"></q-btn>
      <edit-aide-data
      v-model:openEditDialog="openEditDialog"
      :aide="aide"
      />
    </div>
    <aide-card :aide="aide"/>
    <div class="text-h6">Список подключенных групп к системе:</div>
    <div class="text-h8">Вы размещаетесь:</div>
    <div class="row ">
      <keep-alive>
        <group-card
        v-for="group in allGroups" :key="group"
        class="q-mr-md q-mb-md"
        :group="group"
        :isUserAide="true"
        :isUserGroupOwner="false"
        :linkName="'aide__editgroup'"
        ></group-card>
      </keep-alive>
    </div>

    <div class="text-h8">Все остальные группы:</div>

    {{activeGroups}}

  <!-- </q-page> -->
</template>

<script>
import { defineComponent, ref, onMounted, computed, } from 'vue'
import { useStore } from 'vuex'
import GroupCard from 'src/components/GroupCard.vue'
import EditAideData from '../components/EditAideData.vue'
import AideCard from '../components/AideCard.vue'

export default defineComponent({
  name: 'ManageAide',
  setup() {
    const store = useStore()
    let openEditDialog = ref(false)
    const aide = ref({});
    onMounted(async()=> {
      aide.value = await store.dispatch('aide/fetchAideInfo')

      // console.log(aide.value);
    })

    // let groups = [
    //   {
    //     groupName: 'Учёба в УрГУПС',
    //     groupLink: 'vk.com/usurt_study',
    //     numberOfAides: 6,
    //     groupAvatar: 'https://sun9-71.userapi.com/impf/bz485gW1e-GGxlyNUcus_saYMEfayESd6BzbIw/l5Xvk3GBjOA.jpg?size=1500x1500&quality=95&sign=30da46a74d7af5db0607af43abfb5537&type=album'
    //   },
    //   {
    //     groupName: 'Подслушано УрФУ',
    //     groupLink: 'vk.com/overhearurfu',
    //     numberOfAides: 8,
    //     groupAvatar: 'https://sun9-49.userapi.com/impf/c629406/v629406532/11446/drSlx8Dc94E.jpg?size=604x604&quality=96&sign=c55a68ec1cb1ba76ed1abd28fc127907&type=album'
    //   },
    // ]
    const groups = ref()
    const allGroups = ref([])
    const activeGroupsObject = ref({})

    onMounted(async()=> {
      groups.value = await store.dispatch('groups/fetchGroups')
      groups.value.forEach((group)=> allGroups.value.push(group))

      allGroups.value.map(async(g)=> {
        const groupId = g.id
        const isActive = await store.dispatch('aide/fetchActiveGroups', {aideId: aide.value.id, groupId})
        activeGroupsObject.value[groupId] = isActive
      })

    })

    const activeGroups = computed(()=> {
      // debugger
      allGroups.value.map(g => {
        // const isActive = activeGroupsObject.value[g.id]
        // console.log('isActive',isActive);

        // if(activeGroupsObject.value[g.id]){

          // console.log();
        // }
      })
    })

    setTimeout(() => {

      console.log('activeGroups.value',activeGroups.value);
    }, 1000);



    return { allGroups, openEditDialog, aide, activeGroups }
  },
  components: {GroupCard, EditAideData, AideCard}
})
</script>
