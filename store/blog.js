import blog from '../models/blog'

export const state = () => ({
  friendLinkList: [],
  recommendLinkList: []
})

export const mutations = {
  setFriends(state, { friendLinkList, recommendLinkList }) {
    state.friendLinkList = friendLinkList
    state.recommendLinkList = recommendLinkList
  }
}

export const actions = {
  async getFriends({ commit }) {
    try {
      const friendLinkList = await blog.getFriends(0)
      const recommendLinkList = await blog.getFriends(1)
      commit('setFriends', { friendLinkList, recommendLinkList })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
