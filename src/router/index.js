import Vue from 'vue'
import router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

Vue.use(router)

export default new router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

