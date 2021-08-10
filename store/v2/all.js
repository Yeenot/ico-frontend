import Vue from 'vue'
import { 
  ICOS as ICOS,
  MAIL as MAIL
} from '@/api/index'
const { faqs } = require('~/external/data/faqs.js')

const state = () => ({
    body: {
        scroll: true
    },
    window: {
        width: 0,
        height: 0
    },
    currencies: [
        { label: 'Default', value: ''},
        { label: 'USD', value: 'USD'},
        { label: 'EUR', value: 'EUR'},
        { label: 'ETH', value: 'ETH'},
        { label: 'BTC', value: 'BTC'}
    ],
    filters: [
        {
            label: "All",
            value: ""
        },
        {
            label: "Upcoming",
            value: "upcoming"
        },
        {
            label: "Ongoing",
            value: "active"
        },
        {
            label: "Past",
            value: "past"
        }
    ],
    faqs,
    search: "",
    isClear: true
})

const getters = {
}

const mutations = {
    SEARCH: (state, search) => {
        state.search = search
    },

    SCROLL: (state, scroll) => {
        state.body.scroll = scroll
    },

    WINDOW: (state, window) => {
        state.window = window
    },

    IS_CLEAR: (state, isClear) => {
        state.isClear = isClear;
    }
}

const actions = {
    newsletter: ({ dispatch }, email) => {
        return dispatch(`REQUEST`, MAIL.NEWSLETTER(email))
    },

    getTelegram: ({ dispatch }, ico) => {
        return dispatch(`REQUEST`, ICOS.FEED(ico))
    },

    getMedium: ({ dispatch }, ico) => {
        return dispatch(`REQUEST`, ICOS.MEDIUM(ico))
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}