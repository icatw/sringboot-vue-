<template>
  <div class="register-form">
    <h2 class="register-title">注册新账号</h2>
    <el-form :model="formData" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" clearable prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="formData.password" clearable
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" show-password v-model="formData.confirmPassword" clearable
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register" round class="register-button">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="go-login center">
      <span>已有账号？</span>
      <el-button type="text" @click="goToPage('login')">去登录</el-button>
    </div>
  </div>
</template>

<script>
import { getMy, login, sendCode, register } from '@/api/login'

export default {
  data () {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: this.validatePasswordConfirm,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validatePasswordConfirm (rule, value, callback) {
      if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    },
    register () {
      this.$refs.form.validate(valid => {
        if (valid) {
          register(this.formData).then(res => {
            if (res.success) {
              this.$router.push({
                path: '/login'
              })
            }
          })
          // 在这里执行注册逻辑，可以调用后端注册接口
          console.log('执行注册逻辑', this.formData)
        }
      })
    },
    goToPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .register-title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .register-button {
    width: 100%;
  }

  .el-input {
    width: 100%;
    margin-bottom: 15px;
  }

  .go-login {
    margin-top: 10px;

    el-button {
      margin-right: 10px;
      font-size: 14px;
      color: #409eff;
    }
  }
}
</style>
