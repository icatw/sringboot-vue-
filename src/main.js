import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vueBaberrage } from 'vue-baberrage'

Vue.use(vueBaberrage)
import '@/utils/element.js' //引入element-ui
import animated from 'animate.css'  // 引入动画库
Vue.use(animated)
import SliderVerificationCode from 'slider-verification-code';
import 'slider-verification-code/lib/slider-verification-code.css';

Vue.use(SliderVerificationCode);
import '@/assets/css/base.css'  // 初始化样式
import { lazy } from '@/optimize/lazy.js' // 懒加载
import messagebox from '@/utils/message'

Vue.prototype.$message = messagebox
Vue.directive('lazy', lazy)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
