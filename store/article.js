import article from '../models/article'
import comment from '../models/comment'
import marked from '../plugins/marked'

export const state = () => ({
  // 文章列表
  articles: [],
  total: 0,

  starArticles: [],

  loading: false,

  // 详情
  article: null,
  comments: []
})

export const mutations = {
  setHomeArticles(state, { items, total, starArticles }) {
    state.articles = items
    state.total = total
    state.starArticles = starArticles
  },

  setMoreArticles(state, { items }) {
    state.articles = state.articles.concat(items)
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setComments(state, comments = []) {
    comments.forEach(c => {
      c.content = marked(c.content)
      if (c.parent_id !== 0) {
        const reply = comments.find(target => target.id === c.parent_id)
        if (reply && reply.display_state === true) {
          c.replyName = reply.nickname
          c.replyContent = marked(reply.content)
        } else if (reply && reply.display_state === false) {
          c.replyName = ''
          c.replyContent = '该评论已被隐藏'
        } else {
          c.replyName = ''
          c.replyContent = '该评论已被删除'
        }
      }
    })

    state.comments = comments
  },

  setArticleDetail(state, article) {
    state.article = article
  },
}

export const actions = {
  // 获取首页文章列表
  async getHomeArticles({ commit }, params) {
    try {
      const { items, total } = await article.getArticles(params)
      const starArticles = await article.getStarArticles()
      commit('setHomeArticles', { items, total, starArticles })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticles({ commit }, params) {
    try {
      commit('setLoading', true)
      const { items } = await article.getArticles(params)
      commit('setMoreArticles', { items })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getComments({ commit }, params) {
    try {
      const comments = await comment.getComments(params)
      commit('setComments', comments)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getArticleDetail({ commit }, id) {
    try {
      const result = await article.getArticleDetail(id)
      commit('setArticleDetail', result)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
}
