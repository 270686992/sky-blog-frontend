import {
  get,
} from '@/services/http/axios'

class Article {
  // 获取所有文章
  async getArticles(params = {}) {
    let query = {
      page: params.page ? params.page : 0
    }
    const res = await get('v1/article/latest', query)
    return res
  }

  // 获取某个标签下的所有文章
  async getArticlesByTag(params = {}) {
    let query = {
      id: params.id ? params.id : 0,
      page: params.page ? params.page : 0
    }
    const res = await get('v1/article/by/tag', query)
    return res
  }

  // 获取某个分类下的所有文章
  async getArticlesByCategory(params = {}) {
    let query = {
      id: params.id ? params.id : 0,
      page: params.page ? params.page : 0
    }
    const res = await get('v1/article/by/category', query)
    return res
  }

  // 获取所有精选文章
  async getStarArticles() {
    const res = await get('v1/article/star')
    return res
  }

  // 获取某篇文章详情
  async getArticleDetail(id) {
    const res = await get(`v1/article/${id}/detail`)
    return res
  }

  // 搜索文章
  async searchArticles(params) {
    let query = {
      page: params.page ? params.page : 0,
      keyword: params.keyword
    }
    const res = await get('v1/article/search', query)
    return res
  }
}

export default new Article()
