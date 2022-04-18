<template>
  <q-page class="flex-center q-ma-xl">
    <h3>Список ваших групп</h3>
      <q-btn color="green" class="q-mb-lg" icon="add" label="Подключить новое сообщество"
      @click="isEditGroupDataDialogOpen=true"
       />
    <q-dialog v-model="isEditGroupDataDialogOpen">
      <edit-group-data>
        <template v-slot:header>
          <q-card-section class="row items-center q-pb-xs">
            <div class="text-h6">Добавить группу</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
        </template>
      </edit-group-data>
    </q-dialog>
    <div class="row ">
      <keep-alive>
        <group-card
        class="q-mr-md q-mb-md"
        v-for="group of allGroups" :key="group"
        :group="group"
        :linkName="'editGroup'"
        ></group-card>
      </keep-alive>
    </div>



  </q-page>
</template>

<script>
import { defineComponent, onMounted, onBeforeMount, computed, ref} from 'vue'
import { useStore } from 'vuex'
import GroupCard from 'src/components/GroupCard.vue'
import EditGroupData from 'src/components/EditGroupData.vue'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useStore();
    const groups = ref()
    const allGroups = ref([])

    const isEditGroupDataDialogOpen = ref(false)

    onMounted(async()=> {
      groups.value = await store.dispatch('groups/fetchGroups')
      groups.value.forEach((group)=> allGroups.value.push(group))
    })




    return {groups, allGroups, isEditGroupDataDialogOpen}
  },
  components: {GroupCard, EditGroupData}
})
</script>

<style scoped>
a {
   text-decoration: none;
   color: inherit;
}
</style>


