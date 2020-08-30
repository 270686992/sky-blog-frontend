<h1 align="center">
  Sky-Blog 前端
</h1>

<blockquote align="center">
 本仓库为 Sky-Blog 的 前端的仓库,负责博客前端的代码管理。
</blockquote>

<p align="center">
  <a href="##预览">预览</a>&nbsp;|&nbsp;
  <a href="##简介">简介</a>&nbsp;|&nbsp;
  <a href="##如何使用">如何使用</a>
</p>

## 预览

### 线上 demo

- 博客地址: [www.xilikeli.cn](https://www.xilikeli.cn)

- CMS 端地址: [admin.xilikeli.cn](https://admin.xilikeli.cn)
    - 游客用户的账号密码: guest, 123456
    
## 简介

本博客的前端基于开源项目 [https://github.com/smileShirmy/smile-blog-nuxt](https://github.com/smileShirmy/smile-blog-nuxt) 进行开发。

博客前端的服务端查看请访问 [博客前端的服务端仓库](https://github.com/270686992/sky-blog-server)

CMS 后端请访问 [CMS 后端仓库](https://github.com/270686992/sky-blog-cms-server)

CMS 前端请访问 [CMS 前端仓库](https://github.com/270686992/sky-blog-cms-frontend)

CMS 的后端和前端基于 Lin CMS 的基础进行开发, Lin CMS 地址: [https://github.com/TaleLin](https://github.com/TaleLin)

## 如何使用

该项目使用 RESTful API，要启动该项目要先启动服务端 [sky-blog-server](https://github.com/270686992/sky-blog-server)

```bash
# 线上部署前需先修改 nuxt.config.js 和 config 目录下的 index.js 中的一些配置为你个人的配置, 如线上 api 等相关配置。

# install
npm install

# development
npm run dev

# production 
npm run build
npm start

# use pm2
npm run build
pm2 start npm --name nuxt -- start
```
