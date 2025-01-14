import { currentUser } from '@/api/user'

const state = {
  currentUser: {},
}

const mutations = {

  setCurrentUser(state, data) {
    state.currentUser = data
  },

}

const actions = {

  initCurrentUser({ commit }, data){
    currentUser(data).then((res) => {
      commit('setCurrentUser', res.data.data)
    }).finally(() => {

    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}