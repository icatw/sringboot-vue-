<template>
  <div class="per-set">
    <el-divider><span class="expl-writing">修改信息</span></el-divider>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="昵称"
                    prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="-1">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介"
                    prop="personIntro">
        <el-input type="textarea"
                  v-model="ruleForm.personIntro"></el-input>
      </el-form-item>
      <el-form-item class="btn-sure">
        <el-button type="primary"
                   @click="submitForm('ruleForm')">更新</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { getMy, updateUser } from '@/api/login'
import { removeUserInfo, getUserInfo, setUserInfo } from '@/utils/user'
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        nickname: [{ required: true, message: '请输入您的昵称', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择您的性别', trigger: 'blur' }],
        personIntro: [{ max: 100, message: '个人简介不超过100字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          updateUser(this.ruleForm).then(res => {
            if (res.success) {
              this.$message('更新成功', 'success')
            }
          })
        }
      })
    },
    async getUser() {
      let myInfo = getUserInfo()
      if (!myInfo) {
        const res = await getMy()
        if (res.success) {
          setUserInfo(res.data)
          myInfo = res.data
        }
      }
      this.ruleForm = myInfo.principal
      // let res = await getMy()
      // this.ruleForm = res.data.principal
      // console.log(res.data)
    }
  },
  watch: {},
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.per-set {
  min-height: 400px;
  padding: 30px 30px 0 30px;
  .expl-writing {
    font-size: 16px;
    letter-spacing: 3px;
    color: rgba(0, 0, 0, 0.6);
  }
  :deep(.el-form) {
    padding: 30px 100px 0 0;
    // 提交按钮
    .btn-sure {
      display: flex;
      justify-content: center;
      .el-button {
        margin-top: 20px;
        padding: 10px 30px;
        font-size: 15px;
        letter-spacing: 10px;
        text-indent: 7px;
        background-color: #71c9ce;
        border-color: #71c9ce;
      }
    }
    // 单选框
    .is-checked .el-radio__inner {
      border-color: #71c9ce;
      background: #71c9ce;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #71c9ce;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #71c9ce;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
