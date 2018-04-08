import request from '@/utils/request'

// 港口
export function getPortList(query) {
  return request({
    url: '/port/list',
    method: 'get',
    ...query
  })
}

export function savePort(data) {
  return request({
    url: '/port/save',
    method: 'post',
    ...data
  })
}

export function updatPortStatus(data) {
  return request({
    url: '/port/update_status',
    method: 'post',
    ...data
  })
}
export function mutilDeletePort(data) {
  return request({
    url: '/port/multidelete',
    method: 'post',
    ...data
  })
}

export function getAllPort() {
  return request({
    url: '/port/get_all_port',
    method: 'get'
  })
}

//  船公司
export function getShipCompanyList(query) {
  return request({
    url: '/ship_company/list',
    method: 'get',
    ...query
  })
}

export function saveShipCompany(data) {
  return request({
    url: '/ship_company/save',
    method: 'post',
    ...data
  })
}

export function updatShipCompanyStatus(data) {
  return request({
    url: '/ship_company/update_status',
    method: 'post',
    ...data
  })
}
export function mutilDeleteShipCompany(data) {
  return request({
    url: '/ship_company/multidelete',
    method: 'post',
    ...data
  })
}

export function getAllShipCompany() {
  return request({
    url: '/ship_company/get_all_ship_company',
    method: 'get'
  })
}

//  船
export function getShipList(query) {
  return request({
    url: '/ship/list',
    method: 'get',
    ...query
  })
}

export function saveShip(data) {
  return request({
    url: '/ship/save',
    method: 'post',
    ...data
  })
}

export function updatShipStatus(data) {
  return request({
    url: '/ship/update_status',
    method: 'post',
    ...data
  })
}
export function mutilDeleteShip(data) {
  return request({
    url: '/ship/multidelete',
    method: 'post',
    ...data
  })
}

export function getAllShip() {
  return request({
    url: '/ship/get_all_port',
    method: 'get'
  })
}

//  航线
export function getShipLineList(query) {
  return request({
    url: '/route_service/list',
    method: 'get',
    ...query
  })
}

export function getAllShipLine(query) {
  return request({
    url: '/route_service/get_all_route_service',
    method: 'get',
    ...query
  })
}

export function saveShipLine(data) {
  return request({
    url: '/route_service/save',
    method: 'post',
    ...data
  })
}

export function updatShipLineStatus(data) {
  return request({
    url: '/route_service/update_status',
    method: 'post',
    ...data
  })
}

//  航期
export function getShipScheduleList(query) {
  return request({
    url: '/schedule_base_info/list',
    method: 'get',
    ...query
  })
}

export function saveShipSchedule(data) {
  return request({
    url: '/schedule_base_info/save',
    method: 'post',
    ...data
  })
}

export function updatShipScheduleStatus(data) {
  return request({
    url: '/schedule_base_info/update_status',
    method: 'post',
    ...data
  })
}

// 附加费
export function getSurchargeList(query) {
  return request({
    url: '/surcharge/list',
    method: 'get',
    ...query
  })
}

export function saveSurcharge(data) {
  return request({
    url: '/surcharge/save',
    method: 'post',
    ...data
  })
}

export function updatSurcharge(data) {
  return request({
    url: '/surcharge/update_status',
    method: 'post',
    ...data
  })
}

export function getAllSurcharge(query) {
  return request({
    url: '/surcharge/get_all_surcharge',
    method: 'get',
    ...query
  })
}

// 航线附加费
export function getSurchargeRouteServiceList(query) {
  return request({
    url: '/surcharge_route_service/list',
    method: 'get',
    ...query
  })
}

export function saveSurchargeRouteService(data) {
  return request({
    url: '/surcharge_route_service/save',
    method: 'post',
    ...data
  })
}

export function updatSurchargeRouteService(data) {
  return request({
    url: '/surcharge_route_service/update_status',
    method: 'post',
    ...data
  })
}

// 柜型
export function getContainerTypeList(query) {
  return request({
    url: '/container_type/list',
    method: 'get',
    ...query
  })
}

export function saveContainerType(data) {
  return request({
    url: '/container_type/save',
    method: 'post',
    ...data
  })
}

export function updatContainerType(data) {
  return request({
    url: '/container_type/update_status',
    method: 'post',
    ...data
  })
}

export function getAllContainerType() {
  return request({
    url: '/container_type/list',
    method: 'get'
  })
}

// 柜型与航线
export function getContainerTypeRouteServiceList(query) {
  return request({
    url: '/container_type_route_service/list',
    method: 'get',
    ...query
  })
}

export function saveContainerTypeRouteService(data) {
  return request({
    url: '/container_type_route_service/save',
    method: 'post',
    ...data
  })
}

export function updatContainerTypeRouteServiceStatus(data) {
  return request({
    url: '/container_type_route_service/update_status',
    method: 'post',
    ...data
  })
}

// export function fetchArticle() {
//   return request({
//     url: '/article/detail',
//     method: 'get'
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/article/update',
//     method: 'post',
//     data
//   })
// }
