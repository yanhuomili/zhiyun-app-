import Vue from 'vue'
import './json2excel'
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

Date.prototype.getNDay = function(AddDayCount) {
  var dd = new Date(this.Format('yyyy-MM-dd hh:mm:ss'))
  return dd.setDate(this.getDate() + AddDayCount)
}
// 调用：

// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss")

// 查询状态码

window.HTSORTCONDITION = {
  TYP_SRH_EQUAL: 11, // =
  TYP_SRH_LESS: 12, // <
  TYP_SRH_GREATER: 13, // >
  TYP_SRH_LESS_EQUAL: 14, // <=
  TYP_SRH_GREATER_EQUAL: 15, // >=
  TYP_SRH_NOT_EQUAL: 16, //! =
  TYP_SRH_LIKE: 27, // %北京%
  TYP_SRH_LIKE_LEFT: 28, // %北京
  TYP_SRH_LIKE_RIGHT: 29, // 北京%
  TYP_SRH_IN: 31, //
  TYP_SRH_LESS_EQUAL_DT: 41,
  TYP_SRH_GREATER_EQUAL_DT: 42,
  TYP_SRH_EQUAL_DT: 43,
  TYP_SRH_LESS_EQUAL_DT_RPT: 51,
  TYP_SRH_GREATER_EQUAL_DT_RPT: 52,
  TYP_SRH_GREATER_EQUAL_FLOAT: 61,
  TYP_SRH_LESS_EQUAL_DATA: 71, // <=，将字符串转换成DATE类型，
  // 包含to_date()方法
  TYP_SRH_GREATER_EQUAL_DATA: 72, // >=，将字符串转换成DATE类型，
  // 包含to_date()方法
  TYP_SRH_EQUAL_DATA: 73, // =，将字符串转换成DATE类型，包含to_date
  TYPE_ORDER: 74, // 排列
  TYPE_ORDER_DESC: 75, // 降序排列
  TYPE_ORDER_ASC: 76 // 升序排列
}

Vue.prototype.$deepClone = function(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = this.$deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

window.sleep = window.sleep || function(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

window.HTCONFIG = {
  signType: [{
    value: '20GP',
    label: '20GP'
  }, {
    value: '40GP',
    label: '40GP'
  }, {
    value: '40HQ',
    label: '40HQ'
  }, {
    value: '45HQ',
    label: '45HQ'
  }],
  statusObj: [{
    value: '',
    label: '全部'
  }, {
    value: 'enabled',
    label: '可用'
  }, {
    value: 'deleted',
    label: '已删除'
  }],
  // 类型：0：海运  1：拖车 2：报关  3：仓储  4：证书  5：保险
  surchargeType: [{
    value: 'shipping',
    label: '海运'
  }, {
    value: 'trailer',
    label: '拖车'
  }, {
    value: 'customs',
    label: '报关'
  }, {
    value: 'storage',
    label: '仓储'
  }, {
    value: 'certificate',
    label: '证书'
  }, {
    value: 'insurance',
    label: '保险'
  }],
  allServiceObj: {
    shipping: 0,
    trailer: 1,
    customs: 2,
    storage: 3,
    certificate: 4,
    insurance: 5
  },
  priceUnit: [{
    value: 'Bill',
    label: 'Bill'
  }, {
    value: 'Tue',
    label: 'Tue'
  }],
  currencyType: [{
    value: 'RMB',
    label: 'RMB'
  }, {
    value: 'USD',
    label: 'USD'
  }],
  // 0：订单生成  1：订单待处理  2：订单进行中  3：订单已完成
  orderStatus: {
    generate: '订单生成',
    pending: '订单待处理',
    processing: '订单进行中',
    completed: '订单已完成'
  }
}
window.HTCONFIG.fileAddress = 'http://localhost:8089/ht/resource/'
window.HTCONFIG.contact = {
  phone: '0000-9989978'
}

