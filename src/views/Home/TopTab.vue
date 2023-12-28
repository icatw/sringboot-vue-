<template>
  <div class="top-tab">
    <el-row :gutter="30"
            style="margin-left:0;margin-right:0;">
      <!-- // 排序修改 -->
      <el-col :span="4">
        <el-select v-model="defaRecommed"
                   class="reco-tip"
                   @change="recoChange">
          <el-option v-for="item in recOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <!--   // 分类修改 -->
      <el-col :span="4">
        <el-select v-model="defaClassify"
                   class="clas-tip"
                   @change="clasChange">
          <el-option v-for="item in clsOptions"
                     :key="item.id"
                     :label="item.typeName"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { typelist } from '@/api/paper'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      defaRecommed: '全部', // 默认排序
      defaClassify: '全部', // 默认分类
      recOptions: [
        {
          value: 1,
          label: '最热'
        },
        {
          value: 2,
          label: '最新'
        },
        {
          value: 0,
          label: '全部'
        }
      ],
      clsOptions: [],
      sortNow: 0,
      classify: 0
    }
  },
  methods: {
    ...mapActions(['getPaper']),
    // 排序修改
    recoChange(value) {
      this.sortNow = value
      let datas = {
        current: 1,
        size: 12,
        sort: this.sortNow,
        type: this.classify
      }
      this.getPaper(datas)
    },
    //分类修改
    clasChange(value) {
      this.classify = value
      let datas = {
        current: 1,
        size: 12,
        sort: this.sortNow,
        type: this.classify
      }
      this.getPaper(datas)
    },
    // 初始化分类信息
    async initTypeList() {
      let res = await typelist()
      // console.log(res)
      let clsobj = {
        id: 0,
        typeName: '全部'
      }
      res.data.push(clsobj)
      this.clsOptions = res.data
    }
  },
  created() {
    this.initTypeList()
  }
}
</script>

<style lang="less" scoped>
.top-tab {
  margin-top:20px;
  padding: 10px;
}
.reco-tip::before,
.clas-tip::before {
  z-index: 99;
  position: absolute;
  top: -10px;
  left: 10px;
  width: 35px;
  height: 15px;
  text-align: center;
  font-size: 7px;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.6);
  background: rgb(245, 245, 245);
}
.reco-tip::before {
  content: '排序';
}
.clas-tip::before {
  content: '分类';
}

:deep(.el-select) {
  position: relative;
  .el-input__inner {
    font-size: 17px;
    color: #000;
    border: 1px solid #000;
    background: rgb(245, 245, 245);
  }
}
</style>
