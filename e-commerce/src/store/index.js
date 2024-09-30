import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from '@/store/home'
import search from '@/store/search'
import detail from "@/store/detail";
import shopCart from "@/store/shopCart";
import user from "@/store/user";
import trade from "@/store/trade";
// 对外暴露store类的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})