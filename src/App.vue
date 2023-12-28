<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">icatw壁纸</div>
      <div class="desc-en">icatw Wallpaper</div>
      <div class="tab-container">
        <!-- 左边导航 -->
        <router-link
          :to="item.path"
          :id="item.clss"
          class="yuanTab"
          :class="{ focusColor: item.id === $route.meta.id }"
          v-for="item in leftTab"
          :key="item.id"
        >
          <span>
            <i :class="`el-icon-${item.icon} yuan-icon`"></i>
            {{ item.text }}
          </span>
        </router-link>
        <!-- 个人中心 -->
        <el-dropdown v-show="islogin || isToken" @command="handleCommand" id="yuan-float-right">
          <div class="avatar-nickname-container">
            <el-avatar :src="userInfo?.avatar" size="small" fit="cover"></el-avatar>
            <span class="el-dropdown-link">
      {{ userInfo?.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="personalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-lock" command="updPass">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <!-- 登录 -->
        <router-link
          v-show="!islogin && !isToken"
          :to="login.path"
          :id="login.clss"
          class="yuanTab"
          :class="{ focusColor: login.id === $route.meta.id }"
        >
          <span>
            <i :class="`el-icon-${login.icon} yuan-icon`"></i>
            登录
          </span>
        </router-link>
        <!-- 关于 -->
        <router-link :to="about.path" class="yuanTab yuan-float-right"
                     :class="{ focusColor: about.id === $route.meta.id }">
          <span>
            <i :class="`el-icon-${about.icon} yuan-icon`"></i>
            {{ about.text }}
          </span>
        </router-link>
        <a href="http://www.icatw.top" target="_blank" class="yuanTab yuan-float-right">作者博客</a>
        <!-- 修改密码弹窗 -->
        <el-dialog title="修改密码" :visible.sync="dialogVisible" :append-to-body="true">
          <el-form :model="form" ref="forms" :rules="rules" class="form-container" label-width="100px">
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
            <el-button @click="dialogVisible = false" class="cancelBtn">取消</el-button>
            <el-button type="primary" @click="submitForm('forms')">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </nav>
    <transition enter-active-class="animated fadeIn">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import '@/assets/css/app.css'
import { removeToken, getToken } from '@/utils/token'
import { getUserInfo, removeUserInfo } from '@/utils/user'
import { mapState } from 'vuex'
import { updatePass } from '@/api/login'

export default {
  data () {
    return {
      // userInfo:getUserInfo()?getUserInfo().principal:null,
      dialogVisible: false,
      leftTab: [
        {
          id: 1,
          path: '/',
          clss: '',
          icon: 'house',
          text: '首页'
        },
        {
          id: 2,
          path: '/search',
          clss: '',
          icon: 'search',
          text: '搜索'
        },
        {
          id: 3,
          path: '/collection',
          clss: '',
          icon: 'star-off',
          text: '收藏'
        },
        {
          id: 4,
          path: '/message',
          clss: '',
          icon: 'message',
          text: '留言板'
        }
      ],
      person: {
        id: 4,
        path: '/person',
        clss: 'yuan-float-right',
        icon: 'user',
        text: '个人'
      },
      login: {
        id: 5,
        path: '/login',
        clss: 'yuan-float-right',
        icon: 'user',
        text: '登录'
      },
      about: {
        id: 6,
        path: '/concern',
        clss: '',
        icon: 'warning-outline',
        text: '关于'
      },
      isShowDropDown: false,
      isToken: getToken(),
      // islogin: getUserInfo(),
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
      form: {
        confirmPassword: '',
        newPassword: '',
        oldPassword: ''
      }
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {

    handleCommand (command) {
      // <el-dropdown-item icon="el-icon-plus" command="personalCenter">个人中心</el-dropdown-item>
      // <el-dropdown-item icon="el-icon-circle-plus" command="updPass">修改密码</el-dropdown-item>
      // <el-dropdown-item icon="el-icon-circle-plus-outline" command="logout">退出登录</el-dropdown-item>
      if (command === 'personalCenter') {
        //清除用户信息
        this.$router.push('/person')
      } else if (command === 'updPass') {
        this.dialogVisible = true
      } else if (command === 'logout') {
        this.logout()
      }

    },
    logout () {
      removeUserInfo()
      removeToken()
      localStorage.clear()
      sessionStorage.clear()
      this.$store.commit('changeLoginStatus', false)
      this.$store.commit('setUserInfo', null)
      window.location.reload()
    },
    mouseOver () {
      this.isShowDropDown = true
    },
    mouseOut () {
      this.isShowDropDown = false
    },
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updatePass(this.form).then(res => {
            if (res.success) {
              this.dialogVisible = false
              this.form = ''
              this.logout()
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
  },
  computed: {
    ...mapState(['islogin', 'userInfo'])
  },
  mounted () {
    // 在 mounted 钩子中输出 userInfo 进行调试
    // console.log('userInfo:', this.userInfo);
  }
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.avatar-nickname-container {
  display: flex;
  align-items: center;
}

.avatar-nickname-container .el-avatar {
  margin-right: 8px; /* 调整头像和昵称之间的间距 */
}

.el-icon-arrow-down {
  font-size: 12px;
}

/* Navbar样式 */
.navbar {
  padding: 0 30px 0 10px;
  display: flex;
  align-items: center;
  height: 50px;
  color: rgba(0, 0, 0, 0.64);
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  /* Logo样式 */

  .logo {
    padding: 0 5px;
    letter-spacing: 4px;
    font-weight: 550;
  }

  /* Desc-en样式 */

  .desc-en {
    margin: 0 20px;
    font-size: 9px;
  }

  /* Tab容器样式 */

  .tab-container {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    height: 100%;
    font-size: 14px;
    /* YuanTab样式 */

    .yuanTab {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 90px;
      height: 50px;
      letter-spacing: 3px;
      box-sizing: border-box;
      /* YuanIcon样式 */

      .yuan-icon {
        padding-right: 3px;
        font-weight: 600;
      }

      &:hover {
        background: rgb(240, 240, 240);
      }

      .drop-down {
        margin-top: 40px;
        z-index: 99;
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 85px;

        ul {
          padding-top: 20px;

          li {
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: red;
            background-color: #fff;
            border-radius: 2px;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
    }

    #yuan-float-right {
      margin-left: auto;
    }
  }
}

/* El-dialog样式 */
.el-dialog {
  width: 45%;
  border-radius: 8px;
  /* Form-footer样式 */

  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    margin-top: -10px;
  }

  /* El-button样式 */

  .form-footer .el-button {
    padding: 10px 25px;
    border: none;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  /* Primary按钮样式 */

  .form-footer .el-button--primary {
    background: #71c9ce;
  }

  /* CancelBtn样式 */

  .cancelBtn:hover {
    color: #71c9ce;
    //background-color: none;
  }
}

/* Input-field样式 */
.input-field {
  width: 400px;
  margin: 0;
  text-align: left;
}

/* FocusColor样式 */
.focusColor {
  color: #71c9ce;
  border: 2px solid transparent;
  border-bottom: 2px solid #71c9ce;
}
</style>
