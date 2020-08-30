<template>
  <div class="comment-container">
    <comment-editor
        ref="editor"
        :isShowReplyContent="isShowReplyContent"
        :isMessageEditor="true"
        @closeReplyContent="closeReply"
        @send="onSend"
    ></comment-editor>

    <div class="comment-list-wrapper">
      <leave-message-list :messages="messages" :total="total" @reply="onReply" :loading="loading" @loadMore="onLoadMore"></leave-message-list>
    </div>
  </div>
</template>

<script>
import LeaveMessageList from "./leave-message-list";
import CommentEditor from "@/components/base/comment-editor/comment-editor";
import {Message} from "element-ui";

export default {
  components: {
    CommentEditor,
    LeaveMessageList
  },

  props: {
    messages: {
      type: Array,
      default: () => []
    },

    total: {
      type: Number,
      default: 0
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShowReplyContent: false,
      parentId: 0,
      rootId: 0,
      page: 0
    };
  },

  methods: {
    onReply(message) {
      if (message.root) {
        this.rootId = message.id
      } else {
        this.rootId = message.root_id
      }
      this.parentId = message.id
      this.$refs.editor.reply = {
        content: message.content
      }
      this.isShowReplyContent = true;
    },

    onLoadMore() {
      if (this.loading) {
        return
      }
      this.page++
      this.$store.dispatch('message/getMoreMessages', {
        page: this.page
      })
    },

    closeReply() {
      this.isShowReplyContent = false
      this.parentId = 0
      this.rootId = 0
      this.$refs.editor.reply = {
        content: ''
      }
      this.$refs.editor.resetField()
    },

    async onSend(data) {
      if (this.isShowReplyContent) {
        // 回复留言(二级留言)
        if (!this.parentId) {
          return
        }
        try {
          data.root = 0
          data.root_id = this.rootId
          data.parent_id = this.parentId
          const res = await this.$axios.$post('/v1/leave-message', data)
          if (res.code < 9999) {
            Message.success(res.message)
            this.closeReply()
            this.$emit('createLeaveMessageSuccess')
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      } else {
        // 创建留言(一级留言)
        try {
          data.root = 1
          data.root_id = 0
          data.parent_id = 0
          const res = await this.$axios.$post('/v1/leave-message', data)
          if (res.code < 9999) {
            Message.success(res.message)
            this.$refs.editor.resetField()
            this.$emit('createLeaveMessageSuccess')
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
  margin-top: 25px;
}
</style>
