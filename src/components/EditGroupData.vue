<template>
      <q-card class="my-card shadow-10">
        <slot name="header" ></slot>
          <div class="items-start q-pa-xl">
            <q-form class="q-gutter-sm" @submit="submitHandler">
                <q-input class="input" outlined v-model="formData.groupName" label="Название" />
                <q-input class="input" outlined v-model="formData.describe" type="textarea" label="Описание учебного заведения. Специализация" />
                <q-input class="input" outlined v-model="formData.link" label="Ссылка на группу" type="url" />
                <q-input class="input" outlined v-model="formData.avatar" label="Ссылка на аватар" type="url" />
                <q-input class="input" outlined v-model="formData.city" label="Город" />
                <q-input class="input" outlined v-model="formData.id" label="ID Группы" />
                <q-card-actions class="q-pa-none justify-end">
                  <q-btn color="primary" align="right" type="submit" label="Сохранить" :loading="submitting">
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                  </q-btn>
                </q-card-actions>
            </q-form>
          </div>
      </q-card>

</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  props: ['groupInfo'],
  emits: ['close'],

  setup(props, {emit}) {
    const submitting = ref(false)

    onMounted(()=> {
      if (props.groupInfo) {
        formData.value = props.groupInfo
      }
    })
    const store = useStore();
    const formData = ref({
      groupName: '',
      describe: '',
      link: '',
      avatar: '',
      city: '',
      id: '',
      // groupName: 'Учеба в УрГУПС',
      // describe: 'Железнодорожный университет',
      // link: 'https://vk.com/usurt_study',
      // avatar: 'https://sun9-71.userapi.com/impf/bz485gW1e-GGxlyNUcus_saYMEfayESd6BzbIw/l5Xvk3GBjOA.jpg?size=1500x1500&quality=95&sign=30da46a74d7af5db0607af43abfb5537&type=album',
      // city: 'Екатеринбург',
      // id: 'club82676148',
    })

    async function  submitHandler() {
      // console.log(formData.value);
      try {
        submitting.value=true
        await store.dispatch('groups/addGroup', formData.value)
        submitting.value=false
        emit('close')

      } catch (error) {
        console.log(error);
      }
    }

    // onMounted(()=> {
    //   const uid = store.dispatch('auth/getUid')
    //   console.log(uid);
    // })


    return {formData, submitHandler, submitting}
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
