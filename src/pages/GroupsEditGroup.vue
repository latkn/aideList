<template>
<div>
  <div class="text-h3 q-my-md">
    Список исполнителей
  </div>
  <div class="row justify-between" style="width: 80%">
    <q-btn align="between" class="btn-fixed-width" color="black"
    label="Настройки ценовой политики" icon="settings" @click="isPricesSettingsOpen=true"/>
    <!-- <q-space/> -->
    <q-btn align="between" class="btn-fixed-width" color="black"
      label="Настройки группы" @click="isEditGroupDataDialogOpen=true"/>
    <q-btn align="between" class="btn-fixed-width" color="black"
      label="Заявки на размещение" @click="isRequestDialogOpen=true"/>
  </div>

  <groups-edit-prices
  v-model:isPricesSettingsOpen="isPricesSettingsOpen"
  @isPricesSettingsOpen="isPricesSettingsOpen=false"
  :groupId="groupId"/>
  <q-dialog v-model="isEditGroupDataDialogOpen">
      <edit-group-data :groupInfo=groupInfo @close="isEditGroupDataDialogOpen=false">
        <template v-slot:header>
          <q-card-section class="row items-center q-pb-xs">
            <div class="text-h6">Редактировать данные группы</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
        </template>
      </edit-group-data>
    </q-dialog>

  <q-dialog v-model="isRequestDialogOpen" full-width full-height >
    <q-card color="grey" class="q-gutter-lg">
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Заявки в группу</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <!-- <div v-if="allAides != undefined"> -->
          <div v-for="aide of requestSentAides" :key="aide.id">
            <aide-card
              :aide="aide"
              :isGroupEditor="false"
            >
            <q-btn label="Отклонить" color="red" class="q-mr-xs on-right" @click="declineAide(aide.id)"/>
            <q-btn label="Подтвердить" color="primary" class="q-mr-xs on-right" @click="acceptAide(aide.id)"/>
            </aide-card>
          </div>
        <!-- </div> -->
      </q-card-section>
      <q-card-section>
      </q-card-section>
    </q-card>


  </q-dialog>

  <p>Нумерованные места</p>
  <div  v-for="aide of numberedAides" :key="aide.place">
    <aide-card
      :aide="aide"

    >
      <q-card-section horizontal class="full-width items-center justify-between">
        <q-form @submit="changeAidePlace(aide.id, aide.place)" class="row col-8 q-gutter-md"  >
          <q-select outlined v-model="aide.place" :options="places" label="Позиция" style="flex: 0 0 200px" />
          <q-btn type="submit" rounded icon="update">
            <q-tooltip class="bg-accent">Обновить</q-tooltip>
          </q-btn>
        </q-form>
          <!-- <q-card-section>
            Дата последней оплаты: {{aide.dateOfPayment}}
          </q-card-section>
          <q-card-section>
            Оплачено до: {{aide.dateOfPaymentEnd}}
          </q-card-section> -->
          <!-- <q-space /> -->
          <!-- <q-card-actions> -->
            <q-btn  icon="delete"  @click="declineAide(aide.id)"></q-btn>
          <!-- </q-card-actions> -->

        </q-card-section>

    </aide-card>
  </div>

  <p>Рандомные места:</p>
  <div  v-for="aide of unnumberedAides" :key="aide">
      <aide-card :aide="aide">
        <q-card-section horizontal class="full-width items-center justify-around">
        <q-form @submit="changeAidePlace(aide.id, aide.place)" class="row col-8 q-gutter-md" >
          <q-select outlined v-model="aide.place" :options="places" label="Позиция" />
          <q-btn type="submit" rounded icon="update">
            <q-tooltip class="bg-accent">Обновить</q-tooltip>
          </q-btn>
        </q-form>
          <!-- <q-card-section>
            Дата последней оплаты: {{aide.dateOfPayment}}
          </q-card-section>
          <q-card-section>
            Оплачено до: {{aide.dateOfPaymentEnd}}
          </q-card-section> -->
          <!-- <q-space /> -->
          <!-- <q-card-actions> -->
            <q-btn  icon="delete"  @click="declineAide(aide.id)"></q-btn>
          <!-- </q-card-actions> -->

        </q-card-section>
      </aide-card>
  </div>
</div>


</template>

<script>
import {ref, reactive, computed, onMounted, onUpdated, watch} from 'vue'
import AideCard from 'src/components/AideCard.vue'
import _ from 'lodash';
// import lodash from 'lodash';
import { useStore, toRefs, mapGetters } from 'vuex';
import { useRoute } from 'vue-router';

import GroupsEditPrices from './GroupsEditPrices.vue'
import EditGroupData from 'src/components/EditGroupData.vue';



export default {
props: {
  id: {
    type: [String, Number],
    default: null,
  },
},

setup () {
    const store = useStore()
    const route = useRoute()

    const groupId = route.params.id
    const isRequestDialogOpen = ref(false)
    const isEditGroupDataDialogOpen = ref(false)
    const isPricesSettingsOpen = ref(false)


    const aides = ref()
    const allAides = ref([])
    const groupInfo = ref()


    onMounted(async()=> {
      aides.value = await store.dispatch('groups/fetchAides', groupId)
      aides.value.forEach((aide)=> allAides.value.push(aide))
      groupInfo.value = await store.dispatch('groups/fetchGroupInfo', groupId)
      // console.log(groupInfo.value);
      })

    // async function fetchAides() {


    // }


    const requestSentAides = computed(() => {
      // debugger
      // if (allAides.value) {
        return allAides.value.filter((aide) => aide.status == 'requestSent')

      // }
    })

    // if (allAides.value.hasOwnProperty('place')) {

    const confirmedAides = computed(() => {
      return allAides.value.filter(aide => aide.status == 'confirmed')
    })

    //отображение списка
     const numberedAides = computed(() => {
        const filteredList = confirmedAides.value.filter(
          aide => aide.place != 'random'
        )
        return _.sortBy(filteredList, [(o)=> o.place])
      })

      function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          }

      const unnumberedAides = computed(() => {
        const filteredList = confirmedAides.value.filter(
          aide => aide.place == 'random'
        )
        shuffle(filteredList)
        return filteredList
      })
    // }


    const declineAide = async(aideId) => {
      await store.dispatch('groups/declineAide', {aideId, groupId })
      // fetchAides()
      // const index = confirmedAides.value.findIndex((a) => a.id == aideId)
      // confirmedAides.value.splice(index, 1)
      // console.log(confirmedAides.value);
    }


    const acceptAide = async(aideId) => {
      await store.dispatch('groups/acceptAide', {aideId, groupId})
    }

    const changeAidePlace = async(aideId, aidePlace) => {
      await store.dispatch('groups/changeAidePlace', {aideId, aidePlace, groupId})
      // console.log(aideId, aidePlace);
    }





    return {
      places: ['random', '1','2','3','4','5','6','7','8','9','10'],
      numberedAides, unnumberedAides, requestSentAides,
      allAides, groupInfo, groupId,
      isRequestDialogOpen, isEditGroupDataDialogOpen,
      declineAide, acceptAide,
      changeAidePlace, isPricesSettingsOpen

    }



  },

  components: {GroupsEditPrices, AideCard, EditGroupData}
}
</script>

<style>

</style>
