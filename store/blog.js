import Vue from 'vue'
import {
	BLOGS as BLOGS
} from '@/api/index'
import ADMIN from '@/api/admin'
const state = () => ({
  articles: []
})

const getters = {
}

const mutations = {
  BLOGS: (state, articles) => {
    state.articles = articles;
  }
}

const actions = {
  SAVE_BLOGS: ({ state, dispatch, commit }, params) => {
    	return dispatch(`REQUEST`, ADMIN.ARTICLES.SAVE(params))
  },
  
  BLOGS: ({ dispatch }, filters) => {
    return dispatch(`REQUEST`, BLOGS.GET(filters));
  },

  BLOG: ({ state, dispatch, commit }, slug) => {
    return dispatch(`REQUEST`, BLOGS.EACH(slug));
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
