<template>
  <div class="messages-container">
    <div class="content">
      <split-line class="split-line" :icon="'message'" :desc="'留言墙'"></split-line>

      <leave-message :messages="messages" :total="total" @createLeaveMessageSuccess="getMessages" :loading="loading"></leave-message>
    </div>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import LeaveMessage from '@/components/layout/leave-message/leave-message'
import { mapState } from 'vuex'

export default {
  name: 'messages-page',

  components: {
    SplitLine,
    LeaveMessage,
  },

  head() {
    return {
      title: '留言墙'
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('message/getMessages', {
      page: 0
    })
  },

  computed: {
    ...mapState({
      messages: state => state.message.messages,
      total: state => state.message.total,
      loading: state => state.message.loading
    }),
  },

  methods: {
    getMessages() {
      this.$store.dispatch('message/getMessages', {
        page: 0
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.split-line {
  margin: 20px 0;
  padding: 0 0 20px 0;

  @media (max-width: 479px) {
    margin: 10px 0;
  }
}

.messages-container {
  @include container;

  .editor-wrapper {
    margin: .5em;
  }
}

.messages-wrapper {
  display: flex;
  flex-wrap: wrap;

  .message-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .4em .5em;
    padding: 1em;
    background-color: var(--tag-color);
    transition: all .25s ease-in-out;

    @media (max-width: 479px) {
      margin: .2em .5em;
      padding: .5em;
    }

    &:hover {
      transform: translateY(-2px);
    }

    .nickname {
      height: 24px;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
    }

    .content {
      flex: 1;
      font-size: $font-size-base;
      padding: .5em 0;

      img {
        width: 50%;
      }
    }

    .time {
      margin-top: 1em;
      font-size: $font-size-base;
      text-align: right;
    }
  }
}

.load-more {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: 10px auto 0;
  border: 8px solid #dcdfe7;
  border-radius: 50%;
  transition: all .25s ease-in-out;
  cursor: pointer;

  @media (max-width: 479px) {
    width: 30px;
    height: 30px;
    border-width: 5px;
  }

  &:hover {
    border-color: var(--theme-active);
    background-color: var(--theme-active);
    transform: scale(.65);
  }
}
</style>
