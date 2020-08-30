import message from '../models/message'
import marked from "@/plugins/marked";

export const state = () => ({
  messages: [],
  total: 0,
  loading: false,
  allMessages: [],
})

export const mutations = {
  setMessages(state, { messages, total, allMessages }) {
    messages.forEach(m => {
      m.content = marked(m.content)
      if (m.parent_id !== 0) {
        const reply = allMessages.find(target => target.id === m.parent_id)
        if (reply && reply.display_state === true) {
          m.replyName = reply.nickname
          m.replyContent = marked(reply.content)
        } else if (reply && reply.display_state === false) {
          m.replyName = ''
          m.replyContent = '该留言已被隐藏'
        } else {
          m.replyName = ''
          m.replyContent = '该留言已被删除'
        }
      }
    })

    state.messages = messages
    state.total = total
    state.allMessages = allMessages
  },

  setMoreMessages(state, { messages }) {
    const allMessages = state.allMessages

    messages.forEach(m => {
      m.content = marked(m.content)
      if (m.parent_id !== 0) {
        const reply = allMessages.find(target => target.id === m.parent_id)
        if (reply && reply.display_state === true) {
          m.replyName = reply.nickname
          m.replyContent = marked(reply.content)
        } else if (reply && reply.display_state === false) {
          m.replyName = ''
          m.replyContent = '该留言已被隐藏'
        } else {
          m.replyName = ''
          m.replyContent = '该留言已被删除'
        }
      }
    })

    state.messages = state.messages.concat(messages)
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },
}

export const actions = {
  async getMessages({ commit }, params) {
    try {
      const res = await message.getMessages(params)
      const allMessages = await message.getAllMessages()
      commit('setMessages', { messages: res.items, total: res.total, allMessages })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreMessages({ commit, state }, params) {
    try {
      commit('setLoading', true)
      const res = await message.getMessages(params)
      commit('setMoreMessages', { messages: res.items })
      commit('setLoading', false)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
}
