import { magnetar } from '../../config/magnetar'
import { Notify } from 'quasar'


const users = magnetar.collection('users')
const aide = magnetar.collection('aide')
const groups = magnetar.collection('groups')


const actions = {
  async addGroup({commit, dispatch}, formData) {
    // console.log(formData);
    const uid = await dispatch('auth/getUid', null, { root: true })
    // debugger
    try {
      await groups.doc(formData.id).insert(formData)
      const groupsFromDb = await users.doc(uid).fetch()

      const myGroups = {}
      if (groupsFromDb.admin) {
        myGroups.admin = groupsFromDb.admin
        if (!myGroups.admin.includes(formData.id)) {
          myGroups.admin.push(formData.id)
        }
      } else {
        myGroups.admin = [formData.id]
      }
      await users.doc(uid).assign(myGroups)
      Notify.create(`Данные сохранены`)


    } catch (error) {
      console.error(error);
    }
  },


  async fetchGroups({commit, dispatch}) {
    try {
      const AllGroups = await groups.fetch()
      return AllGroups
    } catch (error) {
      console.error(error);
    }
  },

  async fetchAides ({commit, dispatch}, groupId) {
    try {
      const allAides = await groups.doc(groupId).collection('aides').fetch()
      return allAides
      } catch (error) {
      console.error(error);
    }
  },
  async fetchGroupInfo ({commit, dispatch}, groupId) {
    try {
      const groupInfo = await groups.doc(groupId).fetch()
      return groupInfo
      } catch (error) {
      console.error(error);
    }
  },
  async declineAide({commit, dispatch}, {aideId, groupId}) {
    try {
      // console.log(aideId, groupId);
      await groups.doc(groupId).collection('aides').doc(aideId).merge({status: 'decline'})
      await groups.doc(groupId).collection('aides').doc(aideId).delete()
      Notify.create(`Пользователь ${aideId} удалён`)


      } catch (error) {
      console.error(error);
    }
  },

  async acceptAide({commit, dispatch}, {aideId, groupId}) {
    try {
      console.log(aideId, groupId);
      await groups.doc(groupId).collection('aides').doc(aideId).merge({status: 'confirmed'})
      Notify.create(`Пользователь подтверждён`)
      } catch (error) {
      console.error(error);
    }
  },

  async changeAidePlace({commit, dispatch}, {aideId, aidePlace, groupId}) {
    try {
      // console.log(aideId, groupId);
      await groups.doc(groupId).collection('aides').doc(aideId).merge({place: aidePlace})
      Notify.create(`Позиция в списке обновлена`)

      } catch (error) {
      console.error(error);
    }
  },

  async savePrices({commit, dispatch}, {prices, groupId}) {
    try {
      await groups.doc(groupId).merge({prices: prices})
      Notify.create(`Настройки цен сохранены`)
    } catch (error) {
      console.error(error);
    }
  }



}


export default {
  namespaced: true,
  actions
}
