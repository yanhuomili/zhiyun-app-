import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/register', component: _import('register/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/home',
    component: _import('home/index'),
    meta: { title: '首页' }
  },
  {
    path: '',
    component: _import('entry/index'),
    meta: { title: '查询入口' }
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: _import('documentation/index'),
  //     name: 'documentation',
  //     meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/entry',
  //   component: _import('entry/index'),
  //   meta: { title: '查询入口' }
  // },
  {
    path: '/queryFareSea',
    component: _import('queryFareSea/index'),
    meta: { title: '海运价格查询' }
  },
  {
    path: '/queryFareSeaResult',
    component: _import('queryFareSeaResult/index'),
    meta: { title: '海运整箱查询结果' }
  },
  {
    path: '/quoteSeaDetail',
    component: _import('quoteSeaDetail/index'),
    meta: { title: '海运报价明细' }
  },
  {
    path: '/queryByNumMinato',
    component: _import('queryByNumMinato/index'),
    meta: { title: '港区查询' }
  },
  {
    path: '/queryFareCustoms',
    component: _import('queryFareCustoms/index'),
    meta: { title: '报关价格查询' }
  },
  {
    path: '/queryFareTrailer',
    component: _import('queryFareTrailer/index'),
    meta: { title: '拖车价格查询' }
  },
  {
    path: '/quoteCustomsDetail',
    component: _import('quoteCustomsDetail/index'),
    meta: { title: '报关报价明细' }
  },
  {
    path: '/quoteTrailerDetail',
    component: _import('quoteTrailerDetail/index'),
    meta: { title: '拖车报价明细' }
  }
  // {
  //   path: '/priceCenter',
  //   component: Layout,
  //   redirect: '/priceCenter/checkFreightRate',
  //   meta: { title: '价格中心' },
  //   children: [{
  //     path: 'checkFreightRate',
  //     component: _import('priceCenter/checkFreightRate/index'),
  //     name: 'checkFreightRate',
  //     meta: { title: '查运价' }
  //   }, {
  //     path: 'myQuotation',
  //     component: _import('priceCenter/myQuotation/index'),
  //     name: 'myQuotation',
  //     meta: { title: '我的报价单' }
  //   }]
  // },
]
