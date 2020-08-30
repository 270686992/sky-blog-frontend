
module.exports = {
  mode: 'universal',

  server: {
    port: 5000, // default: 5000
  },

  /*
  ** Headers of the page
  */
  head: {
    title: '首页',
    titleTemplate: '%s | 博击长空',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '后端，Java，博客，博击长空，Vue，踏雪彡寻梅' },
      { name: 'author', content: 'sky_txxunmei@163.com' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
      { rel: 'dns-prefetch', href: '//bjck.xilikeli.cn' },
      { rel: 'dns-prefetch', href: '//www.xilikeli.cn' },
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://resource.shirmy.me/intersection-polyfill.js'
      }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    'highlight.js/styles/github.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/marked.js'
    },
    {
      src: '~/plugins/highlight.js'
    },
    {
      src: '~/plugins/gravatar.js'
    },
    {
      src: '~/plugins/filter.js'
    },
    {
      src: '~/plugins/global-component.js'
    },
    {
      src: '~/plugins/axios.js'
    },
    {
      src: '~/plugins/ElementUI.js',
      ssr: true
    },
    {
      src: '~/plugins/copy.js',
      ssr: false
    },
  ],
  /**
   * router config
   */
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ],
  ],

  googleAnalytics: {
    id: 'UA-144196694-X'
  },

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixin.scss']
  },
  axios: {
    baseURL: 'http://localhost:8081' /*线上部署前切换为线上 api 地址,该 axios 配置用于 auth 模块使用*/
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },

    vendor: ['element-ui']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/v1/customer/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/v1/customer/information', method: 'get', propertyName: 'customer' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  }
}
