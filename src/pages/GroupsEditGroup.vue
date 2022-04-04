<template>
<div>
  <groups-edit-auction v-model:isAuctionSettingsOpen="isAuctionSettingsOpen"/>
  <div class="text-h3 q-my-md">
    Список исполнителей
  </div>
  <q-btn align="between" class="btn-fixed-width" color="accent"
  label="Настройки ценовой политики" icon="settings" @click="isAuctionSettingsOpen=true"/>



  <div  v-for="aide of numberedAides" :key="aide.place">
    <aide-card
      :aide="aide"
      :isGroupEditor="true"
    >
      <q-select outlined v-model="aide.place" :options="places" label="Позиция" style="max-width: 300px" />

    </aide-card>
  </div>


  <div  v-for="aide of unnumberedAides" :key="aide">
      <aide-card
        :aide="aide"
        :isGroupEditor="true"
      >
    <!-- <p>Random {{aide.RandomPlace}}</p> -->
    <q-select outlined v-model="aide.place" :options="places" label="Позиция" style="max-width: 300px" />
      </aide-card>
  </div>
</div>


</template>

<script>
import GroupsEditAuction from './GroupsEditAuction.vue'
import {ref, computed, onMounted, onUpdated} from 'vue'
import AideCard from 'src/components/AideCard.vue'
import _ from 'lodash';
import lodash from 'lodash';
import { useStore, toRefs, reactive, mapGetters } from 'vuex';



export default {
  setup () {
    const store = useStore()

    // const  aideList = reactive(store.getters.aideList)

    const aideList = ref(store.state.aideList.aideList)

    // const aideList = computed(()=> {
    //  store.state.aideList.aideList

    // })


    console.log(aideList);
    console.log(store.state.aideList.aideList);


    const numberedAides = computed(() => {
      const filteredList = aideList.value.filter(
        aide => aide.place != 'random'
      )
      return lodash.sortBy(filteredList, [(o)=> o.place])
    })



    function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }

    const unnumberedAides = computed(() => {
      const filteredList = aideList.value.filter(
        aide => aide.place == 'random'
      )
      shuffle(filteredList)

      return filteredList
    })

    return {
      isAuctionSettingsOpen: ref(false),
      places: ['random', '1','2','3','4','5','6','7','8'],
      numberedAides,
      unnumberedAides,

    }



  },

  components: {GroupsEditAuction, AideCard}
}
</script>

<style>

</style>
