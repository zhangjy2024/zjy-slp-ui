const state = {
  currentGroupId: '',
}

const mutations = {
  setCurrentGroup(state, param) {
    state.currentGroupId = param;
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}