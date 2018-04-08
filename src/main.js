import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import i18n from './lang' // 国际化
import App from './App'
import router from './router'
import store from './store'
import './utils/flexible' // 伸缩盒js
import * as filters from './filters' // 全局filter
import './utils/defaultInsert' // defaultInsert
// import './icons' // icon
import './errorLog'// error log
import './permission' // 权限
// import './mock' // 该项目所有请求使用mockjs模拟

const FastClick = require('fastclick')
FastClick.attach(document.body)

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin, { position: 'middle' })
// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// })

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  template: '<App/>',
  components: { App }
})
