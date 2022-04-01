<template>
  <q-card style="max-width: 80%" class="q-my-xl">
    <q-card-section class="text-body1">
      Ваш аккаунт не подтверждён в данной группе. Отправьте запрос на подверждение
    </q-card-section>
    <q-card-section>
      <q-btn color="black" label="Отправить запрос"></q-btn>
    </q-card-section>
  </q-card>

  <q-btn @click="openEditDialog = !openEditDialog" label="Редактировать" icon="edit"></q-btn>
  <aide-card
    :aide="aideInfoForGroup"
    :isGroupEditor="false"
  >
  </aide-card>


  <q-dialog v-model="openEditDialog">
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
              <q-btn label="Отмена"  v-close-popup class="q-mt-md"
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

  <q-card style="max-width: 80%" class="q-my-xl">
    <q-card-section class="text-h6">
      Статистика
    </q-card-section>
    <q-card-section class="text-body1">
      Количество переходов в этом месяце: 54
    </q-card-section>
    <q-card-section class="text-body1">
      Оплачено до: 27.04.2022
    </q-card-section>
    <q-card-section class="text-body1">
      Дата последней оплаты:  27.03.2022
    </q-card-section>
    <q-card-section class="text-body1">
      Ваша позиция в списке:  RANDOM
    </q-card-section>

  </q-card>






  <!-- <q-card>
    <q-card-section>
      Условия аукциона:

    </q-card-section>
    <q-card-section>
      Аукцион закрыт. Откроется 27 апреля 2012
    </q-card-section>
    <q-card-section>
      Аукцион закрыт
    </q-card-section>
  </q-card> -->





</template>

<script>
import {ref} from 'vue'
import AideCard from 'src/components/AideCard.vue'


export default {

  setup() {
    let subjects = ref('')
    let describe = ref('')
    let link = ref('')
    let companyName = ref('')

    let openEditDialog = ref(false)



    const submitHandler = () => {
      console.log(subjects.value.split(','), link.value.split(','), companyName.value.split(','));

    }

    let aideInfoForGroup = {
         place: 1,
         name: 'Компания Зубрила',
         link: 'https://vk.com/kursovye_ekb',
         describe: 'Наши преимущества: Любим своих клиентов, За 10 лет помогли более 300 000 студентам! Рейтинг в 2GIS 4.7 Соответствие требованиям',
         subjects: ["Химия","Физика","Автодор","Электротех","Термех" ,"Детали машин","Машиностроение","Вся экономика","Бух.учет","Логистика","Высшая математика","Математическая статистика","Гидравлика","Сопромат","Метрология","ГМУ","Статистика","Геология","Экология","Философия","Информатика","Социология","История","Инвестиции","Менеджмент","Маркетинг","Проектная деятельность","Мировая экономика","Рынок труда","Основы корпоративного управления"],
         isBlocked: false,
         isConfirmed: true,
         isPaid: true,
         dateOfPayment: '01.04.2022',
         dateOfPaymentEnd: '31.04.2022',
         countOfClicks: 0,
         avatar: 'https://sun9-86.userapi.com/impf/9SOdrn2gPK5iiD6wo6MtXryRSqU95iwGJxvkcw/xf0oc8zDr_g.jpg?size=2160x2160&quality=96&sign=fde3fd3968b417f963fcd97a5a219f4a&type=album'
       }

    return {subjects, link, companyName, describe, submitHandler, aideInfoForGroup,
            openEditDialog
    }
  },

  components: {AideCard}
}
</script>

<style>

</style>
