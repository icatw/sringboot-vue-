import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/token'

Vue.use(Router)

const routes = [
  {
    path: '/',   // 首页
    name: 'index',
    redirect: '/home',
    meta: {
      id: 1
    }
  },
  {
    path: '/home',  // 首页
    name: 'home',
    component: () => import('@/views/Home/Index.vue'),
    meta: {
      id: 1
    }
  },
  {
    path: '/search',  // 搜索页面
    name: 'search',
    component: () => import('@/views/Search/Index.vue'),
    meta: {
      id: 2
    }
  },
  {
    path: '/collection',  // 收藏页面
    name: 'collection',
    component: () => import('@/views/Collection/Index.vue'),
    meta: {
      id: 3
    }
  },
  // 个人中心
  {
    path: '/person',
    name: 'person',
    component: () => import('@/views/Person/Index.vue'),
    redirect: '/person/home',
    meta: {
      id: 4
    },
    children: [
      {
        path: '/person/home',
        name: 'perhome',
        component: () => import('@/views/Person/PerHome.vue'),
        meta: {
          id: 4
        },
      },
      {
        path: '/person/set',
        name: 'perset',
        component: () => import('@/views/Person/PerSet.vue'),
        meta: {
          id: 4.2
        },
      },
      {
        path: '/person/account',
        name: 'peraccount',
        component: () => import('@/views/Person/PerAccount.vue'),
        meta: {
          id: 4.3
        },
      }]
  },
  {
    path: '/login',  // 登录页面
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      id: 5
    },
  },
  {
    path: '/concern',  // 关于我们
    name: 'concern',
    component: () => import('@/views/Concern/Index.vue'),
    meta: {
      id: 6
    },
  },
  {
    path: '/enroll',  // 注册页面
    name: 'enroll',
    component: () => import('@/views/Login/Enroll.vue')
  },
  {
    path: '/register',  // 注册页面
    name: 'register',
    component: () => import('@/views/Login/Register.vue')
  },
  {
    path: '/loading',  // 注册页面
    name: 'Loading',
    component: () => import('@/views/Login/Loading.vue')
  },
  {
    path: '/message',  // 留言板页面
    name: 'Message',
    component: () => import('@/views/Message/Index.vue')
  },
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/person/home') {
      if (getToken()) {
        next()
      } else {
        router.push({
          path: '/enroll'
        })
      }
    } else {
      next()
    }
  }
)

export default router
