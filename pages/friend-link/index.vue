<template>
  <div class="link-container">
    <split-line :icon="'link'" :desc="'友情链接'"></split-line>
    <div class="link-list">
      <a class="link-item" v-show="friendLink.display_state" v-for="friendLink in friendLinkList" :key="friendLink.id" :href="friendLink.url" target="_blank">
        <div class="link-wrapper">
          <div class="link-image" :style="{backgroundImage: `url(${friendLink.icon})`}"></div>
          <h2 class="title" :class="{center: !friendLink.description}">{{friendLink.name}}</h2>
          <p v-if="friendLink.description" class="desc">{{friendLink.description}}</p>
        </div>
      </a>
    </div>

    <split-line :icon="'link'" :desc="'推荐链接'"></split-line>
    <div class="link-list">
      <a class="link-item" v-show="recommendLink.display_state" v-for="recommendLink in recommendLinkList" :key="recommendLink.id" :href="recommendLink.url" target="_blank">
        <div class="link-wrapper">
          <div class="link-image" :style="{backgroundImage: `url(${recommendLink.icon})`}"></div>
          <h2 class="title" :class="{center: !recommendLink.description}">{{recommendLink.name}}</h2>
          <p v-if="recommendLink.description" class="desc">{{recommendLink.description}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import { mapState } from 'vuex'

export default {
  name: 'friend-link-page',

  components: {
    SplitLine,
  },

  head() {
    return {
      title: '友情链接'
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('blog/getFriends')
  },

  computed: {
    ...mapState({
      friendLinkList: state => state.blog.friendLinkList,
      recommendLinkList: state => state.blog.recommendLinkList
    })
  },

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.link-container {
  @include container;
}

.link-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -15px;

  .link-item {
    flex: 1 auto;
    position: relative;
    margin: 15px;
    border-radius: 20px;
    overflow: hidden;
    transition: all .25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }

    @media (max-width: 470px) {
      margin: 15px 15px 0;
    }
  }
}

.link-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #fff;

  .link-image {
    @include cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
  }

  .title {
    padding: 15px 30px;
    font-size: $title-font-size-medium;
    font-weight: $font-weight-bold;
  }

  .center {
    text-align: center;
  }

  .desc {
    box-sizing: border-box;
    max-width: 450px;
    padding: 0 60px 3vh 30px;
  }
}
</style>
