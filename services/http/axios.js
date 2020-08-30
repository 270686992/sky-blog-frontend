import Vue from 'vue'
import axios from 'axios'
import Config from '@/config'
import ErrorCode from '@/config/error-code'
import {Message} from "element-ui";



const config = {
  baseURL: Config.baseUrl,
  timeout: 10 * 1000,
  crossDomain: true,
  validateStatus(status) {
    return status >= 200 && status < 510
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(originConfig => {
  const reqConfig = { ...originConfig }

  // step1: 容错处理
  if (!reqConfig.url) {
    throw new Error({
      source: 'axiosInterceptors',
      message: 'request need url'
    })
  }

  // 默认使用 get 请求
  if (!reqConfig.method) {
    reqConfig.method = 'get'
  }

  // 大小写
  reqConfig.method = reqConfig.method.toLowerCase()

  if (reqConfig.method === 'get') {
    if (!reqConfig.params) {  // 防止字段用错
      reqConfig.params = reqConfig.data || {}
    }
  } else if (reqConfig.method === 'post') {
    if (!reqConfig.data) {
      reqConfig.data = reqConfig.params || {}
    }

    let hasFile = false
    Object.keys(reqConfig.data).forEach(key => {
      if (typeof reqConfig.data[key] === 'object') {
        if (reqConfig.data[key] instanceof FileList || reqConfig.data[key] instanceof File || reqConfig.data[key] instanceof Blob) {
          hasFile = true
        } else if (reqConfig.data[key].constructor === Object) {
          reqConfig.data[key] = JSON.stringify(reqConfig.data[key])
        }
      }
    })

    if (hasFile) {
      const formData = new FormData()
      Object.keys(reqConfig.data).forEach(key => {
        formData.append(key, reqConfig.data[key])
      })
      reqConfig.data = formData
    }
  } else {
    // TODO: 其他类型请求数据格式处理
    /* eslint-disable-next-line */
    console.warn(`其他请求类型: ${reqConfig.method}, 暂无自动处理`)
  }

  return reqConfig
}, error => {
  Promise.reject(error)
})

_axios.interceptors.response.use(async (res) => {
    let { code, message } = res.data // eslint-disable-line

    if (res.status.toString().charAt(0) === '2') {
      return res.data
    }

    return new Promise(async (resolve, reject) => {
      // 第一种情况：默认直接提示后端返回的异常信息；特殊情况：如果本次请求添加了 handleError: true，用户自己try catch，框架不做处理
      if (res.config.handleError) {
        return reject(res)
      }

      // 第二种情况：采用前端自己的一套异常提示信息；特殊情况：如果本次请求添加了 showBackend: true, 弹出后端返回错误信息。
      if (Config.useFrontEndErrorMsg && !res.config.showBackend) {
        // 弹出前端自定义错误信息
        const errorArr = Object.entries(ErrorCode).filter(v => v[0] === code.toString())
        // 匹配到前端自定义的错误码
        if (errorArr.length > 0 && errorArr[0][1] !== '') {
          message = errorArr[0][1] // eslint-disable-line
        } else {
          message = ErrorCode['777']
        }
      }

      Message.error(message)
      reject()
    })
  }, error => {

  // 判断请求超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.warning('请求超时')
  }
  return Promise.reject(error)
})

const Plugin = {}

Plugin.install = function (Vue) {
  Vue.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}
//
// if (!Vue.axios) {
//   Vue.use(Plugin)
// }

// 导出常用函数

export function post(url, data = {}, params = {}) {
  return _axios({
    method: 'post',
    url,
    data,
    params
  })
}

export function get(url, params = {}) {
  return _axios({
    method: 'get',
    url,
    params
  })
}

export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data
  })
}

export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params
  })
}

export default _axios
