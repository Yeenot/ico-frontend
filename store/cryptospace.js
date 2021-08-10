import Vue from 'vue'
const { faqs } = require('~/external/data/faqs.js')
const state = () => ({
  platforms: [
  	{
  		label: 'All',
  		value: ''
  	},
  	{
  		label: 'Facebook',
  		value: 'facebook'
  	},
  	{
  		label: 'Youtube',
  		value: 'youtube'
  	}
  ],

  platformOptions: {
  	key: 'label'
  }
})

const getters = {
}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
