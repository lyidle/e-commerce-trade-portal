// 引入session 简化session操作
import { setSession, getSession, removeSession } from "@/utils/session";
// 路由配置信息
export default [
  {
    path: "/home",
    component: () => import('@/view/Home'),//按需使用Home
    meta: { isShowFooter: true, title: '首页', isThisSite: 'TO BE OR NOT TO BE' }
  },
  {
    path: "/",
    redirect: '/home',
  },
  {
    path: "/index.html",
    redirect: '/home',
  },
  {
    path: "/center",
    component: () => import('@/view/Center'),
    meta: { isShowFooter: true, title: '个人中心', isThisSite: 'TO BE OR NOT TO BE' },
    children: [
      {
        path: 'myorder',
        component: () => import('@/view/Center/myOrder'),
        meta: { isShowFooter: true, title: '我的订单', isThisSite: 'TO BE OR NOT TO BE', isTouristAuth: true }
      },
      {
        path: 'grouporder',
        component: () => import('@/view/Center/groupOrder'),
        meta: { isShowFooter: true, title: '团购订单', isThisSite: 'TO BE OR NOT TO BE', isTouristAuth: true },
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      },
    ]
  },
  {
    name: 'search',
    path: "/search/:keyword?",
    component: () => import('@/view/Search'),
    meta: { isShowFooter: true, title: '搜索', isThisSite: 'TO BE OR NOT TO BE' }
  },
  {
    path: '/detail/:skuid',
    component: () => import('@/view/Detail'),
    meta: { isShowFooter: true, title: '详情', isThisSite: 'TO BE OR NOT TO BE' }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/view/AddCartSuccess'),
    meta: { isShowFooter: true, title: '添加成功', isThisSite: 'TO BE OR NOT TO BE' }
  },
  {
    path: '/shopcart',
    component: () => import('@/view/ShopCart'),
    meta: { isShowFooter: true, title: '购物车', isThisSite: 'TO BE OR NOT TO BE' },
    beforeEnter(to, from, next) {
      next()
      // 设置到session中 允许进入trade
      setSession('fromShopCart', 'true')
    }
  },
  {
    path: '/trade',
    component: () => import('@/view/Trade'),
    meta: { isShowFooter: true, title: '订单信息', isThisSite: 'TO BE OR NOT TO BE', isTouristAuth: true },
    beforeEnter: (to, from, next) => {
      if (getSession('fromShopCart') === 'true') {
        next()
        setSession('fromTrade', 'true')
      }
      else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/view/Pay'),
    meta: { isShowFooter: true, title: '支付~', isThisSite: 'TO BE OR NOT TO BE', isTouristAuth: true },
    beforeEnter: (to, from, next) => {
      if (getSession('fromTrade') === 'true') {
        next()
        setSession('fromPay', 'true')
      }
      else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/view/PaySuccess'),
    meta: { isShowFooter: true, title: '支付成功~', isThisSite: 'TO BE OR NOT TO BE', isTouristAuth: true },
    beforeEnter: (to, from, next) => {
      if (getSession('fromPay') === 'true') {
        next()
        removeSession('fromTrade')
        removeSession('fromShopCart')
      }
      else {
        next(false)
      }
    }
  },
  {
    path: "/login",
    component: () => import('@/view/Login'),
    meta: { isShowFooter: false, title: '登录', isThisSite: 'TO BE OR NOT TO BE' }
  },
  {
    path: "/register",
    component: () => import('@/view/Register'),
    meta: { isShowFooter: false, title: '注册', isThisSite: 'TO BE OR NOT TO BE' }
  }
]