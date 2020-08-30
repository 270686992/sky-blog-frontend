<template>
  <div>
    <div class="title">
      <span style="margin: 0 0 20px 20px">个人中心</span>
      <el-divider></el-divider>
    </div>

    <div class="container">
      <div class="wrap">
        <el-row>
          <el-col :lg="22" :md="22" :sm="22" :xs="22">
            <el-form :model="form" status-icon ref="form" label-width="150px" @submit.native.prevent>
              <el-form-item label="用户名:" prop="username" required>
                <el-input disabled size="medium" v-model="form.username" placeholder="请填写用户名(用户名的长度必须在 4~20 位之间)"/>
              </el-form-item>

              <el-form-item label="昵称:" prop="nickname" required>
                <el-input disabled size="medium" v-model="form.nickname" placeholder="请填写昵称(昵称的长度必须在 1~20 位之间)"/>
              </el-form-item>

              <el-form-item label="邮箱:" prop="email" required>
                <el-input disabled type="email" size="medium" v-model="form.email" placeholder="请填写邮箱"/>
              </el-form-item>

              <el-form-item class="submit">
                <el-button
                    type="primary"
                    @click="logOut()"
                    :loading="loading"
                >退出登录</el-button>

<!--                <el-button @click="resetForm('form')">重 置</el-button>-->
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";
import { mapGetters } from 'vuex'

export default {
  name: "center-page",

  middleware: 'auth',

  data() {
    return {
      loading: false,

      form: {
        username: '',
        email: '',
        nickname: ''
      }
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },

  mounted() {
    const customer = this.loggedInUser
    this.form.username = customer.username
    this.form.email = customer.email
    this.form.nickname = customer.nickname
  },

  methods: {
    async logOut() {
      try {
        this.loading = true
        await this.$auth.logout()
        this.loading = false
        Message.success('退出登录成功')
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: #3963bc;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    text-align: center;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
