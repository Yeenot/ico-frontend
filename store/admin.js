import Vue from 'vue'
import { 
  ICOS as ICOS,
  USER as USER,
} from '@/api/index'
import ADMIN from '@/api/admin'

const state = () => ({
  drawer: {
    open: false
  },
  current: {
    name: '',
    breadcrumbs: []
  },

  icos: [],
  match: {
    blacklist: [
      'default'
    ]
  },

  menu: [
    {
      name: 'Modules',
      items: [
        {
          label: 'Ico Management',
          path: '/admin/icos',
          icon: 'fa-th'
        },
        {
          label: 'Page Management',
          path: '/admin/page-management',
          icon: 'fa-files-o'
        },
        {
          label: 'Logos',
          path: '/admin/logos',
          icon: 'fa-info-circle',
        },
        {
          label: 'Articles',
          path: '/admin/articles',
          icon: 'fa-newspaper-o',
        },
        {
          label: 'Glossary',
          path: '/admin/glossary',
          icon: 'fa-newspaper-o',
        }
      ]
    }
  ]
})

const getters = {
}

const mutations = {
  SET_DRAWER_STATUS (state, open) {
    state.drawer.open = open
  },

  SET_CURRENT_PAGE (state, page) {
    state.current.name = page.name
  },

  SET_BREADCRUMBS (state, breadcrumbs) {
    state.current.breadcrumbs = breadcrumbs
  },

  ALL_ICOS (state, icos) {
   icos.sort(function(a, b) {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
    });

    state.icos = icos
  },
}

const actions = {

  test: ({ commit, state, dispatch }, ico) => {
    return dispatch(`REQUEST`, USER.TEST())
  },

  getIcoInfo: ({ commit, state, dispatch }, ico) => {
    return dispatch(`REQUEST`, ICOS.GET_UPDATE_SECTION(ico))
  },

  saveIco: ({ commit, state, dispatch }, data) => {
    return dispatch(`REQUEST`, ICOS.SAVE(data))
  },

  updateIco: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, ICOS.UPDATE_SECTION(params))
  },

  uploadLogo: ({ commit, state, dispatch }, params) => {
    return dispatch(`REQUEST`, ICOS.LOGO(params.icos, params.token))
  },

   uploadSpreadsheet: ({ commit, state, dispatch }, file) => {
    return dispatch(`REQUEST`, ADMIN.ICO.UPLOAD(file))
  },
  
  toggleDrawer({ commit, state, dispatch }) {
    commit(`SET_DRAWER_STATUS`, !state.drawer.open)
  },

  getAllIcos: ({ commit, state, dispatch }) => {
    return dispatch(`REQUEST`, ICOS.ALL()).then((response) => {
      if (response.statusText === 'OK') {
        commit(`ALL_ICOS`, response.data.data)
      }
    }).catch((error) => {
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
