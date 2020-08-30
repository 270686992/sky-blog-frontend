<template>
  <div class="about-container">
    <split-line :icon="'message'" :desc="'公告'"></split-line>
    <p class="text" v-html="siteInfo.announcement">
    </p>

    <split-line :icon="'about'" :desc="'关于我'"></split-line>
    <p class="text" v-html="siteInfo.about_me_explain">
    </p>

    <split-line :icon="'site'" :desc="'关于本站'"></split-line>
    <p class="text" v-html="siteInfo.about_site_explain">
    </p>

    <split-line :icon="'recommend'" :desc="'关于版权'"></split-line>
    <p class="text" v-html="siteInfo.about_copyright_explain">
    </p>

    <split-line :icon="'link'" :desc="'友链申请说明'"></split-line>
    <p class="text" v-html="siteInfo.application_explain">
    </p>

    <split-line :icon="'star-fill'" :desc="'特别说明'"></split-line>
    <p class="text" v-html="siteInfo.special_explain">
    </p>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import { mapState } from 'vuex'

export default {
  name: 'about-page',

  components: {
    SplitLine
  },

  head() {
    return {
      title: '关于',
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('site/getSiteInfo')
  },

  computed: {
    ...mapState({
      siteInfo: state => state.site.siteInfo,
    })
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.text {
  padding: 15px 0;

  @media (max-width: 479px) {
    font-size: $font-size-base;
  }
}

.about-container {
  @include container;
  min-height: 450px;
}
</style>
