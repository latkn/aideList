<template >
      <q-card class="my-card q-my-sm" style="width: 80%" flat bordered>
        <q-card-section horizontal class="q-pb-none">
          <q-card-section>
             <q-img
              class="col-5"
              :src="aide.avatar"
              width="100px"
              />
          </q-card-section>

            <q-card-section>
              <q-card-section class="text-h6 q-pa-sm">
                {{aide.name}}
              </q-card-section>

              <q-card-section class="text-body2 q-pa-sm">
                {{aide.describe}}
              </q-card-section>
             </q-card-section>

             <q-card-section class="text-h3 text-grey-5">
               {{aide.place}}
             </q-card-section>

        </q-card-section>
          <q-card-section class="q-pa-sm">
            <template v-for="(sub, id) of aide.subjects" :key=id>
              <q-chip square color="green" text-color="white" size="sm" class="q-ma-xs" >
                {{sub.toUpperCase()}}
              </q-chip>
            </template>
          </q-card-section>

      <q-separator/>
        <q-card-section horizontal class="full-width items-center justify-between" v-if="isGroupEditor">
          <q-card-section>
            Дата последней оплаты: {{aide.dateOfPayment}}
          </q-card-section>
          <q-card-section>
            Оплачено до: {{aide.dateOfPaymentEnd}}
          </q-card-section>
          <!-- <q-space /> -->
          <q-card-section>
            <q-btn color="red" label="" icon-right="block"></q-btn>
          </q-card-section>
          <q-card-section>
            <slot></slot>
          </q-card-section>

        </q-card-section>

      </q-card>
    </template>



<script>
  export default {
    props: {
      aide: {
        type: Object
      },
      isGroupEditor: {
        type: Boolean,
        default: false
      }
    },


  }
</script>
