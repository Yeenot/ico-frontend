import Vue from 'vue'
import { 
  ICOS,
  COIN_MARKET_API as COIN_MARKET_API
} from '@/api/index'
import ADMIN from '@/api/admin'

// initialization
const ico = ICOS

const state = () => ({
  match: {
    search: []
  },
  menu: {
    visible: false
  },
  spinner: false,
  modal: {
    show: false,
    heading: '',
  },
  alert: {
    subscribe: true,
    telegram: true,
    load: false
  },
  thankyou: false,
  hostname: process.env.baseUrl,
  categories: [],
  columns: {
    all: {},
    unassigned: [],
    filtered: [],
  },
  fields: {},
  headers: {
    selected: [
      { name: 'project-name' },
      { name: 'hard-cap' },
      { name: 'percentage-sold-to-public' },
      { name: 'marketcap-circulating-supply' },
      { name: 'marketcap-total-supply' },
      { name: 'nr-of-telegram-members' },
    ],
    fixed: [
      { name: 'project-name' },
      { name: 'hard-cap' },
      { name: 'percentage-sold-to-public' },
      { name: 'marketcap-circulating-supply' },
      { name: 'marketcap-total-supply' },
      { name: 'nr-of-telegram-members' }
    ],
    extra: [
    'token-symbol',
    'token-price-pegged-to',
    'soft-cap-pegged-to',
    'hard-cap-pegged-to',
    'total-token-supply',
    'presale-start',
    'presale-end',
    'crowdsale-start',
    'crowdsale-end'
    ],
    all: []
  },
  currencies: {
    pages: [
    'index'
    ],
    selected: '',
    type: [
    { label: 'Currency', value: ''},
    { label: 'USD', value: 'USD'},
    { label: 'EUR', value: 'EUR'},
    { label: 'ETH', value: 'ETH'},
    { label: 'BTC', value: 'BTC'}
    ],
    units: {
      'soft-cap-pegged-to': [
      'soft-cap'
      ],
      'hard-cap-pegged-to': [
      'hard-cap'
      ],
      'token-price-pegged-to': [
      'marketcap-circulating-supply',
      'marketcap-total-supply',
      'presale-tier-one-price-per-token',
      'presale-tier-two-price-per-token',
      'presale-tier-three-price-per-token',
      'presale-tier-four-price-per-token',
      'presale-tier-five-price-per-token',
      'tier-one-price-per-token',
      'tier-two-price-per-token',
      'tier-three-price-per-token',
      'tier-four-price-per-token',
      'tier-five-price-per-token',
      'tier-six-price-per-token'
      ]
    }
  }
})

const getters = {
  SELECTED_CURRENCY: (state) => {
    return state.currencies.selected
  }
}

const mutations = {

  THANK_YOU: (state, status) => {
    state.thankyou = status
  },

  SEARCH_MATCHES: (state, items) => {
    state.match.search = items
  },

  MENU: (state, menu) => {
    for (const key of Object.keys(menu)) {
      state.menu[key] = menu[key]
    }
  },

  SPINNER: (state, status) => {
    state.spinner = status
  },

  MODAL: (state, modal) => {
    state.modal = modal
  },

  MODAL_STATUS: (state, show) => {
    state.modal.show = show
  },
  
  ALERT: (state, alert) => {
    for (const key of Object.keys(alert)) {
      state.alert[key] = alert[key]
    }
  },

  ADD_CATEGORY: (state, name) => {
    state.categories.unshift({
      name,
      columns: []
    })
  },

  CATEGORIES: (state, list) => {
    state.categories = []
    list.forEach(item => {
      state.categories.push(item)
    })
  },

  COLUMNS: (state, list) => {
    state.columns.all = {}
    list.forEach((item, index) => {
      Vue.set(state.columns.all, item.name, item.heading)
    })
  },

  FIELDS: (state, list) => {
    state.fields = {}
    list.forEach((item, index) => {
      Vue.set(state.fields, item.name, item)
    })
  },

  HEADERS: (state, selected) => {
    state.headers.selected = []
    selected.forEach((item, index) => {
      state.headers.selected.push(item)
    })
  },

  UNASSIGNED: (state) => {
    const list = state.columns.all
    const assigned = []
    const unassigned = []
    const categories = state.categories
    categories.forEach(category => {
      const columns = category.columns
      columns.forEach(column => {
        assigned.push(column.name)
      })
    })
    for (const key of Object.keys(list)) {
      const item = list[key]
      const newItem = {
        name: key,
        heading: item
      }
      unassigned.push(newItem)
    }
    state.columns.unassigned = unassigned
    state.columns.filtered = unassigned
  }
}

const actions = {
  saveCategories: ({ commit, state, dispatch }, callback) => {
    let index = 1
    state.categories.forEach(category => {
      const columns = category.columns
      category.order = index
      let index2 = 1
      columns.forEach(column => {
        column.order = index2
        index2++
      })
      index++
    })

    return dispatch(`REQUEST`, ADMIN.SETTINGS.SAVE_CATEGORIES(state.categories)).then((response) => {
      if (response.statusText === 'OK') {
        if (callback.success) {
          callback.success()
        }
      }
    }).catch((error) => {
    })
  },

  getCategories: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, ico.CATEGORIES()).then((response) => {
      if (response.statusText === 'OK') {
        commit('CATEGORIES', response.data)
      }
    }).catch((error) => {
    })
  },

  getFields: ({ commit, dispatch, state }) => {
    return dispatch(`REQUEST`, ico.FIELDS()).then((response) => {
      if (response.statusText === 'OK') {
        commit('FIELDS', response.data)
      }
    }).catch((error) => {
    })
  },

  getColumns: ({ commit, dispatch, state }) => {
    return dispatch(`REQUEST`, ico.FIELDS()).then((response) => {
      if (response.statusText === 'OK') {
        commit('COLUMNS', response.data)
        commit('UNASSIGNED')
      }
    }).catch((error) => {
    })
  },

  removeCategory: ({ commit, state, dispatch }, index) => {
    if (index > -1) {
      Vue.delete(state.categories, index)
    }
    commit('UNASSIGNED')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
