<template>
  <div>
    <!-- banner -->
    <div class="message-banner"
         style="background: url('http://icatw-blog.oss-cn-beijing.aliyuncs.com/config/88b67fe99351c59bca1635e02bbc1683.jpg') center center / cover no-repeat;">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input
            v-model="messageContent"
            @click="show = true"
            @keyup.enter="addToList"
            placeholder="说点什么吧"
          />
          <button
            class="ml-3 animated bounceInLeft"
            @click="addToList"
            v-show="show"
          >
            发送
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-baberrage :barrageList="barrageList" :isShow="true" :loop="true">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                :src="slotProps.item.avatar"
                width="30"
                height="30"
                style="border-radius:50%"
              />
              <span class="ml-2">{{ slotProps.item.nickname }} :</span>
              <span class="ml-2">{{ slotProps.item.messageContent }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import {
  vueBaberrage,
  MESSAGE_TYPE
} from 'vue-baberrage'
import { listMessage, saveMessage } from '@/api/paper'

export default {
  mounted () {
    this.listMessage()
  },
  data () {
    return {
      show: false,
      messageContent: '',
      barrageList: []
    }
  },
  methods: {
    // addToList () {
    //
    // },
    addToList () {
      if (this.messageContent.trim() == '') {
        this.$message('留言不能为空', 'error')
        return false
      }
      console.log(this.$store.state.userInfo)
      const userAvatar = this.$store.state.userInfo
        ? this.$store.state.userInfo.avatar
        : 'http://icatw-blog.oss-cn-beijing.aliyuncs.com/config/0bca52afdb2b9998132355d716390c9f.png'
      const userNickname = this.$store.state.userInfo
        ? this.$store.state.userInfo.nickname
        : '游客'
      var message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * (10 - 7)) + 7
      }
      this.barrageList.push(message)
      this.messageContent = ''
      this.saveMsg(message)
    },
    async saveMsg (message) {
      const res = await saveMessage(message)
      console.log(res)
    },
    listMessage () {
      listMessage().then(res => {
        this.barrageList = res.data
      })
    }
  }
  ,
  created () {
  }
  ,
  computed: {
    // cover() {
    //   var cover = "";
    //   this.$store.state.blogInfo.pageList.forEach(item => {
    //     if (item.pageLabel == "message") {
    //       cover = item.pageCover;
    //     }
    //   });
    //   return "background: url(" + cover + ") center center / cover no-repeat";
    // }
  }
}
</script>

<style scoped>
.message-banner {
  //position: absolute;
  top: 0; /* Change this line */
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #49b1f5;
  animation: header-effect 1s;
}

.message-title {
  color: #eee;
  animation: title-scale 1s;
}

.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
  background-color: transparent;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}
.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  //padding: 0 1.25rem;
  color: inherit;
  text-transform: none;
  border: #fff 1px solid;
  background-color: transparent;
  width: 60px; /* Increase the width */
}

.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 50px);
  width: 100%;
}

.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>
