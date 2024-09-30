import { GetGoodsInfo, AddUpDateShopCart } from "@/api/index";
import { getUUID } from "@/utils/uuid_token";
export default {
  namespaced: true,
  state: {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
  },
  actions: {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
      const result = await GetGoodsInfo(skuId)
      if (result.code == 200) {
        commit('GetGoodInfo', result.data)
      }
    },
    // 加入购物车的一修改某一个产品的个数
    async addUpDateShopCart({ commit }, { skuId, skuNum }) {
      const result = await AddUpDateShopCart(skuId, skuNum)
    },
  },
  mutations: {
    GetGoodInfo(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  getters: {
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}