<template>
  <q-dialog v-model="openEditDialog" no-backdrop-dismiss>
    <q-card style="width: 100%">
        <q-card-section class="text-body2">
          Редактирование личной информации
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="submitHandler">
            <q-input class="input" outlined v-model="companyName" label="Имя Фамилия/Название компании" />
            <q-input class="input" outlined v-model="link" label="Ссылка на страницу/группу" />
            <q-input class="input" outlined v-model.trim="describe" type="textarea" label="Краткое описание" />
            <q-input class="input" outlined v-model.trim="subjects" type="textarea" label="Названия предметов через запятую" />
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditAideData',
  props: ['openEditDialog'],
  emits: ['openEditDialog']

})
</script>

<style>

</style>
