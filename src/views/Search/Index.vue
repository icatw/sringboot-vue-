<template>
  <div class="search-cont">
    <!-- 搜索输入框 -->
    <div class="serach-tool-bar">
      <el-row>
        <el-col :span="22"
                class="input-keys">
          <el-input prefix-icon="el-icon-search"
                    placeholder="请输入关键字"
                    v-model="searchInner"
                    @keyup.enter.native="searchBtn">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     @click="searchBtn">搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 搜索结果 -->
    <div v-if="searchData.length>0"
         class="search-inner">
      <div class="img-boxs">
        <div class="img-box"
             v-for="item in searchData"
             :key="item.id">
          <img-box :imgSrc="item.imageUrl"
                   :imgSize="item.imageSize"
                   :ids="item.id"
                   :status="item.status"/>
        </div>
        <!--

         -->
      </div>
      <!--  分页 -->
      <div class="pagin"
           v-show="searchtotal>=13">
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       layout=" prev, pager, next,total, jumper"
                       :total="searchtotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import imgBox from '@/components/ImgBox.vue' // 图片组件
import '@/assets/css/home.css'
import { allpaper } from '@/api/paper'

export default {
  components: {
    imgBox
  },
  data () {
    return {
      searchInner: '',
      currentPage: 1,
      pageSize: 12,
      searchData: [],
      searchtotal: 0
    }
  },
  methods: {
    async getByImg () {
      const condition = {
        pageNow: this.currentPage,
        pageSize: this.pageSize,
        imageName: this.searchInner
      }
      const res = await allpaper(condition)
      this.searchtotal = res.data.total
      this.searchData = res.data.records
      this.currentPage = 1 // 重新初始
    },
    searchBtn () {
      if (!this.searchInner) {
        this.$message('请输入内容', 'error')
      } else {
        this.getByImg()
      }
    },
    // 改变页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.getByImg()
    }
  },
  computed: {},
  created () {
    this.getByImg()
  }
}
</script>

<style lang="less" scoped>
.search-cont {
  margin: 0 auto;
  min-height: 200px;
  /* 搜索栏 */

  :deep(.serach-tool-bar) {
    margin: 50px 0;
    padding: 0 100px;
    box-sizing: border-box;

    input::-webkit-input-placeholder {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.54);
      letter-spacing: 1px;
    }

    .el-input__inner {
      padding-left: 45px;
      height: 48px;
      border-radius: 8px 0 0 8px;
      border: none;

      &:focus {
        border: none;
      }
    }

    .el-input__icon {
      padding-left: 5px;
      line-height: 48px;
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.54);
      border-color: none;
    }

    .el-button {
      width: 100%;
      height: 48px;
      border-radius: 0 8px 8px 0;
      background-color: #71c9ce;
    }

    .el-button--primary {
      border-color: #71c9ce;
    }
  }

  /* 搜索结果区域 */

  .search-inner {
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
  }

  .pagin {
    margin: 50px auto 40px auto;
    display: flex;
    justify-content: center;

    .el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
