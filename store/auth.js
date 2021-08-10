import Vue from 'vue'
import {
	USER as USER
} from '@/api/index'

var Cookies = require('js-cookie')

const state = () => ({
  user: {
    email: ''
  },
  token: ''
})

const getters = {
}

const mutations = {
	SET_USER(state, email) {
		state.user.email = email
	},
	SET_TOKEN(state, token) {
		state.token = token
	}
}

const actions = {
 loginUser({ commit, state, dispatch }, params) {
 	const credentials = params.credentials
    dispatch(`REQUEST`, USER.LOGIN(credentials.email, credentials.password)).then((response) => {
      if (response.statusText === 'OK') {
        const data = response.data
        commit('SET_TOKEN', data.token)
        commit('SET_USER', credentials.email)
        Cookies.set('user', credentials.email, { expires: 1 });
        Cookies.set('token', data.token, { expires: 1 });
        params.success()
      }
    }).catch((error) => {
    })
  },

  logout({ commit, state }) {
    Cookies.remove('user');
    Cookies.remove('token');
    commit('SET_TOKEN', '')
    commit('SET_USER', '')
  },

  me({ commit, state, dispatch }) {
    return dispatch(`REQUEST`, USER.ME())
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
