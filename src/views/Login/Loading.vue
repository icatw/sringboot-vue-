<template>
  <div><h1>登录中</h1></div>
</template>

<script>
import { setUserInfo } from '@/utils/user'
import { setToken } from '@/utils/token'
import { getMy } from '@/api/login'

export default {
  name: 'loading',
  methods: {
    //解析url中的token参数
    getToken () {
      var url = window.document.location.href.toString()//获得当前url地址并转换成字符串
      console.log(url)
      var u = url.split('?')//以？来分割字符串，将？前后的值存到一个数组中
      if (typeof (u[1]) == 'string') {//获得？后面具体的请求参数值
        u = u[1].split('&')
        var get = {}
        for (var i in u) {
          var j = u[i].split('=')
          get[j[0]] = j[1]
        }
        return get
      }
    },
    async initInfo (token) {
      // localStorage存储token、用户信息
      setToken(token)
      this.$store.commit('changeLoginStatus', true)
      const myInfoRes = await getMy()
      if (myInfoRes.success) {
        setUserInfo(myInfoRes.data)
        this.$store.commit('setUserInfo', myInfoRes.data.principal)
      }
      this.$router.push({
        path: '/home'
      })
    }
  },
  created () {
    debugger
    //获取到token 并封装到store中用于全程携带
    let token11 = this.getToken()
    console.log(token11.token)
    let token = token11.token
    if (token != undefined && token != {}) {
      this.initInfo(token)
    }
  }
}
</script>

<style scoped>

</style>
