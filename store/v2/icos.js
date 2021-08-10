import Vue from 'vue'
import { 
  ICOS as ICOS,
  MAIL as MAIL
} from '@/api/index'

const state = () => ({
  all: [],
  related: [],
  count: {
    ongoing: 0,
    upcoming: 0,
    past: 0
  },
  params: {
    filter: "",
    preset: "",
    perPage: 15,
    page: 1,
    cols: [
      "project-name",
      "hard-cap",
      "percentage-sold-to-public",
      'marketcap-circulating-supply',
      'marketcap-total-supply',
      "nr-of-telegram-members"
    ],
    sortBy: "",
    sortOrder: ""
  },
  columns: {
    main: [
      "project-name",
      "hard-cap",
      "tier-one-price-per-token",
      "project-market",
      "project-token-type",
      "nr-of-telegram-members"
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
    ]
  },
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
})

const getters = {
}

const mutations = {
  RELATED: (state, icos) => {
    state.related = icos
  },

  COUNT: (state, count) => {
    for(const key of Object.keys(count)) {
      const newKey = key
      if (key === 'active') {
        newKey = 'ongoing'
      }
      state.count[newKey] = count[key]
    }
  },

  ALL: (state, icos) => {
    icos.sort(function (a, b) {
      const getName = (ico) => {
        let value = null;
        const details = ico.details;
        if (details != null) {
          const name = details["project-name"];
          if (name != null) {
            value = name.value.toLowerCase().trim();
          }
        }
        return value;
      }
        const first = getName(a)
        const second = getName(b)
        
        if (first < second)
          return -1;
        if (first > second)
          return 1;
        return 0;
    });
    state.all = icos
  },

  PARAMS: (state, params) => {
    state.params = params;
  },

  MAIN: (state, list) => {
    state.columns.main = list
  }
}

const actions = {
  convert: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, ICOS.CONVERT(params))
  },

  all: ({ dispatch, commit }) => {
    dispatch(`REQUEST`, ICOS.ALL()).then((response) => {
      if (response.status === 200) {
        commit('ALL', response.data.data)
      }
    }).catch((error) => {
      //error
    })
  },

  list: ({ dispatch }, filters) => {
    return dispatch(`REQUEST`, ICOS.GET(filters));
  },

  ico: ({ dispatch }, name) => {
    return dispatch(`REQUEST`, ICOS.EACH(name))
  },

  ico_count: ({ dispatch, commit }) => {
    dispatch(`REQUEST`, ICOS.COUNT()).then((response) => {
      if (response.status === 200) {
        commit('COUNT', response.data)
      }
    }).catch((error) => {
      //error
    })
  },

  related: ({ dispatch, commit }, name) => {
    dispatch(`REQUEST`, ICOS.RELATED(name)).then((response) => {
      if (response.status === 200) {
        commit('RELATED', response.data)
      }
    }).catch((error) => {
      //error
    })
  },

  subscribe: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, MAIL.SUBSCRIBE(params.ico, params.email))
  },

  fields: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, ICOS.FIELDS())
  },

  categories: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, ICOS.CATEGORIES())
  },

  latest_reviews: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, ICOS.LATEST_REVIEWS())
  },

  investment: ({ dispatch }, slug) => {
    return dispatch(`REQUEST`, ICOS.INVESTMENT(slug))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}