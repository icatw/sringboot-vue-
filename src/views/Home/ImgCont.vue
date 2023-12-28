<template>
  <div class="img-cont">
    <!-- 图片 -->
    <div class="img-boxs">
      <div class="img-box"
           v-for="item in imageList"
           :key="item.id">
        <img-box :imgSrc="item.imageUrl"
                 :imgSize="item.imageSize"
                 :ids="item.id"
                 :status="item.status" />
      </div>
    </div>
    <!-- 分页 -->
    <div id="pagin">
      <el-pagination background
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout=" prev, pager, next,total, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import imgBox from '@/components/ImgBox.vue' // 图片组件
import '@/assets/css/home.css' // 媒体查询样式
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    imgBox
  },
  data() {
    return {
      // 图片数据
      imgData: [
      ],
      currentPage: 1,
      pageSize: 12
    }
  },
  computed: {
    ...mapState(['imageList', 'total'])
  },
  methods: {
    ...mapActions(['getPaper']),
    // 改变页数
    handleCurrentChange(val) {
      this.currentPage = val
      let datas = {
        current: this.currentPage,
        size: 12,
        sort: 0,
        type: 0
      }
      this.getPaper(datas)
    },
    initCurrent() {
      let datas = {
        current: this.currentPage,
        size: 12,
        sort: 0,
        type: 0
      }

      this.getPaper(datas)
    }
  },
  created() {
    this.initCurrent()
  }
}
</script>

<style lang="less" scoped>
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
/* 分页 */
:deep(#pagin) {
  margin: 30px auto 40px auto;
  display: flex;
  justify-content: center;
  .el-input__inner {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
  }
  .el-pagination {
    .el-pager {
      .active {
        background-color: #71c9ce;
      }
    }
  }
}
</style>