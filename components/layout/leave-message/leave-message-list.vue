<template>
  <ul class="leave-message-list">
    <li class="leave-message-item" v-show="message.display_state" v-for="message in messages" :key="message.id">
      <img class="avatar" v-if="message.avatar" :src="message.avatar" :alt="message.nickname || '匿名用户'">
      <img class="avatar" v-else :src="gravatar(message.email)" :alt="message.nickname || '匿名用户'">

      <section class="leave-message-detail markdown">
        <div class="nickname">
          <img class="mobile-avatar" v-if="message.avatar" :src="message.avatar" :alt="message.nickname || '匿名用户'">
          <img class="mobile-avatar" v-else :src="gravatar(message.email)" :alt="message.nickname || '匿名用户'">
          <span>{{message.nickname}}</span>
        </div>

        <div class="content" v-html="message.content"></div>

        <section class="reply-wrapper markdown" v-if="message.parent_id !== 0">
          <div class="reply-nickname" v-if="message.replyName">@{{message.replyName}}:</div>
          <div v-html="message.replyContent"></div>
        </section>

        <footer class="leave-message-footer">
          <time class="time" :datetime="message.create_time | filterTime">
            <i class="fa fa-map-marker" aria-hidden="true"></i> {{message.address}}  {{message.create_time | filterTime}}
          </time>

          <div class="tools">
            <i class="icon icon-reply" @click="reply(message)"></i>
          </div>
        </footer>

        <div class="split"></div>
      </section>
    </li>

    <loading v-if="loading"></loading>

    <empty v-if="!loading && !messages.length" :message="'还没有留言 /(ㄒoㄒ)/~~'" :isBack="false"></empty>

    <div v-show="isLoadMore" class="load-more" @click="$emit('loadMore')"></div>
  </ul>
</template>

<script>
import gravatar from '@/services/gravatar/gravatar'
import "font-awesome/css/font-awesome.min.css"

export default {
  props: {
    messages: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    total: {
      type: Number,
      default: 0
    }
  },

  computed: {
    isLoadMore() {
      if (this.messages.length && !this.loading) {
        return this.total > this.messages.length
      } else {
        return false
      }
    },
  },

  methods: {
    reply(message) {
      this.$emit('reply', message)
    },

    gravatar(email) {
      return gravatar(email)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.leave-message-item {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  .avatar {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #eee;

    @media (max-width: 479px) {
      display: none;
    }
  }

  .leave-message-detail {
    width: calc(100% - 50px);

    @media (max-width: 479px) {
      width: 100%;
    }

    .nickname {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .mobile-avatar {
        display: none;

        @media (max-width: 479px) {
          display: inline-block;
          width: 26px;
          height: 26px;
          margin-right: 10px;
          border-radius: 50%;
          background-color: #eee;
        }
      }

      .website {
        font-size: $font-size-extra-large;
        margin-right: 6px;
      }

      font-size: $font-size-base;
    }

    .content {
      display: flex;
      align-items: center;
      min-height: 42px;
      margin: 8px 0;
      font-size: 1rem;
    }

    .reply-wrapper {
      box-sizing: border-box;
      padding: 6px 10px;
      font-size: $font-size-base;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--primary-light-0);

      .reply-nickname {
        font-weight: $font-weight-bold;
      }
    }

    .leave-message-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .time {
        font-size: $font-size-small;
      }

      .tools {
        display: flex;
        justify-content: flex-start;

        >i {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          .like-count {
            margin-left: 5px;
          }
        }

        .is-like {
          color: var(--theme-active);
        }
      }
    }

    .split {
      box-sizing: border-box;
      width: 100%;
      height: 1px;
      margin-top: 15px;
      background-color: var(--border-color);
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
