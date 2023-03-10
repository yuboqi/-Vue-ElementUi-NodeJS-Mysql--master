//对外暴露一个方法，用于获取路由列表
//根据用户角色，返回不同的路由列表
import { constantRouterMap } from '@/router'
import { getRole } from '@/utils/token'
import { getRouterList } from '@/api/role'
import { Message } from 'element-ui'
export const getRouter = async () => {
  // 1. 获取用户角色
  const role = getRole()
  // 2. 如果是超级管理员，直接返回所有路由
  if (role === 'super') {
    return constantRouterMap
  }
  // 3. 如果不是超级管理员，根据角色获取路由列表
  const res = await getRouterList(role)
  if (res.data.code === 200) {
    // 4. 将获取到的路由列表，和所有路由列表进行合并
    const routerList = res.data.data
    const allRouter = constantRouterMap.concat(routerList)
    // 5. 返回合并后的路由列表
    return allRouter
  } else {
    Message.error(res.data.message)
  }
}
