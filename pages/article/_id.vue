<template>
  <div>
    <header class="article-header" :style="articleCover">
      <div class="header-wrapper">
        <div class="content">
          <tag-list :tagList="article.tag_list"></tag-list>

          <h1 class="title">{{article.title}}</h1>

          <div class="author-wrapper" v-show="article.create_time">
            by&nbsp;
            <router-link v-if="siteInfo" tag="span" class="author-name" :to="`/about`">{{siteInfo.nickname}}</router-link>
            &nbsp;<time :datetime="article.create_time | filterTime">&nbsp;{{article.create_time | filterTime}}</time>
          </div>
        </div>
      </div>
    </header>

    <!-- 文章区域 -->
    <div class="article-container">
      <div class="content">
        <!-- 文章内容 -->
        <div class="article-wrapper">
          <article ref="markedContent" class="markdown" v-html="markedContent"></article>
        </div>

        <!-- 文章信息 -->
        <div class="article-info-wrapper">
          <div class="tags-wrapper">
            <i class="icon icon-tags-fill"></i>

            <ul class="tags">
              <router-link tag="li" class="tag-item" v-for="tag in article.tag_list" v-show="tag.online" :key="tag.id" :to="`/tag/${tag.id}/?name=${tag.name}`">{{tag.name}}</router-link>
            </ul>
          </div>
        </div>

        <split-line class="split-line" :icon="'recommend'" :desc="'感谢阅读'"></split-line>
        <split-line v-show="!article.enable_comment" class="split-line" :icon="'message'" :desc="'该文章评论区已关闭'"></split-line>
      </div>
    </div>

    <!-- 评论区域 -->
    <div ref="commentArea" v-show="article.enable_comment" class="article-container comment-container">
      <div class="content">
        <split-line class="split-line" :icon="'message'" :desc="'评论'"></split-line>

        <div class="comment-wrapper">
          <comment :comments="comments" @createCommentSuccess="getComments" :articleId="parseInt(id)" :loading="loading"></comment>
        </div>
      </div>
    </div>

    <aside class="like-wrapper">
      <div class="item" @click="scrollToComment">
        <span class="count">{{comments.length}}</span>
        <i class="icon icon-message-fill"></i>
      </div>
    </aside>

    <Dialog :visible.sync="dialogVisible" :loading="imgLoading" :imgSrc="imgSrc"></Dialog>
  </div>
</template>

<script>
import markdown from '@/plugins/marked'
import Comment from '@/components/layout/comment/comment'
import SplitLine from '@/components/base/split-line/split-line'
import TagList from '@/components/base/tag-list/tag-list'
import Dialog from '@/components/base/dialog/dialog'
import defaultCover from '@/assets/image/lighthouse.jpeg'
import webSiteInfo from '../../models/web-site-info'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'article-detail',

  components: {
    Comment,
    SplitLine,
    TagList,
    Dialog
  },

  head() {
    return {
      title: this.article.title
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('article/getArticleDetail', params.id)
    await store.dispatch('article/getComments', {
      id: params.id
    })
  },

  data() {
    return {
      dialogVisible: false,
      imgLoading: false,
      imgSrc: '',
      id: 0,
      articleCover: {},
      loading: false,
      siteInfo: null
    }
  },

  computed: {
    ...mapState({
      article(state) {
        const article = state.article.article

        if (!article) {
          return {}
        }

        if (article.cover_image) {
          this.articleCover = { backgroundImage: `url(${article.cover_image})` }
        } else {
          this.articleCover = { backgroundImage: `url(${defaultCover})` }
        }

        return article
      },

      comments: state => state.article.comments
    }),

    markedContent() {
      if (this.article.content) {
        return markdown(this.article.content)
      } else {
        return ''
      }
    },
  },

  methods: {
    // markdown 解析
    marked(content) {
      return markdown(content)
    },

    // 滚动到评论区
    scrollToComment() {
      this.$refs.commentArea.scrollIntoView({
        behavior: 'smooth'
      })
    },

    getComments() {
      this.$store.dispatch('article/getComments', {
        id: this.id
      })
    },

    initImg() {
      import('../../services/utils/lazy-img').then(res => {
        res.default('.image-popper')
      })
      const el = this.$refs.markedContent
      el.addEventListener('click', e => {
        const target = e.target
        if (target.nodeName.toLocaleLowerCase() === 'img' && target.classList.contains('image-popper')) {
          e.stopPropagation()
          this.imgLoading = true
          this.dialogVisible = true
          const src = target.dataset.origin

          const image = new Image()
          image.src = src

          image.onload = () => {
            this.imgSrc = src
            this.imgLoading = false
          }

          image.onerror = () => {
            this.imgSrc = src
            this.imgLoading = false
          }
        }
      })
    }
  },

  async created() {
    this.id = this.$nuxt.$route.params.id
    this.siteInfo = await webSiteInfo.getWebSiteInfo()
  },

  mounted() {
    this.initImg()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.article-header {
  @include cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 85px - 85px);
  height: calc(100vh - 245px);
  margin: 0 auto;
  color: #fff;
  border-radius: 5px;
  background: no-repeat center center;
  background-size: cover;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1399px) {
    width: 100%;
    border-radius: 0;
  }

  @media (max-width: 1023px) {
    height: calc(100vh - 160px);
  }

  @media (max-width: 479px) {
    height: auto;
    padding: 15vh 0 15vh;
  }

  .header-wrapper {
    @include container;
    position: relative;
    margin: 0 auto;
  }

  .content {
    @include headerPadding;
    margin-top: -10vh;

    @media (max-width: 479px) {
      margin-top: 0;
    }
  }

  .title {
    margin: .7em 0;
    line-height: 1;
    font-size: $title-font-size-extra-large;
    font-weight: $font-weight-bold;

    @media (max-width: 479px) {
      font-size: $title-font-size-base;
    }
  }

  .author-wrapper {
    font-size: $font-size-small;

    @media (max-width: 479px) {
      font-size: $font-size-minimum
    }

    .author-name {
      font-size: $font-size-large;
      font-weight: $font-weight-bold;
      cursor: pointer;

      @media (max-width: 479px) {
        font-size: $font-size-small;
      }

      &:not(:first-child)::before {
        content: '、'
      }
    }
  }
}

.article-container {
  @include container;
  position: relative;
  margin-top: -10vh;
  border-radius: 5px;

  @media (max-width: 479px) {
    margin-top: 0;
  }

  .content {
    @include articlePadding;
    border-radius: 5px;
    background-color: var(--app-background-color-light);
    // box-shadow: 0 2px 24px 5px rgba(0, 0, 0, .05);
    transition: $theme-transition;

    @media (max-width: 479px) {
      box-shadow: none;
      background-color: var(--app-background-color);
    }
  }

  .split-line {
    margin: 20px 0;
    padding: 0 0 20px 0;

    @media (max-width: 479px) {
      margin: 10px 0;
    }
  }
}

.comment-container {
  margin-top: 0;

  .content {
    padding-top: 5px;
  }

  @media (max-width: 479px) {
    margin-top: 0;

    .content {
      padding-top: 0;
    }
  }
}

.like-wrapper {
  position: fixed;
  right: 0;
  bottom: 21%;
  z-index: $index-popper;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .14);

  @media (max-width: 479px) {
    display: none;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 42px;
    height: 42px;
    border: 1px solid var(--tag-color);
    background-color: var(--app-background-color);
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: none;
    }

    &:hover {
      >i {
        color: var(--theme-active);
      }
    }

    .count {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 5px;
      font-size: $font-size-small;
      border-radius: 8px;
      transform: translate(-50%, -50%);
      background-color: var(--tag-color);
    }

    >i {
      font-size: $font-size-extra-large;
      transition: all .15s linear;
    }

    .is-like {
      color: var(--theme-active);
    }
  }
}

.article-info-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags-wrapper {
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;

  >i {
    margin: 8px 10px 0 0;
    font-size: $font-size-icon-rem;
  }

  .tags {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;

    .tag-item {
      cursor: pointer;

      &:not(:first-child)::before {
        content: '、'
      }
    }
  }
}

.like-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  font-size: 1rem;
  cursor: pointer;

  >i {
    margin-right: 6px;
    font-size: $font-size-icon-rem;

    &:hover {
      color: var(--theme-active);
    }
  }

  > span {
    white-space: nowrap;
  }

  .is-like {
    color: var(--theme-active);
  }
}
</style>
