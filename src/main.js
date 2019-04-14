// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import Qs from 'qs'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

var axios_instance = axios.create({
  //config里面有这个transformRquest，这个选项会在发送参数前进行处理。
  //这时候我们通过Qs.stringify转换为表单查询参数
      transformRequest: [function (data) {
          data = Qs.stringify(data);
          return data;
      }],
  //设置Content-Type
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
  Vue.use(VueAxios, axios_instance)
  