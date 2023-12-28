<template>
  <div class="enroll">
    <div class="enrollCont">
      <h1>登录</h1>
      <el-form :model="ruleForm"
               label-width="90px">
        <el-form-item label="账号 :"
                      prop="uname">
          <el-input type="text"
                    v-model="ruleForm.uname"
                    placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码 :"
                      prop="pass">
          <el-input type="password"
                    v-model="ruleForm.pass"
                    placeholder="输入密码"
                    show-password></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <div class="submit">
          <el-button type="primary"
                     @click="login">确认登录</el-button>
        </div>
        <div class="go-neroll"><a href="javascript:;"
             @click.prevent="goenroll">没有账号？注册</a></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getMy } from '@/api/login'
import { setToken, removeToken } from '@/utils/token'
import { removeUserInfo, getUserInfo, setUserInfo } from '@/utils/user'
export default {
  data () {
    return {
      // 表单数据
      ruleForm: {
        uname: '',
        pass: ''
      }
    }
  },
  methods: {
    // 登录
    async submit (loginInfo) {
      const res = await login(loginInfo)
      if (res.success) {
        // localStorage存储token、用户信息
        setToken(res.data)
        this.$store.commit('changeLoginStatus', true)
        this.$router.push({
          path: '/home'
        })
        // window.location.reload()
        const myInfoRes = await getMy()
        if (myInfoRes.success) {
          setUserInfo(myInfoRes.data)
          this.$store.commit('setUserInfo', myInfoRes.data.principal)
        }
      }
    },
    login () {
      localStorage.clear()
      // removeToken()
      // removeUserInfo()
      this.submit(this.ruleForm)
    },
    // 前往注册页面
    goenroll () {
      this.$router.push({
        path: '/enroll'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enroll {
  position: relative;
  height: calc(100vh - 60px);
  background-color: rgb(238, 238, 238);
  .enrollCont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 300px;
    padding: 20px 0;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    color: #000;
    h1 {
      padding: 20px 0;
      text-align: center;
      letter-spacing: 1em;
      text-indent: 1em;
      color: rgb(0, 0, 0);
    }

    :deep(.el-form-item) {
      margin-bottom: 30px;
      /* label样式修改 */
      .el-form-item__label {
        color: #000;
        position: relative;
        /* *号修改 */
        &::before {
          position: absolute;
          right: 49px;
          top: 3px;
          color: #fff;
        }
      }
      /* 提交按钮 */
      .el-button--primary {
        background-color: rgb(255, 193, 49);
        border: none;
        font-size: 16px;
        letter-spacing: 2px;
      }
    }
    :deep(.el-input) {
      width: 210px;
    }
    /* 提交按钮 */
    .submit {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      .el-button--primary {
        background-color: #71c9ce;
        border: none;
        letter-spacing: 3px;
        font-size: 16px;
      }
    }
    .go-neroll {
      padding-top: 20px;
      padding-right: 18px;
      text-align: right;
      font-size: 12px;
      a {
        color: #76cbd0;
      }
    }
  }
}
</style>
