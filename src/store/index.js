import Vue from 'vue'
import Vuex from 'vuex'
import { allpaper } from '@/api/paper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imageList: [],
    total: 0,
    islogin: false,
    userInfo: null
  },
  getters: {},
  mutations: {

    // 图片
    getPapers (state, datas) {
      state.imageList = datas.imgList
      state.total = datas.total
    },
    // 切换登录状态
    changeLoginStatus (state, flag) {
      state.islogin = flag
    },
    // 存储用户信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }

  },
  actions: {
    // 获取壁纸
    async getPaper ({ commit }, {
      current,
      size,
      sort,
      type
    }) {
      const condition = {
        pageNow: current,
        pageSize: size,
        sort: sort,
        type: type
      }
      const res = await allpaper(condition)
      const data = {
        imgList: res.data.records,
        total: res.data.total
      }
      commit('getPapers', data)
    },
    // 存储用户信息的 action
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    }
  },
  modules: {}
})
