
import request from './request'
// 获取所有频道

export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 管理员登录
export const loginAPI = ({ account, password }) => request({
  url: '/signin',
  method: 'POST',
  data: {
    account,
    password
  }
})

// 获取用户的频道
export const getUserChangeIsAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 获取文章列表

export const getAllArticleList = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

// 不感兴趣
export const disLikeArticle = (artId) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

// 反馈
export const reportArticle = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type: type,
    remark: '不让写'
  }
})

// 更新频道
export const updataArticle = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 搜索联想
export const searchImageAPI = ({ words }) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: words
  }
})

// 搜索结果
export const searchResultAPI = ({ page = 1, perPage = 10, words }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    paeg: page,
    per_page: perPage,
    q: words
  }
})

// 文章详情
export const articleInfoAPI = ({ article_id }) => request({
  url: `/v1_0/articles/${article_id}`,
  method: 'GET'
})

// 关注作者
export const followAutor = ({ aut_id }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: aut_id
  }
})

// 取消关注
export const unfollowAutor = ({ target }) => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

// 文章点赞
export const likeArticle = ({ artId }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})
// 取消点赞
export const unlikeArticle = ({ target }) => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE'
})

// 获取评论
export const commentsAPI = ({ source, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type: 'a',
    source,
    offset,
    limit
  }
})

// 评论点赞
export const commentsLike = ({ aut_id }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: aut_id
  }
})

// 取消评论点赞
export const commentsUnLike = ({ target }) => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE'
})

// 发布评论
export const pubComments = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

// 用户基本资料
export const userInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
})

// 获取用户个人简介
export const userProfile = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 更新头像
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
    // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}

// 更新用户资料
export const updataUserInfo = ({ birthday, userName }) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data: {
    birthday: birthday,
    name: userName
  }
})

// 用户关注列表
export const userFollows = ({ page, per_page }) => request({
  url: '/v1_0/user/followings',
  method: 'GET',
  params: {
    page,
    per_page
  }
})

// 用户粉丝列表
export const userFans = ({ page, per_page }) => request({
  url: '/v1_0/user/followers',
  method: 'GET',
  params: {
    page,
    per_page
  }
})
