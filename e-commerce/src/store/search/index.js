import { GetSearchInfo } from "@/api";
export default {
  namespaced: true,
  //state：仓库存储数据的地方
  state: {
    searchList: [],
  },
  //action：处理action，可以书写自己的业务逻辑，也可以处理异步
  actions: {
    async getSearchInfoList(context, value = {}) {
      let result = await GetSearchInfo(value);
      if (result.code === 200) {
        context.commit("GetSearchInfoList", result.data);
      }
    },
  },
  //mutations:修改state
  mutations: {
    GetSearchInfoList(state, value) {
      state.searchList = value;
    },
  },
  //getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
  getters: {
    attrsList({ searchList }) {
      return searchList.attrsList;
    },
    goodsList({ searchList }) {
      // 假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
      // 计算新的属性的属性值至少给人家来一个数组
      return searchList.goodsList || [];
    },
    trademarkList({ searchList }) {
      return searchList.trademarkList;
    },
  },
};
