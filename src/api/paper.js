import request from '@/utils/request.js'

// 分页图片获取
export function allpaper (condition) {
  return request({
    url: '/image/frontend/pageList',
    method: 'post',
    data: condition
  })
}

export function saveMessage (data) {
  return request({
    url: '/message/frontend/save',
    method: 'post',
    data: data
  })
}
export function listMessage () {
  return request({
    url: '/message/frontend/list/basic',
    method: 'get',
  })
}

// 分类信息
export function typelist () {
  return request({
    url: '/type/frontend/list/basic',
    method: 'get'
  })
}

// 下载图片
export function imgdown (id) {
  return request({
    url: `/image/frontend/download/${id}`,
    responseType: 'blob'

  })
}

// 收藏图片
export function imgcoll (ids) {
  return request({
    url: `/collect/frontend/love/${ids}`,
    method: 'post'
  })
}

//
// 用户收藏图片
export function userCollImg (current, size) {
  return request({
    url: '/collect/frontend/page',
    params: {
      current,
      size
    }

  })
}

// 用户搜索图片
export function searchImg ({
  current,
  name,
  size
}) {
  return request({
    url: '/image/frontend/search',
    params: {
      current,
      size,
      name
    }

  })
}
