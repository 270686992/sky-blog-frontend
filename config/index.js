const Config = {
  baseUrl: process.env.NODE_ENV === 'production' ? '你的线上 api 地址' : 'http://127.0.0.1:8081',
  staticPath: '你的对象存储的空间服务域名',
  useFrontEndErrorMsg: false, // 默认采用后端返回异常
}

export default Config
