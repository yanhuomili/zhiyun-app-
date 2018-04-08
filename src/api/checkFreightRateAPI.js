import request from '@/utils/request'

// 海运港口
export function getAllStartPort(query) {
  return request({
    url: '/schedule_base_info/get_all_startport',
    method: 'get',
    ...query
  })
}

export function getEndPortByName(query) {
  return request({
    url: '/schedule_base_info/get_endport_byname',
    method: 'get',
    ...query
  })
}

// 查询费用
export function getScheduleBaseInfoQuery(query) {
  return request({
    url: '/schedule_base_info/query',
    method: 'post',
    ...query
  })
}

// 证书类型
export function getAllCertificateType(query) {
  return request({
    url: '/quote/certificate/getAllType',
    method: 'get',
    ...query
  })
}

// 拖车港口
export function getAllTrailerPort(query) {
  return request({
    url: '/trailer/port',
    method: 'get',
    ...query
  })
}

// 根据拖车港口获取区域
export function getTrailerDistrict(query) {
  return request({
    url: '/trailer/district',
    method: 'get',
    ...query
  })
}

// 根据拖车区域获取loadingPlace
export function getTrailerLoadingPlace(query) {
  return request({
    url: '/trailer/loadingPlace',
    method: 'get',
    ...query
  })
}
