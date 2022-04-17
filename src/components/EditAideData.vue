<template>
  <q-dialog v-model="openEditDialog" no-backdrop-dismiss>
    <q-card style="width: 100%">
        <q-card-section class="text-body2">
          Редактирование личной информации
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="submitHandler">
            <q-input class="input" outlined v-model="formData.name" label="Имя Фамилия/Название компании" />
            <q-input class="input" outlined v-model="formData.link" label="Ссылка на страницу/группу" />
            <q-input class="input" outlined v-model.trim="formData.id" type="text" label="id" />
            <q-input class="input" outlined v-model.trim="formData.describe" type="textarea" label="Краткое описание" />
            <q-input class="input" outlined v-model.trim="formData.subjects" type="textarea" label="Названия предметов через запятую" />
            <q-input class="input" outlined v-model.trim="formData.avatar" type="text" label="Ссылка на аватар" />
            <q-card-actions>
              <q-btn label="Отмена"
              @click="$emit('update:openEditDialog', false)"

              v-close-popup class="q-mt-md"
              />
              <q-btn
              type="submit"
              :loading="submitting"
              label="Сохранить"
              class="q-mt-md"
              color="teal"
              >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent, ref, onMounted, computed} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'EditAideData',
  props: ['openEditDialog', 'aide'],
  emits: ['openEditDialog'],

  setup(props) {
    const store = useStore()
    const formData = ref({
      name: '',
      link: '',
      id: '',
      describe: '',
      subjects: [],
      avatar: '',
      })

      if (props.aide) {

        setTimeout(() => {
          formData.value = props.aide
        }, 1000);

      }

    const submitHandler = () => {
      store.dispatch('aide/updateAideInfo', formData.value)
    }

    return {formData, submitHandler}
  }

})
</script>

<style>

</style>
