<template>
  <h6>Редактирование группы кабинет исполнителя</h6>
  <q-card style="max-width: 80%" class="q-my-xl" flat bordered >
    <div v-if="aide.status!='requestSent' && aide.status!='confirmed'">
      <q-card-section class="text-body1">
        Ваш аккаунт не подтверждён в данной группе. Отправьте запрос на подверждение
      </q-card-section>
      <q-card-section>
        <q-btn color="black" label="Отправить запрос" @click="sendRequest"></q-btn>
      </q-card-section>
    </div>
  <!-- </q-card> -->
  <!-- <q-card  style="max-width: 80%" class="q-my-xl"> -->
    <q-card-section v-if="aide.status=='requestSent'">
      Запрос отправлен
    </q-card-section>
    <q-card-section v-if="aide.status=='confirmed'">
      Ваша страница подтверждена
    </q-card-section>
    <q-card-section>
      Статус в группе: {{aide.status}}
    </q-card-section>
  </q-card>



   <div class="q-py-xs row" style="width: 80%">
      <div class="text-h6" v-if="aideFromGroup">Ваша карточка в группе:</div>
      <div class="text-h6" v-if="!aideFromGroup">Отредактируйте или отправьте сразу на проверку:</div>
        <q-space/>
        <q-btn @click="openEditDialog = !openEditDialog" label="Редактировать" icon="edit"></q-btn>
        <edit-aide-data
        v-model:openEditDialog="openEditDialog"
        :aide="aide"
        />
      </div>
    <aide-card :aide="aide"/>


    <div class="row" style="width: 100%" >
      <q-card  class="q-my-md q-mr-md col-7" flat bordered v-if="!loading && prices">
        <q-card-section class="text-h6">
          Цены:
        </q-card-section>
        <q-card-section class="text-body1">
         Цена за размещение: {{$filters.currency(prices.baseCost)}} в месяц <br/>
        <!-- </q-card-section> -->
        <!-- <q-card-section class="text-body1" > -->
         Аукцион открывается за {{prices.daysBeforeOpen}} дней до конца месяца. <br/>
         Время открытия: {{prices.timeStart}} <br/>
         Время закрытия: {{prices.timeEnd}} <br/>
         Шаг аукциона: {{$filters.currency(prices.step)}}<br/>
         Цены за первые {{prices.placesLength}} мест: <br/>

          <div v-for="place in prices.places" :key="place">
            {{place.place}}: Минимальная цена:{{$filters.currency(place.minCost)}} | Блиц цена: {{$filters.currency(place.blitsCost)}}
          </div>
        </q-card-section>
      </q-card>

      <q-card  class="q-my-md col-4" flat bordered>
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
    </div>

</template>

<script>
import { defineComponent, ref, reactive, onMounted} from 'vue'
import { useStore } from 'vuex'
import GroupCard from 'src/components/GroupCard.vue'
import EditAideData from '../components/EditAideData.vue'
import AideCard from '../components/AideCard.vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'Aide__EditGroup',
  // props: {
  // id: {
  //   type: [String, Number],
  //   default: null,
  //   },
  // },
  setup() {
    const $q = useQuasar()
    $q.loadingBar.setDefaults({
      color: 'purple',
      size: '15px',
      position: 'bottom'
    })
    const loading = ref(false)

    const store = useStore()
    let openEditDialog = ref(false)
    const aideFromTemplate = ref({});
    const aideFromGroup = ref({});
    const aide = ref({})
    const route = useRoute();

    const groupId = route.params.id
    const groupInfo = ref({})

    const prices = ref({})

    onMounted(async()=> {

      $q.loadingBar.start()

      groupInfo.value = await store.dispatch('aide/fetchGroupInfo', groupId)
      console.log(groupInfo.value.prices);

      prices.value = groupInfo.value.prices

      // const {daysBeforeOpen} = prices.value

      checkAideInfo()
      $q.loadingBar.stop()


    })
      // console.log(prices.value);

    const checkAideInfo = async() => {
      aideFromTemplate.value = await store.dispatch('aide/fetchAideInfo')
      const aideId = aideFromTemplate.value.id
      // debugger
      // console.log(userId.value)


      aideFromGroup.value = await store.dispatch('aide/checkAideInfoInGroup', {groupId, aideId})
      // debugger

        // debugger
      if (aideFromGroup.value) {
        aide.value = aideFromGroup.value
        // console.log('status: ',aide.value.status);
      } else {
        aide.value = aideFromTemplate.value
      }
      //шаблон из юзер
      // console.log(aide.value);
    }



    const sendRequest = async() => {
      aide.value.groupId = route.params.id
      aide.value.status = 'requestSent'
      aide.value.place = 'random'
      await store.dispatch('aide/sendRequest', aide.value)
      checkInfo()
    }


    return { openEditDialog, aide, sendRequest, aideFromTemplate, aideFromGroup, groupInfo,
    loading,
    prices,
    // loading: $q.loadingBar.isActive
    }
  },
  components: {GroupCard, EditAideData, AideCard}
})
</script>

<style>
.flex-grow {
  flex-grow: 1
}

</style>
