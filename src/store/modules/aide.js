import { magnetar } from '../../config/magnetar'

const users = magnetar.collection('users')
// const aide = magnetar.collection('aide')
const groups = magnetar.collection('groups')

const activeGroups = magnetar.collection('groups', {
  where: [['link', '==', 'https://vk.com/usurt_study']]
})
// console.log('activeGroups: ',activeGroups);

const actions = {
  async updateAideInfo({commit, dispatch}, formData) {
    try {
      const uid = await dispatch('auth/getUid', null, { root: true })
      // console.log(formData);
      await users.doc(uid).assign({aide: formData})
    } catch (e) {
      console.error(e);
    }
  },

  async fetchAideInfo({commit, dispatch}) {
    try {
      const uid = await dispatch('auth/getUid', null, { root: true })
      const aideData = await users.doc(uid).fetch()
      // console.log(aideData);
      return aideData.aide
    } catch (error) {
      console.error(e);

    }
  },
  async fetchGroupInfo({commit, dispatch}, groupId) {
    try {

      // const uid = await dispatch('auth/getUid', null, { root: true })
      const clubInfo = await groups.doc(groupId).fetch()
      // console.log(aideData);
      return clubInfo
    } catch (error) {
      console.error(e);

    }
  },

  async checkAideInfoInGroup({commit, dispatch}, {groupId, aideId}) {
    try {
      // const uid = await dispatch('auth/getUid', null, { root: true })
      const aideData = await groups.doc(groupId).collection('aides').doc(aideId).fetch()
      // debugger
      // console.log(aideData);
      return aideData
    } catch (error) {
      console.error(error);

    }
  },

  async sendRequest({commit, dispatch}, aide) {
    try {
      // console.log(aide);
      await groups.doc(aide.groupId).collection('aides').doc(aide.id).insert(aide)
    } catch (e) {
      console.error(e);
    }
  },

  async fetchActiveGroups({commit, dispatch}, {aideId, groupId}) {
    try {
      // console.log(aideId, groupId);
      debugger
     await activeGroups.fetch()
     console.log(activeGroups.data.values());


      // const isActive = await groups.doc(groupId).collection('aides').doc(aideId).fetch()
      // // console.log(isActive);
      // if (isActive) {
      //   return true
      // } else {
      //   return false
      // }
      // const activeGroups = magnetar.collectionGroup('groups/*/aides').where('type','==', aideId)
      // console.log(activeGroups);
    } catch (e) {
      console.error(e);
    }
  },


}




export default {
  namespaced: true,
  actions
}
