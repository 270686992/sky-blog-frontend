import tag from '../models/tag'
import category from '../models/category'
import article from '../models/article'

export const state = () => ({
  tags: [],
  categories: [],

  loading: false,
  articles: [],
  total: 0,

  category: {}
})

export const mutations = {
  setTagAndCategories(state, { tags, categories }) {
    state.tags = tags
    state.categories = categories
  },

  setArticles(state, { items, total }) {
    state.articles = items
    state.total = total
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setCategory(state, category) {
    state.category = category
  },

  setMoreArticles(state, { items }) {
    state.articles = state.articles.concat(items)
  }
}

export const actions = {
  async getTagAndCategories({ commit }) {
    try {
      const tags = await tag.getTags()
      const categories = await category.getCategories()
      commit('setTagAndCategories', { tags, categories })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticlesByTag({ commit }, params) {
    try {
      commit('setLoading', true)
      const { items } = await article.getArticlesByTag(params)
      commit('setMoreArticles', { items })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticlesByCategory({ commit }, params) {
    try {
      commit('setLoading', true)
      const { items } = await article.getArticlesByCategory(params)
      commit('setMoreArticles', { items })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getArticlesByTag({ commit }, params) {
    try {
      const { items, total } = await article.getArticlesByTag(params)
      commit('setArticles', { items, total })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getArticlesByCategory({ commit }, params) {
    try {
      const { items, total } = await article.getArticlesByCategory(params)
      commit('setArticles', { items, total })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getCategory({ commit }, id) {
    try {
      const result = await category.getCategory(id)
      commit('setCategory', result)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
