/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // 合并routers到基础路由
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { token } = data// 读取用户权限的Token
        generatorDynamicRouter(token).then(routers => {
          // 后端路由数据格式化vue-router数据
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

export default permission
