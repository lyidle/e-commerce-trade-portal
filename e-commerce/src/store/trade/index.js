import { reqAddressInfo, reqOrderInfo } from "@/api/index";
export default {
  namespaced: true,
  state: {
    address: [],
    orderInfo: {}
  },
  actions: {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
      const result = await reqAddressInfo()
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
      const result = await reqOrderInfo()
      if (result.code == 200) {
        commit('GETORDERINFO', result.data)
        return 'ok'
      }
    }
  },
  mutations: {
    // 获取用户地址信息
    GETUSERADDRESS(state, address) {
      state.address = address
    },
    // 获取商品清单数据
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  getters: {
  }
}