<template>

  <div v-show="visible"
       class="showPhoto">
    <img class="img"
         :src="url"
         alt="图片加载失败" />
    <button class="colse"
            @click="closeClick"><i class="el-icon-close"></i></button>
    <div class="img-tools-bar">
      <!-- 收藏 -->
  <!--     <button @click="changeStatus(ids,status)">
        <img v-if="status==1"
             :src="solid"
             alt="">
        <img v-else
             :src="hollow"
             alt="">
      </button> -->
      <!-- 下载 -->
      <button @click="saveImg(ids,url)"> <img :src="loaddown"
             alt=""></button>
      <!-- 全屏 -->
      <button @click="changeFull">
        <img v-if="isFull"
             :src="cancelfull"
             alt="">
        <img v-else
             :src="full"
             alt="">
      </button>
    </div>
  </div>

</template>
 
<script>
// svg图标
import hollow from '@/assets/image/hollow.svg'
import solid from '@/assets/image/solid.svg'
import loaddown from '@/assets/image/loaddown.svg'
import cancelfull from '@/assets/image/cancelfull.svg'
import full from '@/assets/image/full.svg'
import screenfull from 'screenfull'
import { imgdown, imgcoll } from '@/api/paper'
export default {
  props: ['url', 'visible', 'ids', 'status'],
  data() {
    return {
      hollow,
      solid,
      loaddown,
      cancelfull,
      full,
      loveShow: false, // 判断是否收藏
      isFull: false // 判断是否全屏
    }
  },
  methods: {
    // 退出全屏
    exitFullscreen() {
      let de = document
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      } else if (de.msExitFullscreen) {
        de.msExitFullscreen()
      }
    },
    // 关闭预览
    closeClick() {
      if (document.fullscreenElement) {
        this.exitFullscreen()
      }
      this.$emit('closeClick')
    },
    // 切换收藏
    async changeStatus(ids) {
      let { data: res } = await imgcoll(ids)
      console.log(res)
    },
    // 切换全屏
    changeFull() {
      this.isFull = !this.isFull
      screenfull.toggle()
    },
    // 下载图片
    saveImg(ids, imgSrc) {
      imgdown(ids).then(res => {
        console.log(res)
        const content = res
        const blob = new Blob([content])
        const fileName = `${imgSrc}`
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a') //创建一个a标签通过a标签的点击事件区下载文件
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob) //使用blob创建一个指向类型数组的URL
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.showPhoto {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(61, 61, 61);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    display: block;
    margin: auto 0;
    max-width: 1280px;
    height: 100vh;
  }
  /* 关闭按钮 */
  .colse {
    position: fixed;
    top: 25px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 32px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    border: none;
    border-radius: 50%;
    &:hover {
      color: rgba(0, 0, 0, 0.6);
      background-color: #fff;
    }
  }
  /* 底部操作区 */
  .img-tools-bar {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0);
    width: 40%;
    height: 35px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 35px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      img {
        width: 30px;
        height: 25px;
      }
    }
  }
}
</style>