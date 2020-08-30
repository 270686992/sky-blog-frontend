import {
  get
} from '@/services/http/axios'

class Blog {
  // 按照友情链接类型获取相应的友情链接列表
  async getFriends(kind) {
    const res = await get(`v1/friend-link/list?kind=${kind}`)
    return res
  }
}

export default new Blog()
