<template>
  <div>
    <div class="title">
      <span style="margin: 0 0 20px 20px">注册账号</span>
      <el-divider></el-divider>
    </div>

    <div class="container">
      <div class="wrap">
        <el-row>
          <el-col :lg="22" :md="22" :sm="22" :xs="22">
            <el-form :model="form" status-icon ref="form" label-width="150px" @submit.native.prevent>
              <el-form-item label="用户名:" prop="username" required>
                <el-input size="medium" v-model="form.username" placeholder="请填写用户名(用户名的长度必须在 4~20 位之间)"/>
              </el-form-item>

              <el-form-item label="密码:" prop="password" required>
                <el-input type="password" size="medium" v-model="form.password" placeholder="请填写密码(密码长度必须在 6~20 位之间, 只可包含英文、数字和 _)"/>
              </el-form-item>


              <el-form-item label="确认密码:" prop="confirm_password" required>
                <el-input type="password" size="medium" v-model="form.confirm_password" placeholder="请再次填写密码(密码长度必须在 6~20 位之间, 只可包含英文、数字和 _)"/>
              </el-form-item>

              <el-form-item label="昵称:" prop="nickname" required>
                <el-input size="medium" v-model="form.nickname" placeholder="请填写昵称(昵称的长度必须在 1~20 位之间)"/>
              </el-form-item>

              <el-form-item label="邮箱:" prop="email" required>
                <el-input type="email" size="medium" v-model="form.email" placeholder="请填写邮箱"/>
              </el-form-item>


              <el-form-item class="submit">
                <el-button
                    type="primary"
                    @click="submitForm('form')"
                    :loading="loading"
                >注 册</el-button>

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
import customer from "@/models/customer";
import {Message} from "element-ui";

export default {
  name: "register-page",

  middleware: 'guest',

  data() {
    return {
      loading: false,

      form: {
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        nickname: ''
      }
    }
  },

  methods: {
    async submitForm(formName) {
      try {
        const form = { ...this.form }

        this.loading = true
        const res = await customer.register(form)
        this.loading = false

        if (res.code < 9999) {
          Message.success(`${res.message}`)

          // 注册成功之后进行登录
          await this.$auth.loginWith('local', {
            data: {
              username: this.form.username,
              password: this.form.password
            },
          })
        } else {
          Message.error(`${res.message}`)
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
