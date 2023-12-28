<template>
  <div class="login-register-form">
    <h2 class="login-title">{{ loginByPhone ? '手机号登录' : '账号登录' }}</h2>
    <el-form :model="formData" :rules="rules" ref="form" label-width="0">
      <!-- 手机号 + 验证码登录 -->
      <el-form-item v-show="loginByPhone" class="form-item-with-button">
        <el-input
          v-model="formData.phoneNumber"
          placeholder="手机号"
          clearable
          prefix-icon="el-icon-mobile"
        ></el-input>
        <div class="verification-code-container">
          <el-input
            v-model="formData.phoneCode"
            placeholder="验证码"
            clearable
            prefix-icon="el-icon-message"
          ></el-input>
          <el-button
            type="primary"
            @click="sendVerificationCode"
            :disabled="countdown > 0"
            class="verification-code-button"
          >{{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>

      <!-- 账号 + 密码登录 -->
      <el-form-item v-show="!loginByPhone" class="form-item-with-button">
        <el-input
          v-model="formData.username"
          placeholder="用户名"
          clearable
          prefix-icon="el-icon-user"
        ></el-input>
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="密码"
          clearable
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <SliderVerificationCode height="35px"
                                content="请拖动滑块进行验证"
                                inactiveValue="未验证"
                                activeValue="已验证"
                                v-model="isPass"/>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item class="center">
        <el-button type="primary" @click="login" round class="login-button">{{
            loginByPhone ? '登录/注册' : '登录'
          }}
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 切换登录方式 -->
    <div class="switch-login-mode center">
      <el-button type="text" @click="toggleLoginMode">{{
          loginByPhone ? '账号密码登录' : '手机号验证码登录'
        }}
      </el-button>
    </div>
    <!-- 新增：没有账号去注册 -->
    <div class="no-account center">
      <span>没有账号？</span>
      <el-button type="text" @click="goToPage('register')">去注册</el-button>
    </div>

    <!-- 三方登录 -->
    <div class="third-party-login center">
      <!--      <el-button type="text" @click="thirdPartyLogin('QQ')" icon="el-icon-s-flag">QQ登录</el-button>-->
      <!--      <el-button type="text" @click="thirdPartyLogin('gitee')" icon="el-icon-gitee">Gitee登录</el-button>-->
      <!--      <el-button type="text" @click="thirdPartyLogin('gitee')" icon="el-icon-gitee">Gitee登录</el-button>-->
      <el-button type="text" @click="thirdPartyLogin('gitee')"><i class="iconfont icon-gitee"></i></el-button>
      <el-button type="text" @click="thirdPartyLogin('github')"><i class="iconfont icon-social-github"></i></el-button>
      <!--      <i class="iconfont icon-social-github"></i> <br>-->
    </div>
  </div>
</template>

<script>
import { getMy, login, register, sendCode, smsLogin, socialLogin } from '@/api/login'
import { getToken, setToken } from '@/utils/token'
import config from '@/api/oauth'
import { setUserInfo } from '@/utils/user'
import '@/assets/iconfont/iconfont.css'

export default {
  data () {
    return {
      isPass: false,
      QQ_APP_ID: config.QQ_APP_ID,
      formData: {
        phoneNumber: '',
        phoneCode: '',
        username: '',
        password: ''
      },
      rules: {
        phoneNumber: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        phoneCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      loginByPhone: true, // 默认使用手机号+验证码登录
      countdown: 0 // 倒计时
    }
  },
  methods: {
    // 发送验证码
    sendVerificationCode () {
      if (!this.isPass) {
        this.$message('请先通过滑块验证', 'error')
        return
      }
      if (!this.countdown) {
        this.$refs.form.validate(valid => {
          if (valid) {
            sendCode(this.formData.phoneNumber).then(res => {
              if (res.code === 200) {
                this.countdown = 60
                this.timer = setInterval(() => {
                  this.countdown--
                  if (this.countdown <= 0) {
                    clearInterval(this.timer)
                  }
                }, 1000)
              }

            })
          }
        })
      }
      // 模拟倒计时60秒
      // this.countdown = 60
      // const timer = setInterval(() => {
      //   this.countdown--
      //   if (this.countdown <= 0) {
      //     clearInterval(timer)
      //   }
      // }, 1000)
    },
    goToPage (page) {
      this.$router.push({
        path: page
      })
    },
    // 切换登录方式
    toggleLoginMode () {
      this.loginByPhone = !this.loginByPhone
    },
    // 登录
    async submit (formData) {
      let res = null
      if (this.loginByPhone) {
        res = await smsLogin(formData)
      } else {
        res = await login(formData)
      }
      if (res.success) {
        // localStorage存储token、用户信息
        setToken(res.data)
        this.$store.commit('changeLoginStatus', true)
        // window.location.reload()
        const myInfoRes = await getMy()
        if (myInfoRes.success) {
          setUserInfo(myInfoRes.data)
          this.$store.commit('setUserInfo', myInfoRes.data.principal)
        }
        this.$router.push({
          path: '/home'
        })
      }
    },
    // 登录
    login () {
      if (!this.isPass) {
        this.$message('请先通过滑块验证', 'error')
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          localStorage.clear()
          sessionStorage.clear()
          // removeToken()
          // removeUserInfo()
          this.submit(this.formData)
        }
      })
    },

    // 三方登录
    async thirdPartyLogin (platform) {
      console.log(`使用${platform}登录`)
      let res = await socialLogin(platform)
      //获取到后端传递过来的授权路径
      //跳转到gitee授权页
      window.location.href = res.data.url
    },
  }
}
</script>

<style scoped>
.login-register-form {
  max-width: 350px; /* Decrease the max-width */
  margin: 80px auto; /* Decrease the margin */
  padding: 15px; /* Decrease the padding */
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .login-title {
    text-align: center;
    font-size: 16px; /* Decrease the font size */
    margin-bottom: 15px; /* Decrease the margin-bottom */
  }

  .el-input {
    width: 100%;
    margin-bottom: 10px; /* Decrease the margin-bottom */
  }

  .form-item-with-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px; /* Decrease the margin-bottom */
  }

  .verification-code-container {
    display: flex;
    align-items: center;
  }

  .verification-code-button {
    flex-shrink: 0;
    margin-left: 10px;
    margin-bottom: 15px;
  }

  .center {
    text-align: center;
  }

  .switch-login-mode, .third-party-login {
    margin-top: 5px;

    el-button {
      margin-right: 10px;
      font-size: 14px;
      color: #409eff;
    }
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 26px; /* Increase the font size */
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: inherit; /* Add this line */
  }

  .third-party-login {
    el-button {
      font-size: 18px; /* Increase the font size */
      color: #409eff;
    }
  }

  .login-button {
    width: 100%;
  }
}
</style>
