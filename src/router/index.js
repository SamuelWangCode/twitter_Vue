import Vue from 'vue'
import router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Notifications from '@/components/Notifications'
import Message from '@/components/Message'
import Personal from '@/components/PersonalInformation'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/regist'
import test from '@/components/test'

Vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/', alias:'/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/message', 
      name: 'Message',
      component: Message,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/regist',
      name: 'register',
      component: register,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        keepAlive: false
      }
    },

    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        keepAlive: false
      }
    }

  ]
})

