<template>
  <q-page class="flex-center">
    <h3>Добавить группу</h3>
             <!-- <q-separator /> -->
      <q-card class="my-card q-pa-xl shadow-10">
          <div class="items-start">
            <q-form class="q-gutter-sm" @submit="submitHandler">
                <q-input class="input" outlined v-model="formData.groupName" label="Название" />
                <q-input class="input" outlined v-model="formData.describe" type="textarea" label="Описание учебного заведения. Специализация" />
                <q-input class="input" outlined v-model="formData.link" label="Ссылка на группу" type="url" />
                <q-input class="input" outlined v-model="formData.avatar" label="Ссылка на аватар" type="url" />
                <q-input class="input" outlined v-model="formData.city" label="Город" />
                <q-input class="input" outlined v-model="formData.id" label="ID Группы" />
                <q-card-actions>
                  <q-btn color="primary" align="right" type="submit">Добавить</q-btn>
                </q-card-actions>
            </q-form>
          </div>
      </q-card>
  </q-page>

</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const store = useStore();
    const formData = ref({
      groupName: 'Учеба в УрГУПС',
      describe: 'Железнодорожный университет',
      link: 'https://vk.com/usurt_study',
      avatar: 'https://sun9-71.userapi.com/impf/bz485gW1e-GGxlyNUcus_saYMEfayESd6BzbIw/l5Xvk3GBjOA.jpg?size=1500x1500&quality=95&sign=30da46a74d7af5db0607af43abfb5537&type=album',
      city: 'Екатеринбург',
      id: 'club82676148',
    })

    async function  submitHandler() {
      console.log(formData.value);
      try {
        await store.dispatch('groups/addGroup', formData.value)

      } catch (error) {
        console.log(error);
      }
    }
    return {formData, submitHandler}
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 80%
  max-width: 800px

.input
  width: 100%
</style>
