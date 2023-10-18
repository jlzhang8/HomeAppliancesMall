import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mian',
    component: () => import('../views/Mian.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        alias: '',
        component: () => import('../views/Home.vue'),
        meta: {
          keepAlive: true
        }

      },
      {
        path: 'sort',
        name: 'Sort',
        component: () => import('../views/Sort.vue'),
        meta: {
          keepAlive: true
        },

      },
      {
        path: 'serve',
        name: 'Serve',
        component: () => import('../views/Serve.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: () => import('../views/Shopping.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/Details.vue')
  },
  {
    path: '/dengru',
    name: 'Dengru',
    component: () => import('../views/Dengru.vue')
  },
  {
    path: '/zhuche',
    name: 'Zhuche',
    component: () => import('../views/Zhuche.vue')
  },
  {
    path: '/tt',
    name: 'Tt',
    component: () => import('../views/Tt.vue')
  },
  {
    path: '/shocan',
    name: 'Shocan',
    component: () => import('../views/Shocan.vue')
  },
  {
    path: '/zuji',
    name: 'Zuji',
    component: () => import('../views/Zuji.vue')
  },
  {
    path: '/dingdan',
    name: 'Dingdan',
    component: () => import('../views/Dingdan.vue')
  },
  {
    path: '/sosuo',
    name: 'Sosuo',
    component: () => import('../views/Sosuo.vue')
  },
  {
    path: '/sszhanshi',
    name: 'Sszhanshi',
    component: () => import('../views/Sszhanshi.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
