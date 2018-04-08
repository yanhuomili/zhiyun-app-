import Vue from 'vue'
import axios from 'axios'
import {
  MessageBox,
  Notification,
  Message,
  Loading
} from 'element-ui'
import store from '@/store'
import responseStatus from './responseStatus'
import { getToken } from '@/utils/auth'

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$responseStatus = responseStatus
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})
Vue.prototype.$toastShow = toastShow
function toastShow(text, time) {
  const toastEle = document.getElementById('toast500')
  toastEle.style.display = 'block'
  toastEle.getElementsByClassName('weui-toast__content')[0].innerHTML = text || '系统出错了！'
  setTimeout(() => {
    toastEle.style.display = 'none'
  }, time || 2000)
}

const loadingObj = {
  isLoading: false,
  loadingId: '',
  obj: ''
}
window.__loadingClose = function() {
  loadingObj.obj ? loadingObj.obj.close() : ''
}

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (config.isLoading) {
    loadingObj.isLoading = true
    loadingObj.loadingId = config.baseURL + config.url
    loadingObj.obj ? loadingObj.obj.close() : ''
    loadingObj.obj = Loading.service()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (loadingObj.isLoading && loadingObj.loadingId == response.config.url) {
      loadingObj.isLoading = false
      loadingObj.loadingId = ''
      loadingObj.obj && loadingObj.obj.close()
    }
    if (response.config.responseStatus) {
      if (response.data.returnCode == 0) {
        toastShow(responseStatus[response.config.responseStatus].success)
      } else {
        if (!response.config.responseStatusScope) {
          toastShow(responseStatus[response.config.responseStatus].error)
        } else {
          toastShow(responseStatus[response.config.responseStatus].error)
        }
      }
    }
    return response
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    if (error.response.data.message) {
      toastShow(error.response.data.message)
      // Message({
      //   message: error.response.data.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    } else {
      toastShow(responseStatus.error)
      // Message({
      //   message: responseStatus.error,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }
    return Promise.reject(error)
  })

export default service
