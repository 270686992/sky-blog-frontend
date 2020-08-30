
import article from '../models/article'
import category from '../models/category'

export const state = () => ({
  categories: [],
  articles: [],
  loading: false,
  total: 0
})

export const mutations = {
  setCategories(state, { categories }) {
    state.categories = categories
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setArticles(state, { items, total }) {
    state.articles = items
    state.total = total
  }
}

export const actions = {
  async getSearchData({ commit }) {
    try {
      const categories = await category.getCategories()
      commit('setCategories', { categories })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async searchArticles({ commit }, params) {
    try {
      commit('setLoading', true)
      const { items, total } = await article.searchArticles(params)
      commit('setArticles', { items, total })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
