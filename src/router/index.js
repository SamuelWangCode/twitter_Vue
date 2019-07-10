import Vue from 'vue'
import router from 'vue-router'
import Home from '@/components/Home'
import Notifications from '@/components/Notifications'
import Message from '@/components/Message'
import Personal from '@/components/Personal'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/regist'
import zoom from '@/components/Zoom'
import Explore from '@/components/Explore'
import SearchResult from '@/components/SearchResult'
import Topic from '@/components/Topic'
Vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/home',
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
      path: '/index', alias:'/',
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
      path:'/zoom',
      name:'zoom',
      component:zoom,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/explore',
      name:'Explore',
      component:Explore,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/searchResult',
      name:'SearchResult',
      component:SearchResult,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/topic',
      name:'Topic',
      component:Topic,
      meta:{
        keepAlive:true
      }
    }
  ]
})

