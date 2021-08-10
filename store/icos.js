import Vue from 'vue'
import { 
  ICOS,
  cancelToken,
  MAIL as MAIL
} from '@/api/index'

const icosAPI = ICOS
const token = cancelToken

const state = () => ({
  list: [],
  fields: {},
  categories: [],
  filtered: [],
  collapse: {
    status: {}
  },
  realSearch: '',
  search: '',
  table: {
    selected: [],
    fixedHeaders: [],
    headers: [],
    isLoading: false,
    options: {
      query: '',
      page: 1,
      perPage: 15,
      filter: 'upcoming',
      convert: ''
    },

    settings: {
      perPage: [
      15, 30, 50
      ],
      limitOptions: {
        prefix: 'Limit'
      }
    },

    blacklist: [
    'project-description'
    ]
  },
  
  token: null,
  ico: [],

  count: {
    ongoing: 0,
    upcoming: 0,
    past: 0
  },

  options: {},

  time: {
    list: [
      { label: 'All', value: '' },
      { label: 'Ongoing', value: 'active' },
      { label: 'Upcoming', value: 'upcoming' },
      { label: 'Past', value: 'past' }
    ]
  },

  events: [],
  whitelist: []
})

const getters = {
  ICOLIST_OPTIONS: ( state, getters, rootState ) => {
    const options = state.table.options
    const selected = rootState.settings.headers.selected

    const main = []
    const extra = rootState.settings.headers.extra

    selected.forEach(item => {
      main.push(item.name)
    })

    const columns = main.concat(extra)
    options.cols = columns.join(',')
    return options
  },
}

const mutations = {

  WHITELIST: (state, list) => {
    const whitelist = []
    list.forEach(ico => {
      const name = ico.name
      const images = ico.images
      const details = ico.details
      const properties = {}
      if (details) {
        details.forEach(detail => {
          const key = detail.key
          const value = detail
          properties[key] = value
        })
      }
      whitelist.push(Object.assign({}, ico, {
        details: properties
      }))
    })
    state.whitelist = whitelist
  },

  SELECTED_CURRENCY: (state, value) => {
    state.table.options.convert = value
  },

  ICOLIST_OPTIONS: (state, options) => {
    state.table.options = options
  },

  TIME_LIST: (state, list) => {
    Vue.set(state.time, 'list', list)
  },

  TIME_STATUS: (state, status) => {
    Vue.set(state.table.options, 'filter', status)
  },

  ICOS: (state, icos) => {
    state.list = []
    icos.forEach((ico, index) => {
      state.list.push(ico)
    })
  },

  ICO: (state, ico) => {
    state.ico = ico;
  },

  EVENTS: (state, events) => {
    state.events = []
    state.events = events;
  },

  ICO_COUNT: (state, count) => {
    for(const key of Object.keys(count)) {
      const newKey = key
      if (key === 'active') {
        newKey = 'ongoing'
      }
      state.count[newKey] = count[key]
    }
  },

  TABLE_CATEGORIES: (state, categories) => {
    state.categories = []
    state.filtered = []
    const temp = []
    const hasCategories = []
    categories.forEach((category, index) => {
      const name = category.name
      const order = category.order
      const columns = category.columns

      const hold = []
      columns.forEach(column => {
        if (!state.table.blacklist.includes(column.name)) {
          hold.push({ name: column.name, heading: state.fields[column.name] })
          hasCategories.push(column.name)
        }
      })

      temp.push({
        name,
        order,
        columns: hold
      })
    })
    const others = {
      name: 'others',
      columns: []
    }
    for (const key of Object.keys(state.fields)) {
      const item = state.fields[key]
      if (!hasCategories.includes(key) && !state.table.blacklist.includes(key)) {
        others.columns.push({ name: key, heading: item })
      }
    }
    temp.push(others)
    state.categories = temp
    state.filtered = temp

    temp.forEach(item => {
      Vue.set(state.collapse.status, item.name, false)
    })
  },

  FIELDS: (state, fields) => {
    state.fields = {}
    fields.forEach((item, index) => {
      Vue.set(state.fields, item.name, item.heading)
    })
  },

  SET_DEFAULT_SELECTED: (state, selected) => {
    state.table.selected = []
    state.table.headers = []
    selected.forEach((item, index) => {
      state.table.selected.push({ name: item.name, heading: state.fields[item.name]})
      state.table.headers.push({ name: item.name, heading: state.fields[item.name]})
    })
  },

  FIXED_HEADERS: (state, selected) => {
    state.table.fixedHeaders = []
    selected.forEach((item, index) => {
      state.table.fixedHeaders.push({ name: item.name, heading: state.fields[item.name]})
    })
  },

  SELECTED: (state, selected) => {
    state.table.selected = []
    selected.forEach((item, index) => {
      state.table.selected.push(item)
    })
  },

  TABLE_HEADERS: (state, headers) => {
    state.table.headers = headers
  },

  OPTIONS: (state, response) => {
    state.options = {
      total: response.total,
      per_page: response.per_page,
      current_page: response.current_page,
      last_page: response.last_page,
      next_page_url: response.next_page_url,
      prev_page_url: response.prev_page_url,
      from: response.from,
      to: response.to
    }
  },

  QUERY: (state, query) => {
    state.table.options.query = query
  },

  SEARCH: (state, search) => {
    state.search = search
  },

  REAL_SEARCH: (state, search) => {
    state.realSearch = search
  }
}

const actions = {

  countIco: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, icosAPI.COUNT()).then((response) => {
      if (response.statusText === 'OK') {
        commit('ICO_COUNT', response.data)
      }
    }).catch((error) => {
    })
  },

  getIco: ({ commit, state, dispatch }, data) => {
    const params = data.params
    const callback = data.callback
    return dispatch(`REQUEST`, icosAPI.EACH(params.name))
  },

  convertIco: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, icosAPI.CONVERT(params))
  },

  getIcos: ({ commit, state, dispatch }, options) => {
    if (state.cancel) {
      state.token.cancel()
    }
    state.token = token.GET()
    const hideLoading = options.hasOwnProperty('allowLoading') && !options.allowLoading
    if (!hideLoading) {
      state.table.isLoading = true
    }
    delete options.allowLoading
    const params = {}
    for (const key of Object.keys(options)) {
      Vue.set(params, key, options[key])
    }
    commit(`QUERY`, '')
    if (params.query !== '') {
      params.filter = ''
    }
    return dispatch(`REQUEST`, icosAPI.GET(params)).then((response) => {
      if (response.statusText === 'OK') {
        commit('OPTIONS', response.data)
        commit('ICOS', response.data.data)
      }
      if (!hideLoading) {
        state.table.isLoading = false;
      }
      state.token = null
    }).catch((error) => {
      state.token = null
    })
  },

  subscribeIco: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, MAIL.SUBSCRIBE(params.ico, params.email))
  },

  subscribeNewsletter: ({ commit, state, dispatch }, email) => {
    return dispatch(`REQUEST`, MAIL.NEWSLETTER(email))
  },

  getEvents: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, icosAPI.EVENTS(params)).then((response) => {
      if (response.statusText === 'OK') {
        commit('EVENTS', response.data)
      }
    }).catch((error) => {
    })
  },

  getWhitelist: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, icosAPI.WHITELIST()).then((response) => {
      if (response.statusText === 'OK') {
        commit('WHITELIST', response.data)
      }
    }).catch((error) => {
    })
  },
  
  getFeed: ({ commit, state, dispatch }, ico) => {
    return dispatch(`REQUEST`, icosAPI.FEED(ico))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
