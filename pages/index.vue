<template>
  <div>
    <carousel class="carousel-container"
      :showRightArrow="starArticles.length > 1"
      :showLeftArrow="starArticles.length > 1"
      :autoplay="starArticles.length > 1"
    >
      <carousel-item v-for="article in starArticles" v-if="article.publish_state" :key="article.id">
        <carousel-card :article="article" :categories="categories" :siteInfo="siteInfo"></carousel-card>
      </carousel-item>
    </carousel>

    <section class="article-wrapper">
      <article-list :articles="articles" :loading="loading" :total="total" :categories="categories" :siteInfo="siteInfo" @loadMore="onLoadMore"></article-list>
    </section>
  </div>
</template>

<script>
import Carousel from '@/components/base/carousel/carousel'
import CarouselItem from '@/components/base/carousel/carousel-item'
import CarouselCard from '@/components/layout/carousel-card/carousel-card'
import ArticleList from '@/components/layout/article-list/article-list'
import category from '../models/category'
import webSiteInfo from '../models/web-site-info'

const defaultStar = {
  id: 0,
  title: '空',
  category_id: 0,
  create_time: Date.now(),
  cover_image: 'https://resource.shirmy.me/lighthouse.jpeg'
}

export default {
  name: 'home-page',

  components: {
    Carousel,
    CarouselItem,
    CarouselCard,
    ArticleList,
  },

  async fetch ({ store, params }) {
    await store.dispatch('article/getHomeArticles', {
      page: 0
    })
  },

  data() {
    return {
      page: 0,
      categories: [],
      siteInfo: {}
    }
  },

  computed: {
    articles() {
      return this.$store.state.article.articles
    },

    total() {
      return this.$store.state.article.total
    },

    starArticles() {
      const starArticles = this.$store.state.article.starArticles
      if (!starArticles.length) {
        return [defaultStar]
      }
      return starArticles
    },

    loading() {
      return this.$store.state.article.loading
    }
  },

  methods: {
    onLoadMore() {
      if (this.loading) {
        return
      }
      this.page++
      this.$store.dispatch('article/getMoreArticles', {
        page: this.page
      })
    }
  },

  async created() {
    this.categories = await category.getCategories()
    this.siteInfo = await webSiteInfo.getWebSiteInfo()
  },
}
</script>

<style lang="scss" scoped>

.carousel-container {
  height: calc(100vh - 245px);

  @media (max-width: 1023px) {
    margin-top: -160px;
    height: 100vh;
  }

  @media (max-width: 479px) {
    margin-top: -100px;
  }
}

.article-wrapper {
  position: relative;
  width: 100%;
  margin-top: -10vh;
}
</style>
