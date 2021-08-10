import Vue from 'vue'
import { 
  SOCIAL as SOCIAL
} from '@/api/index'

const state = () => ({
  
  selected: {
    interval: 'total',
    filter: 'active,upcoming'
  },
  types: [
    { 
      value: 'telegram',
      unit: 'members'
    },
    { 
      value: 'facebook',
      unit: 'followers'
    },
    { 
      value: 'twitter',
      unit: 'followers'
    },
    { 
      value: 'alexa',
      unit: 'rank'
    }
  ],
  filter: [
    { label: 'Ongoing', value: 'active' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Ongoing&Upcoming', value: 'active,upcoming' },
    { label: 'Past', value: 'past' },
    { label: 'All', value: '' }
  ],

  intervals: [
    'total',
    'weekly',
    'daily'
  ],
  stats:[]
})

const getters = {
}

const mutations = {
  
  SOCIAL: (state, stats) => {
    state.stats = []
    state.stats = stats
  },

  INTERVAL: (state, interval) => {
    state.selected.interval = interval
  },

  FILTER: (state, filter) => {
    state.selected.filter = filter
  }
}

const actions = {
  getSocial({ commit, state, dispatch}, params) {
    return dispatch(`REQUEST`, SOCIAL.GET(params)).then((response) => {
      if (response.statusText === 'OK') {
        commit(`SOCIAL`, response.data)
      }
    }).catch((error) => {
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}