<template>
  <!-- <q-page class="flex-center"> -->

    <h3>Личный кабинет исполнителя</h3>
    <h3>Личный кабинет исполнителя</h3>
    <h3>Личный кабинет исполнителя</h3>





    <div class="q-py-xl">
      <div class="text-h6">Редактировать личную информацию  (шаблон):</div>
      <!-- <q-btn @click="openEditDialog = !openEditDialog" label="Редактировать" icon="edit"></q-btn> -->
      <!-- <edit-aide-data v-model:openEditDialog="openEditDialog"/> -->
    </div>

    <div class="text-h6">Список подключенных групп к системе:</div>
    <div class="text-h8">Вы размещаетесь:</div>
    <div class="row ">
      <group-card
      class="q-mr-md q-mb-md"
      v-for="group of groups" :key="group.groupName"
      :group="group"
      :isUserAide="true"
      :isUserGroupOwner="false"
      :link="'/aide/edit'"

      ></group-card>
    </div>


    <!-- <q-card class="my-card q-my-sm" style="width: 80%" flat bordered>
      <q-card-section horizontal>
        <q-card-section>
              <q-img
                class="col-5"
                src="https://sun9-71.userapi.com/impf/bz485gW1e-GGxlyNUcus_saYMEfayESd6BzbIw/l5Xvk3GBjOA.jpg?size=1500x1500&quality=95&sign=30da46a74d7af5db0607af43abfb5537&type=album"
                width="200px"
                />
        </q-card-section>
        <q-card-section>
          <q-card-section class="text-h6">Учёба в УрГУПС</q-card-section>
          <q-card-section class="text-body-1">Группа уральского государственного университета путей сообщения. Специализируется на технических дисциплинах</q-card-section>
          <q-card-section class="text-h6">Оплачено до: 28.05.2022</q-card-section>
          <q-card-section class="text-h6">Оплачено до: 28.05.2022</q-card-section>
          <q-card-section>
            <q-btn color="green" align="right" label="Открыть"></q-btn>
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </q-card> -->

    <div class="text-h8">Все остальные группы:</div>



  <!-- </q-page> -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import GroupCard from 'src/components/GroupCard.vue'
import EditAideData from '../components/EditAideData.vue'





export default defineComponent({
  name: 'ManageAide',
  setup() {
    let openEditDialog = ref(false)

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

    return {groups, openEditDialog}
  },
  components: {GroupCard, EditAideData}
})
</script>
