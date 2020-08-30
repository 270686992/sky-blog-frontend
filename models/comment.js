import {
  get,
} from '@/services/http/axios'

class Comment {
  // 获取这篇文章下的所有评论
  async getComments(query) {
    const res = await get('v1/article/get/comment', query)
    return res
  }
}

export default new Comment()
