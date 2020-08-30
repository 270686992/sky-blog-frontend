import {
  get,
  post
} from '@/services/http/axios'

class Message {
  // 分页获取所有留言
  async getMessages(params) {
    const res = await get('v1/leave-message/latest', params)
    return res
  }

  // 获取所有留言
  async getAllMessages() {
    const res = await get('v1/leave-message/list')
    return res
  }
}

export default new Message()
