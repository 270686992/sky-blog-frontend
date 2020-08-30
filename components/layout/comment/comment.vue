<template>
  <div class="comment-container">
    <comment-editor
      ref="editor"
      :isShowReplyContent="isShowReplyContent"
      @closeReplyContent="closeReply"
      @send="onSend"
    ></comment-editor>

    <div class="comment-list-wrapper">
      <comment-list :comments="comments" @reply="onReply" :loading="loading"></comment-list>
    </div>
  </div>
</template>

<script>
import CommentList from "./comment-list";
import CommentEditor from "@/components/base/comment-editor/comment-editor";
import {Message} from "element-ui";

export default {
  components: {
    CommentEditor,
    CommentList
  },

  props: {
    comments: {
      type: Array,
      default: () => []
    },

    articleId: {
      type: Number
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
    };
  },

  methods: {
    onReply(comment) {
      if (comment.root) {
        this.rootId = comment.id
      } else {
        this.rootId = comment.root_id
      }
      this.parentId = comment.id
      this.$refs.editor.reply = {
        content: comment.content
      }
      this.isShowReplyContent = true;
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
      if (!this.articleId) {
        return
      }
      if (this.isShowReplyContent) {
        // 回复评论(二级评论)
        if (!this.parentId) {
          return
        }
        try {
          data.article_id = this.articleId
          data.root = 0
          data.root_id = this.rootId
          data.parent_id = this.parentId
          const res = await this.$axios.$post('/v1/comment', data)
          if (res.code < 9999) {
            Message.success(res.message)
            this.closeReply()
            this.$emit('createCommentSuccess')
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      } else {
        // 创建评论(一级评论)
        try {
          data.article_id = this.articleId
          data.root = 1
          data.root_id = 0
          data.parent_id = 0
          const res = await this.$axios.$post('/v1/comment', data)
          if (res.code < 9999) {
            Message.success(res.message)
            this.$refs.editor.resetField()
            this.$emit('createCommentSuccess')
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
