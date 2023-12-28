<template>
  <div class="personal-home">
    <el-divider><span class="section-title">个人信息</span></el-divider>
    <ul class="personal-info">
      <li><span>昵称:</span>{{ userinfo.nickname }}</li>
      <li><span>账号:</span>{{ userinfo.username }}</li>
      <li><span>性别:</span>{{ formatGender(userinfo.gender) }}</li>
      <div class="bio-section">
        <span>个人简介:</span>
        <p>{{ userinfo.personIntro }}</p>
      </div>
    </ul>
  </div>
</template>

<script>
import { getMy } from '@/api/login'
import { removeUserInfo, getUserInfo, setUserInfo } from '@/utils/user'

export default {
  data() {
    return {
      userinfo: {}
    }
  },
  methods: {
    formatGender(gender) {
      return gender === 0 ? '女' : gender === 1 ? '男' : '未知';
    },
    async fetchUserInfo() {
      let userInfo = getUserInfo();
      if (userInfo) {
        this.userinfo = userInfo.principal;
      } else {
        let res = await getMy();
        this.userinfo = res.data.principal;
      }
    }
  },
  created() {
    this.fetchUserInfo();
  }
}
</script>

<style lang="less" scoped>
.personal-home {
  min-height: 400px;
  padding: 30px;
  .section-title {
    font-size: 16px;
    letter-spacing: 3px;
    color: rgba(0, 0, 0, 0.6);
  }
  .personal-info {
    li {
      height: 50px;
      font-size: 15px;
      letter-spacing: 1px;
      span {
        display: inline-block;
        margin-right: 20px;
        width: 80px;
        text-align: right;
        letter-spacing: 2px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    /* Bio Section */
    .bio-section {
      display: flex;
      min-height: 60px;
      font-size: 15px;
      span {
        margin-right: 20px;
        width: 80px;
        text-align: right;
        letter-spacing: 2px;
        color: rgba(0, 0, 0, 0.6);
      }
      p {
        flex: 1;
        line-height: 22px;
        font-family: '宋体';
        letter-spacing: 1px;
      }
    }
  }
}
</style>
