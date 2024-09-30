import { GetCartInfo, DeleteCartById, reqUpdateCheckedById } from "@/api";
export default {
  namespaced: true,
  state: {
    cartListed: []
  },
  actions: {
    // /获取购物车列表数据
    async getCartList({ commit }) {
      const result = await GetCartInfo()
      if (result.code == 200) {
        commit('CartList', result.data)
      }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
      const result = await DeleteCartById(skuId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    // 修改购物车某一个产品的选中状态
    async UpdateCheckedById({ commit }, { skuId, isChecked }) {
      const result = await reqUpdateCheckedById(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    async isAllChecked({ getters,dispatch }, toggle) {
      await getters.cartInfoList.forEach(item => {
        if (toggle == 1)
          dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked: 1 })
        if (toggle == 0)
          dispatch('UpdateCheckedById', { skuId: item.skuId, isChecked: 0 })
      }
      )
    },
    // 删除选中产品
    async deleteAllCart({ getters, dispatch }) {
      await getters.cartInfoList.forEach(item => {
        if (item.isChecked)
          dispatch('deleteCartListBySkuId', item.skuId)
      });
    }
  },
  mutations: {
    CartList(state, cartList) {
      state.cartListed = cartList
    }
  },
  getters: {
    cartList(state) {
      return state.cartListed[0] || {}
    },
    cartInfoList(state) {
      return state.cartListed[0]?.cartInfoList || []
    }
  }
}