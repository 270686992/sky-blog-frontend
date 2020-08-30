<template>
  <div>
    <div class="title">
      <span style="margin: 0 0 20px 20px">登 录</span>
      <el-divider></el-divider>
    </div>

    <div class="container">
      <div class="wrap">
        <el-row>
          <el-col :lg="22" :md="22" :sm="22" :xs="22">
            <el-form :model="form" status-icon ref="form" label-width="150px" @submit.native.prevent>
              <el-form-item label="用户名:" prop="username" required>
                <el-input size="medium" v-model="form.username" placeholder="请填写用户名"/>
              </el-form-item>

              <el-form-item label="密码:" prop="password" required>
                <el-input type="password" size="medium" v-model="form.password" placeholder="请填写密码"/>
              </el-form-item>

              <el-form-item class="submit">
                <el-button
                    type="primary"
                    @click="submitForm('form')"
                    :loading="loading"
                >登 录</el-button>

                <el-button @click="resetForm('form')">重 置</el-button>
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

export default {
  name: "login-page",

  middleware: 'guest',

  data() {
    return {
      loading: false,

      form: {
        username: '',
        password: '',
      }
    }
  },

  methods: {
    async submitForm(formName) {
      try {
        this.loading = true
        const res = await this.$auth.loginWith('local', {
          data: this.form
        })
        this.loading = false

        if (res.data.token) {
          Message.success('登录成功')
        } else {
          Message.error(`${res.message}`)
          this.$router.push('/login')
        }
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
