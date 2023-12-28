<template>
  <div class="concern">
    <div class="page-cont">
      <div class="img-top">
        <img :src="QRCode">
      </div>
      <div class="introduce">
        <p>
          <span class="contact-info">
            <i class="iconfont icon-social-qq"></i> : <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=762188827&site=qq&menu=yes">762188827</a><br>
            <i class="iconfont icon-social-wechat"></i> : <a target="_blank" href="javascript:" @click="showWeChatQR">iCat0297</a><br>
            <i class="iconfont icon-gitee"></i> : <a target="_blank" href="https://gitee.com/icatw">https://gitee.com/icatw</a><br>
            <i class="iconfont icon-social-github"></i> : <a target="_blank" href="https://github.com/icatw">https://github.com/icatw</a><br>
          </span><br><br>
          <span class="bio">
            简介: 不知道写什么.
          </span>
        </p>
      </div>
      <el-dialog
        :visible.sync="showQRDialog"
        title="微信扫码与我联系"
        @close="showQRDialog = false"
        width="350px"
        center
      >
        <img :src="QRCode" alt="WeChat QR Code" style="width: 100%; max-width: 300px; height: auto;">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QRCode from '@/assets/image/QRCode.png'
import '@/assets/iconfont/iconfont.css'

export default {
  data () {
    return {
      QRCode,
      showQRDialog: false
    }
  },
  methods: {
    showWeChatQR() {
      // 点击 WeChat 图标时显示二维码对话框
      this.showQRDialog = true;
    },
  }
}
</script>

<style lang="less" scoped>
.icon {
  margin-right: 5px;
  font-size: 20px;
}

.page-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto;
  padding: 40px 0 60px 0;
  width: 630px;
  min-height: 200px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  /* 图片 */

  .img-top {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .introduce {
    margin-top: 50px;
    width: 400px;
    min-height: 300px;

    p {
      font-size: 20px;
      //text-indent: 2em;
      line-height: 33px;
      letter-spacing: 1px;
    }
    .contact-info {
      font-size: 16px;
      line-height: 24px;
    }

    .bio {
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
    }
  }
}
</style>
