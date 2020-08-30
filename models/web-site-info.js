import {
    get
} from '@/services/http/axios'

class WebSiteInfo {
    // 获取站点信息
    async getWebSiteInfo() {
        const res = await get('v1/web-site-info')
        return res
    }
}

export default new WebSiteInfo()
