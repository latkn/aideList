<template>
  <q-page class="flex-center">
    <h3>Добавить группу</h3>
             <!-- <q-separator /> -->
      <q-card class="my-card q-pa-xl shadow-10">
          <div class="items-start">
            <q-form class="q-gutter-sm">
                <q-input class="input" outlined v-model="text" label="Название" />
                <q-input class="input" outlined v-model="text" type="textarea" label="Описание учебного заведения. Специализация" />
                <q-input class="input" outlined v-model="text" label="Ссылка на группу" type="url" hint="URL" />
                <q-input class="input" outlined v-model="text" label="Город" />
                <q-card-actions>
                  <q-btn color="primary" align="right">Добавить</q-btn>
                </q-card-actions>
            </q-form>
          </div>
      </q-card>
  </q-page>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style lang="sass" scoped>
.my-card
  width: 80%
  max-width: 800px

.input
  width: 100%
</style>
