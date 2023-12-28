<template>
  <div class="collection">
    <div class="collection-imgs">
      <h2>我的收藏<i class="el-icon-star-off"></i></h2>
      <div class="img-boxs"
           v-if="collData.length>0">
        <div class="img-box"
             v-for="item in collData"
             :key="item.imageId">
          <img-box :imgSrc="item.imageUrl"
                   :imgSize="item.imageSize"
                   :ids="item.imageId"
                   :status="item.status" />
        </div>
      </div>
      <div v-else>
        <el-empty description="还没有收藏哦"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/home.css'
import imgBox from '@/components/ImgBox.vue' // 图片组件
import { userCollImg } from '@/api/paper'
export default {
  components: {
    imgBox
  },
  data() {
    return {
      collData: []
    }
  },
  methods: {
    async initCollImg() {
      const res = await userCollImg(1, 10)
      this.collData = res.data.records
    }
  },
  created() {
    this.initCollImg()
  }
}
</script>

<style lang="less" scoped>
.collection {
  margin: 0 auto;
}
h2 {
  margin-top:30px;
  margin-bottom:15px;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 500;
  color: #71c9ce;
  i {
    padding-left: 2px;
  }
}
.img-boxs {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  overflow: hidden;
  .img-box {
    padding: 3px 4px 4px 4px;
    height: 250px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>
