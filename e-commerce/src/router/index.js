import Vue from "vue";
import VueRouter from "vue-router";
// 导入规则
import routes from "@/router/routes";
// 导入厂库
import store from "@/store";
// 解决多次点击报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  originalPush.call(this, location, onComplete, onAbort)?.catch(() => { })
}
VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  originalReplace.call(this, location, onComplete, onAbort)?.catch(() => { })
}
// 应用router
Vue.use(VueRouter)
const route = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
})
// 全局守卫：前置守卫
route.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // 登录了
  if (token) {
    // 不允许去login
    if (to.path === '/login') {
      // 不是从本站跳转 则回到首页
      if (from.meta.isThisSite !== 'TO BE OR NOT TO BE') {
        next('/home')
      }
      else {
        // 否则就回到来的地方
        next(false)
      }
    } else {
      // 没有去login
      try {
        // 获取用户信息展示
        await store.dispatch('user/getUserInfo')
        next()
      } catch (error) {
        // token失效了服务器端身份验证信息失效
        await store.dispatch('user/userLogout')
        next('/login')
      }
    }
  } else {
    // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    if (to.meta.isTouristAuth) {
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
  // title 设置
  if (to.meta.title)
    document.title = to.meta.title
  else
    document.title = '404 啦~'
})
export default route