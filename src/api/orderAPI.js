import request from '@/utils/request'

// 根据选中的航线id显示报价
// export function getQuoteShow(query) {
//   return request({
//     url: '/quote/show',
//     method: 'get',
//     ...query
//   })
// }

export function entrustBillInsert(query) {
  return request({
    url: '/order/prepare/entrustBillInsert',
    method: 'post',
    ...query
  })
}

// prepare
export function showPrepareOrder(query) {
  return request({
    url: '/order/prepare/show',
    method: 'get',
    ...query
  })
}

export function savePrepareOrder(query) {
  return request({
    url: '/order/prepare/save',
    method: 'post',
    ...query
  })
}


export function prepareOrder(query) {
  return request({
    url: '/order/orderPrepare',
    method: 'get',
    ...query
  })
}

// order
export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    ...query
  })
}

export function getOrderDetail(query) {
  return request({
    url: `/order/${query.params.id}`,
    method: 'get',
    ...query
  })
}

export function saveOrder(query) {
  return request({
    url: '/order/save',
    method: 'post',
    ...query
  })
}

export function updateOrder(query) {
  return request({
    url: '/order/update',
    method: 'post',
    ...query
  })
}

// 根据海运订单 id 查找订单的追踪状态
export function getOrderBookingTrackInfo(query) {
  return request({
    url: '/order/orderBooking/trackInfo',
    method: 'get',
    ...query
  })
}

export function getOrderBookingDetail(query) {
  return request({
    url: `/order/orderBooking/${query.params.id}`,
    method: 'get',
    ...query
  })
}

// 根据拖车订单 id 查找订单的追踪状态
export function getOrderTrailerTrackInfo(query) {
  return request({
    url: '/order/orderTrailer/trackInfo',
    method: 'get',
    ...query
  })
}

export function getOrderTrailerDetail(query) {
  return request({
    url: `/order/orderTrailer/${query.params.id}`,
    method: 'get',
    ...query
  })
}


// 根据报关订单 id 查找订单的追踪状态
export function getOrderCustomsTrackInfo(query) {
  return request({
    url: '/order/orderCustoms/trackInfo',
    method: 'get',
    ...query
  })
}
export function getOrderCustomsDetail(query) {
  return request({
    url: `/order/orderCustoms/${query.params.id}`,
    method: 'get',
    ...query
  })
}


// 根据仓储订单 id 查找订单的追踪状态
export function getOrderStorageTrackInfo(query) {
  return request({
    url: '/order/orderStorage/trackInfo',
    method: 'get',
    ...query
  })
}
export function getOrderStorageDetail(query) {
  return request({
    url: `/order/orderStorage/${query.params.id}`,
    method: 'get',
    ...query
  })
}


// 根据证书订单 id 查找订单的追踪状态
export function getOrderCertificateTrackInfo(query) {
  return request({
    url: '/order/orderCertificate/trackInfo',
    method: 'get',
    ...query
  })
}
export function getOrderCertificateDetail(query) {
  return request({
    url: `/order/orderCertificate/${query.params.id}`,
    method: 'get',
    ...query
  })
}


// 根据保险订单 id 查找订单的追踪状态
export function getOrderInsuranceTrackInfo(query) {
  return request({
    url: '/order/orderInsurance/trackInfo',
    method: 'get',
    ...query
  })
}
export function getOrderInsuranceDetail(query) {
  return request({
    url: `/order/orderInsurance/${query.params.id}`,
    method: 'get',
    ...query
  })
}