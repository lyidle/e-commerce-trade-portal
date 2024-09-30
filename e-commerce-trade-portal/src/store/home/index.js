import { GetCategory, GetBanner,GetFloor } from "@/api/index";
export default {
  namespaced: true,
  //state：仓库存储数据的地方
  state: {
    // 【根据接口返回值初始化的】
    categoryList: [],
    bannerList: [],
    floorList:[]
  },
  //action：处理action，可以书写自己的业务逻辑，也可以处理异步
  actions: {
    // 使用解构赋值获得commit
    async getCategoryList({ commit }) {
      const result = await GetCategory()
      if (result.code === 200) {
        commit('GetCategoryList', result.data)
      }
    },
    async getBannerList({ commit }) {
      const result = await GetBanner()
      if (result.code === 200) {
        commit('GetBannerList', result.data)
      }
    },
    async getFloorList({ commit }) {
      const result = await GetFloor()
      if (result.code === 200) {
        commit('GetFloorLList', result.data)
      }
    },
  },
  //mutations:修改state
  mutations: {
    GetCategoryList(state, v) {
      state.categoryList = v
    },
    GetBannerList(state, v) {
      state.bannerList = v
    },
    GetFloorLList(state, v) {
      state.floorList = v
    }
  },
  //getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
  getters: {}
}