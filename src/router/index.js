import Vue from 'vue'
import router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Notifications from '@/components/Notifications'
import Message from '@/components/Message'
import Personal from '@/components/PersonalInformation'

Vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/', alias:'/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: '/message', 
      name: 'Message',
      component: Message
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    }
  ]
})

