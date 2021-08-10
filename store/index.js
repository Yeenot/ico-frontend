import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  ICOS as ICOS,
  COIN_MARKET_API as COIN_MARKET_API,
  USER as USER
 } from '@/api/index'
import icos from '@/store/icos'
import all from '@/store/v2/all'
import v2Icos from '@/store/v2/icos'
import admin from '@/store/admin'
import settings from '@/store/settings'
import auth from '@/store/auth'
import glossary from '@/store/glossary'
import blog from '@/store/blog'
import icolist from '@/store/ico-list'
import social from '@/store/social'
import faq from '@/store/faq'
import cryptospace from '@/store/cryptospace'

var Cookie = require('cookie')
var Cookies = require('js-cookie')

//initialization
// const coin_market = COIN_MARKET_API

Vue.use(Vuex)

const state = () => ({
  public: {
    token: null
  },
  empties: [
    "-",
    "?"
  ]
})

const getters = {

}

const mutations = {
  ACCESS_TOKEN(state, token) {
    state.public.token = token
  }
}

const actions = {

  REQUEST({ commit, state, rootState }, { method, url, data, headers, options }) {

    if (!headers) {
      headers = {}
    }

    if (options) {
      if (options.auth) {
        headers['Authorization'] = `Bearer ${rootState.auth.token}`
      }
    }
    return axios({
      method,
      url,
      data,
      headers
    })
  },

  async nuxtServerInit({ commit, state, dispatch }, { req, res }) {
    const serverRes = {
      cookies: {}
    }
    const resHeaders = res.getHeaders()
    if (Object.keys(resHeaders).length > 0) {
      const setcookie = resHeaders['set-cookie']
      if (setcookie) {
       setcookie.forEach(cookieStr => {
        const cookieInfo = cookieStr.split(';')
        const cookie = cookieInfo[0]
        const pair = cookie.split('=')
        serverRes.cookies[pair[0]] = pair[1]
      })
     }
   }

    const cookieStr = req.headers.cookie;
    const cookies = Cookie.parse(cookieStr || '') || {};
    const user = cookies.user;
    const token = cookies.token;

    let serverCookies = {}
    for (const key of Object.keys(cookies)) {
      if (cookies[key]) {
        serverCookies[key] = cookies[key]
      } else {
        if (serverRes.cookies[key]) {
          serverCookies[key] = serverRes.cookies[key]
        }
      }
    }

    if (serverCookies['columns']) {
      const columns = JSON.parse(serverCookies['columns'])
      commit('MAIN', columns)
    }
    // if (serverCookies['access_token']) {
    //   commit('ACCESS_TOKEN', serverCookies['access_token'])
    // }

    let response = await dispatch(`REQUEST`, ICOS.ALL())

    if (response.statusText === 'OK') {
      commit(`ALL_ICOS`, response.data.data)
    }

  //   commit('SET_USER', user)
  //   commit('SET_TOKEN', token)
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      icos,
      all,
      v2Icos,
      admin,
      settings,
      auth,
      glossary,
      blog,
      icolist,
      social,
      faq,
      cryptospace
    }
  })
}

export default createStore
