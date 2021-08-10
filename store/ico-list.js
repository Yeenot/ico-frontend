import Vue from 'vue'

const state = () => ({
  status: 'none'
})

const getters = {
}

const mutations = {
  ICO_LIST_STATUS: (state, status) => {
    state.status = status
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
