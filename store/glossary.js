import Vue from 'vue'
import GLOSSARY from '@/api/glossary.js'

var { keywords } = require('~/external/data/glossary.js')
var Cookies = require('js-cookie')

const state = () => ({
  keywords,
})

const getters = {
}

const mutations = {
	SET_KEYWORDS(state, keywords) {
    // state.keywords = keywords
	}
}

const actions = {
 getKeywords({ commit, state, dispatch }) {
    return distpatch(`REQUEST`, GLOSSARY.GET())
  },

  saveKeyword({ commit, state, dispatch, rootState }, params) {
    const token = rootState.auth.token
    return dispatch(`REQUEST`, GLOSSARY.SAVE(params, token))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
