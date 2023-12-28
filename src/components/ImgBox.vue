<template>
  <div class="wrap">
    <div class="img-box">
      <img :src="imgSrc"
           alt="图片失踪了"
           @click="showBigImage(imgSrc)">
      <span class="res-span">{{imgSize}}</span>
      <span class="img-down">
        <a @click.prevent="saveImg(ids,imgSrc)">保存</a>
      </span>
      <span class="like-img">
        <button @click="changeStatus(ids)">
          <img v-if="status==1"
               :src="solid"
               alt="">
          <img v-else
               :src="hollow"
               alt="">
        </button>
      </span>
    </div>
    <show-big :visible="photoVisible"
              :url="bigImg"
              :ids="ids"
              :status="status"
              @closeClick="closeBigImg" />
  </div>

</template>

<script>
import { imgdown, imgcoll } from '@/api/paper'
import { mapActions } from 'vuex'
// svg图片
import hollow from '@/assets/image/hollow.svg'
import solid from '@/assets/image/solid.svg'
import showBig from '@/components/ShowBig.vue' // 图片放大
export default {
  props: ['imgSrc', 'imgSize', 'ids', 'status'],
  components: {
    showBig
  },
  data () {
    return {
      hollow,
      solid,
      bigImg: '',
      photoVisible: false,
      idss: 0
    }
  },
  methods: {
    ...mapActions(['getPaper']),
    // 保存，取消收藏
    async changeStatus (ids) {
      const { data: res } = await imgcoll(ids)
      // 重新加载页面
      window.location.reload()
      console.log(res)
    },
    // 下载图片
    saveImg (ids, imgSrc) {
      imgdown(ids).then(res => {
        console.log(res)
        const content = res
        const blob = new Blob([content])
        const fileName = `${imgSrc}`
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a') // 创建一个a标签通过a标签的点击事件区下载文件
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob) // 使用blob创建一个指向类型数组的URL
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    // 显示图片
    showBigImage (imgSrc) {
      // 图片放大
      this.bigImg = imgSrc
      this.photoVisible = true
    },
    // 关闭图片
    closeBigImg () {
      this.photoVisible = false
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
.img-box {
  width: 100%;
  height: 240px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    &:hover {
      box-shadow: rgb(127 127 127 / 50%) 0px 0px 10px;
    }
  }
  /*  分辨率，下载 */
  .res-span,
  .img-down {
    position: absolute;
    top: 0px;
    display: inline-block;
    padding: 2px 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
  }
  /* 分辨率 */
  .res-span {
    left: 0px;
    font-size: 10px;
    border-radius: 12px 0 0 0;
  }
  /* 下载 */
  .img-down {
    right: 0px;
    line-height: 14px;
    border-radius: 0 12px 0 0;
    a {
      font-size: 10px;
      font-weight: 550;
      color: #fff;
      letter-spacing: 1px;
    }
  }
  .like-img {
    position: absolute;
    bottom: 1px;
    right: 3px;
    button {
      background-color: transparent;
      border: none;
      color: #fff;
      cursor: pointer;
      img {
        width: 40px;
        height: 25px;
      }
    }
  }
}
</style>
