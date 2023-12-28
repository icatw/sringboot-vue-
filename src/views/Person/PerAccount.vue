<template>
  <div class="password-form">
    <el-divider><span class="form-title">修改密码</span></el-divider>

    <el-form :model="form" ref="forms" :rules="rules" class="form-container">
      <el-form-item label="原密码" prop="oldPassword" class="form-item">
        <el-input v-model="form.oldPassword" autocomplete="off" show-password class="input-field"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword" class="form-item">
        <el-input v-model="form.newPassword" autocomplete="off" show-password class="input-field"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword" class="form-item">
        <el-input v-model="form.confirmPassword" autocomplete="off" show-password class="input-field"></el-input>
      </el-form-item>
    </el-form>

    <div class="form-footer">
      <el-button type="primary" @click="submitForm('forms')" class="submit-btn">确定</el-button>
    </div>
  </div>
</template>

<script>
import { updatePass } from '@/api/login'

export default {
  data () {
    return {
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            validator: this.validatePassword,
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            validator: this.validatePassword,
            trigger: 'blur'
          },
          {
            validator: this.validateConfirmation,
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false,
      form: {
        confirmPassword: '',
        newPassword: '',
        oldPassword: ''
      }
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updatePass(this.form).then(res => {
            if (res.success) {
              this.dialogVisible = false
              this.$message('成功', 'success')
            }
          })
        } else {
          this.$message('密码表单校验失败', 'error')
        }
      })
    },
    validatePassword (rule, value, callback) {
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/
      if (!passwordReg.test(value)) {
        callback(new Error('密码至少包含字母、数字,6~20位'))
      } else {
        callback()
      }
    },
    validateConfirmation (rule, value, callback) {
      if (value === this.form.newPassword) {
        callback()
      } else {
        callback(new Error('确认密码错误'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.password-form {
  display: flex;
  flex-direction: column;
  //align-items: center;
  padding: 30px;
}
:deep(.el-form-item__label) {
  width: 100px !important;
}
.form-title {
  font-size: 16px;
  letter-spacing: 3px;
  color: rgba(0, 0, 0, 0.6);
}

.form-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  margin-bottom: 15px;
}

.input-field {
  width: 200px;
  margin: 0;
  text-align: left;
}

.form-footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-top: -10px;
}

.submit-btn {
  padding: 10px 25px;
  border: none;
  margin-top: -10px;
  margin-bottom: 10px;
  background: #71c9ce;
}

.submit-btn:hover {
  color: #71c9ce;
  background-color: #71c9ce;
}
</style>
