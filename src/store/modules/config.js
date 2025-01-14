const state = {
  VConfig: {},
  appTitle: '智学平台'
}

const mutations = {
  SET_VCONFIG(state, data) {
    state.VConfig = Object.assign(state.VConfig, data)
  },
  SET_APPTITLE(state, data) {
    state.appTitle = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
