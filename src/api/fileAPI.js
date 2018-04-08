import request from '@/utils/request'

export function deleteFile(query) {
  return request({
    url: '/file/delete',
    method: 'get',
    ...query
  })
}
