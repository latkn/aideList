<template>
  <q-dialog v-model="isPricesSettingsOpen" no-backdrop-dismiss>
      <q-card class="my-card q-pa-lg shadow-10" style="max-width: 50%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h5">Редактирование стоимости</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="$emit('update:isPricesSettingsOpen', false)" />
          </q-card-section>

        <q-form @submit="submitHandler">
            <q-card-section>
              <label for="">Базовая стоимость</label>
              <q-input outlined v-model="prices.baseCost" style="width: 20%" type="number" suffix="&#8381;" />
            </q-card-section>

            <q-separator/>

            <q-card-section class="text-h5">
            Время начала и завершения аукциона
            </q-card-section>

            <q-card-section horizontal class="items-center" >
              <q-card-section>
                <label for="">Открывать за</label>
                <q-select outlined v-model="prices.daysBeforeOpen" :options="daysBeforeOpenOptions" />
                <p>дней до конца месяца</p>
              </q-card-section>

              <q-card-section >
                <q-card-section>
                  <label for="">Время открытия</label>
                  <q-input filled v-model="prices.timeStart" mask="time" :rules="['time']" style="width: 50%">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="prices.timeStart">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                </q-card-section>

                <q-card-section>
                  <label for="">Время закрытия</label>
                  <q-input filled v-model="prices.timeEnd" mask="time" :rules="['time']" style="width: 50%">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="prices.timeEnd">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                </q-card-section>
              </q-card-section>

            </q-card-section>

            <q-separator/>


            <q-card-section class="text-h5">
            Параметры аукциона
            </q-card-section>

            <q-card-section horizontal>
              <q-card-section>
                <label for="">Шаг аукциона</label>
                <q-input outlined v-model="prices.step" style="width: 50%" type="number" suffix="&#8381;" />
              </q-card-section>
              <q-card-section >
                  <label for="">Количество мест в аукционе: {{prices.places.length}}</label>
                  <!-- <q-input outlined v-model="placeNumbers" style="width: 50%" type="number"/> -->
              <q-btn-group push>
                  <q-btn push label="-"  @click="removeLastPlace" :disabled="prices.places.length==0"/>
                  <q-btn push label="+" @click="addPlace" />
              </q-btn-group>
              </q-card-section>
            </q-card-section>


            <template
            v-for="p in prices.places"
            :key="p.place"

            >
              <q-card-section class="q-py-xs text-h6">
                {{p.place}} место
              </q-card-section>
              <q-card-section horizontal >
                  <q-card-section>
                    <label for="">Минимальная стоимость</label>
                    <q-input outlined v-model="p.minCost" style="width: 50%" type="number" suffix="&#8381;" />
                  </q-card-section>

                  <q-card-section>
                    <label for="">Блиц цена</label>
                    <q-input outlined v-model="p.blitsCost" style="width: 50%" type="number" suffix="&#8381;" />
                  </q-card-section>
              </q-card-section>
            </template>

      <q-card-action>
      <div class="row justify-start">
          <q-btn
            v-close-popup
            class="q-mx-sm q-mt-xl"
            @click="$emit('update:isPricesSettingsOpen', false)"
            label="Отмена"
          />
          <q-btn
            type="submit"
            :loading="submitting"
            label="Сохранить"
            class="q-mx-sm q-mt-xl"
            color="teal"

          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </q-card-action>
      </q-form>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue'
import {ref, reactive, computed, watch} from 'vue'
import { useStore } from 'vuex'


export default defineComponent({
  name: 'GroupsEditprices',
  props: ['isPricesSettingsOpen', 'groupId'],
  emits: ['isPricesSettingsOpen'],

  setup(props, {emit}) {
    const store = useStore()
    const submitting = ref(false)
    const daysBeforeOpenOptions = [1,2,3,4,5,6,7,8,9,10]
    // const placeNumbers = 6

    const prices = ref({
      step: 100,
      baseCost: 500,
      timeStart: '11:00',
      daysBeforeOpen: 5,
      timeEnd: '15:00',
      places: [
        {
          place: 1,
          minCost: 1000,
          blitsCost: 4000
        },
        {
          place: 2,
          minCost: 800,
          blitsCost: 3000
        },
        {
          place: 3,
          minCost: 700,
          blitsCost: 2000
        },
        {
          place: 4,
          minCost: 700,
          blitsCost: 2000
        },
        {
          place: 5,
          minCost: 700,
          blitsCost: 2000
        },
        {
          place: 6,
          minCost: 700,
          blitsCost: 2000
        },
      ],
      placesLength: 6
    })



    const addPlace = () => {
      prices.value.placesLength++
      prices.value.places.push({
        place: prices.value.placesLength,
        minCost: 700,
        blitsCost: 2000
      })
    }

    const removeLastPlace = () => {
      prices.value.placesLength--
      prices.value.places.splice(-1)
    }

    const submitHandler = async() => {
      submitting.value = true
      // console.log(prices.value);
      await store.dispatch('groups/savePrices', {prices: prices.value, groupId: props.groupId })
      submitting.value = false
      emit('isPricesSettingsOpen', false)
    }

    return {
      prices,
      addPlace, removeLastPlace, daysBeforeOpenOptions,
      submitHandler, submitting


    }


  },

})
</script>
