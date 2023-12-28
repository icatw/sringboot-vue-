<template>
  <div class="home">
    <top-tab></top-tab>
    <img-cont></img-cont>
  </div>
</template>

<script>
import topTab from '@/views/Home/TopTab.vue' // 分类导航组件
import imgCont from '@/views/Home/ImgCont.vue' // 分类导航组件
export default {
  components: {
    topTab,
    imgCont
  },
  created() {
   
  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 0 auto;
  min-height: 300px;
}
</style>