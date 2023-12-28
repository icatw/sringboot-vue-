<template>
  <div class="enroll">
    <div class="enrollCont">
      <h1>注册</h1>
      <!-- 账号 -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="90px">
        <el-form-item label="账号 :"
                      prop="uname">
          <el-input type="text"
                    v-model="ruleForm.username"
                    placeholder="手机号码"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码 :"
                      prop="pass">
          <el-input type="password"
                    v-model="ruleForm.password"
                    placeholder="包含字母、数字,6~20位"
                    show-password></el-input>
        </el-form-item>

        <!-- 提交按钮 -->
        <div class="submit">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即注册</el-button>
        </div>
        <!-- 已有账号 -->
        <div class="hasAcnt">
          <router-link to="/login">已有账号</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/login'
export default {
  data() {
    /* 校验账号->手机号码 */
    var validateUname = (rule, value, callback) => {
      let inpname = /^1[3456789]\d{9}$/
      if (!inpname.test(value)) {
        callback(new Error('输入正确手机号码'))
      } else {
        callback()
      }
    }
    // 校验密码函数
    var validatePass = (rule, value, callback) => {
      let ipupass = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/
      if (!ipupass.test(value)) {
        callback(new Error('密码至少包含字母、数字,6~20位'))
      } else {
        callback()
      }
    }

    return {
      //表单数据
      ruleForm: {
        username: '',
        password: ''
      },
      //表单校验
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { validator: validateUname, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册方法
    async registerHandle(userinfo) {
      let res = await register(userinfo)
      console.log(res)
      if (res.success) {
        this.$router.push({
          path: '/login'
        })
      }
    },
    // 提交表单处理函数
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        // 校验通过
        if (valid) {
          console.log(this.ruleForm.username)
          console.log(this.ruleForm.password)
          this.registerHandle(this.ruleForm)
        }
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
    height: 340px;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    color: #fff;
    h1 {
      padding: 25px 0;
      text-align: center;
      letter-spacing: 1em;
      text-indent: 1em;
      color: rgb(0, 0, 0);
    }
    :deep(.el-form-item__content) {
      .el-input {
        width: 210px;
      }
      /* 错误提示 */
      .el-form-item__error {
        letter-spacing: 1px;
        padding: 6px 0 0 4px;
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 25px;
      &:nth-child(2) {
        margin-bottom: 15px;
      }
    }
    .hasAcnt {
      padding-top: 10px;
      padding-right: 50px;
      text-align: right;
      font-size: 12px;
      letter-spacing: 1px;
      a {
        color: #76cbd0;
      }
    }

    /* 提交按钮 */
    .submit {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      .el-button--primary {
        border: none;
        letter-spacing: 3px;
        font-size: 16px;
        background-color: #71c9ce;
      }
    }
  }
}
</style>
