import request from '@/utils/request'

// 地区
export function getDistrictByParentId(params) {
  return request({
    url: '/district/get_district_byparentid',
    method: 'get',
    ...params
  })
}

//  国家
export function getAllCountry() {
  return request({
    url: '/country/get_all_country',
    method: 'get'
  })
}
