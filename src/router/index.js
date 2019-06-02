import Vue from 'vue'
import router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
<<<<<<< HEAD
import Notifications from '@/components/Notifications'
import Message from '@/components/Message'
import Personal from '@/components/PersonalInformation'
import Explore from '@/components/Explore'
=======
>>>>>>> parent of faee1c6... change Nav to Menu, add routers

Vue.use(router)

export default new router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
<<<<<<< HEAD
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
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
=======
>>>>>>> parent of faee1c6... change Nav to Menu, add routers
    }
  ]
})

