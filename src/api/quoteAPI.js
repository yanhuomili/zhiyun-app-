import request from '@/utils/request'

// 根据选中的航线id显示报价
export function getQuoteShow(query) {
  return request({
    url: '/quote/show',
    method: 'post',
    ...query
  })
}

// 获取报价单列表
export function getQuoteList(query) {
  return request({
    url: '/quote/list',
    method: 'get',
    ...query
  })
}

// 根据ID获取报价单
export function getQuoteById(query) {
  return request({
    url: `/quote/${query.params.id}`,
    method: 'get',
    ...query
  })
}

// 编辑报价单后重新计算价格
export function calculateQuote(query) {
  return request({
    url: '/quote/calculate',
    method: 'post',
    ...query
  })
}

// 新增报价单
export function addQuote(query) {
  return request({
    url: '/quote/save',
    method: 'post',
    ...query
  })
}

// 新增除海运外的单独报价单
export function addQuoteAlone(query) {
  return request({
    url: '/quote/saveAlone',
    method: 'post',
    ...query
  })
}

// 更新报价单
export function updateQuote(query) {
  return request({
    url: '/quote/update',
    method: 'post',
    ...query
  })
}
