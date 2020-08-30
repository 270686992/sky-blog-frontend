import webSiteInfo from '../models/web-site-info'

export const state = () => ({
    siteInfo: {}
})

export const mutations = {
    setSiteInfo(state, siteInfo) {
        state.siteInfo = siteInfo
    }
}

export const actions = {
    async getSiteInfo({ commit }) {
        try {
            const siteInfo = await webSiteInfo.getWebSiteInfo()
            commit('setSiteInfo', siteInfo)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
        }
    }
}
