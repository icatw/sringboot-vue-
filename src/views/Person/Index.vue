<template>
  <div class="person">
    <aside class="aside-bar">
      <div class="top-img">
        <el-upload ref="upload"
                   class="avatar-uploader"
                   :action="uploadUrl"
                   :data="uploadData"
                   :headers="headers"
                   :show-file-list="false"
                   :on-success="uploadImage">
          <img v-if="imgUrl"
               :src="imgUrl"
               class="avatar"/>
        </el-upload>

      </div>
      <ul style="margin-top:30px">
        <li :class="{active:item.id==$route.meta.id}"
            v-for="item in asideBar"
            :key="item.id">
          <router-link :to="item.path">{{ item.text }}</router-link>
        </li>
      </ul>
    </aside>
    <section class="main-cont">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { getMy, updateAvatar } from '@/api/login'
import { removeUserInfo, getUserInfo, setUserInfo } from '@/utils/user'
import { getToken } from '@/utils/token'

export default {
  data () {
    return {
      uploadUrl: 'http://localhost:9888/upload/picture',
      headers: { Authorization: getToken() },
      uploadData: {
        uploadModule: '/user',
        uploadPath: '/avatar/' + getUserInfo().principal.id
      },
      asideBar: [
        {
          id: 4,
          path: '/person/home',
          text: '个人首页'
        },
        {
          id: 4.2,
          path: '/person/set',
          text: '信息管理'
        }
        // {
        //   id: 4.3,
        //   path: '/person/account',
        //   text: '修改密码'
        // }
      ],
      imgUrl: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      baseUrl: 'http://localhost:9888'
    }
  },
  computed: {},
  methods: {
    async getInfo () {
      let myInfo = getUserInfo()
      if (!myInfo) {
        const res = await getMy()
        if (res.success) {
          setUserInfo(res.data)
          myInfo = res.data
        }
      }
      this.imgUrl = myInfo.principal.avatar
    },
    // 头像更新
    async uploadImage (res) {
      const result = await updateAvatar(res.data)
      if (result.success) {
        removeUserInfo()
        this.$message('头像更新成功', 'success')
        this.getInfo()
      }
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>
.person {
  display: flex;
  margin: 40px auto;
  width: 1000px;

  .aside-bar {
    padding-bottom: 50px;
    height: 300px;
    width: 170px;
    background-color: #fff;
    border-radius: 6px;
    /* 顶部头像 */

    .top-img {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .avatar-uploader {
        height: 100px;
        width: 100px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    li {
      text-indent: 10px;
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.6);
      letter-spacing: 1px;
      border: 3px solid transparent;
      box-sizing: border-box;
      cursor: pointer;

      a {
        display: block;
        width: 100%;
      }
    }
  }

  .main-cont {
    flex: 1;
    margin-left: 15px;

    background-color: #fff;
  }
}

/* 导航选中样式 */
.active {
  border-left: 3px solid #71c9ce !important;
  color: #71c9ce !important;
  background-color: rgba(203, 241, 245, 0.4);
}
</style>
