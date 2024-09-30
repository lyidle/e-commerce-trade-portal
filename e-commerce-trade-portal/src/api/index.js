// 当前这个模块：API进行统一管理
import _Axios from "@/api/_Axios";
import mockAxios from "@/api/mockAxios";
// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数
export const GetCategory = () => _Axios.get('/product/getBaseCategoryList')

export const GetBanner = () => mockAxios.get('/banner')
export const GetFloor = () => mockAxios.get('/floor')
// 获取搜索模块数据·地址：/api/list-请求方式：post参数：需要带参数
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个接口，给服务器传递参数params至少是一个空对象
export const GetSearchInfo = (params) => _Axios.post('/list', params)

// 获取产品详情信息的接口URL：/api/item/{skuId}请求方式：get

export const GetGoodsInfo = (skuId) => _Axios.get(`/item/${skuId}`)

// 将产品添加到购物车中（获取更新某一个产品的个数）

// /api/cart/addToCart/{skuId }/{skuNum}  POST
export const AddUpDateShopCart = (skuId, skuNum) => _Axios.post(`/cart/addToCart/${skuId}/${skuNum}`)

//获取购物车列表数据接口
//URL: /api/cart/cartList  method:get
export const GetCartInfo = () => _Axios.get('/cart/cartList')

// 删除购物产品的接口
//URL: /api/cart/deleteCart/{skuId} method:DELETE
export const DeleteCartById = (skuId) => _Axios({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuID}/{isChecked} method:get
export const reqUpdateCheckedById = (skuID, isChecked) => _Axios({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => _Axios({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
//url:/api/user/passport/register method:postphone code password
export const reqUserRegister = (data) => _Axios({ url: `/user/passport/register`, data, method: 'post' })

// 登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) => _Axios({ url: `/user/passport/login`, data, method: 'post' })

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo method:get
export const reqUserInfo = () => _Axios({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录
//URL:/api/user/passport/logout  get
export const reqLogOut = () => _Axios({ url: `/user/passport/logout`, method: 'get' })

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () => _Axios({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

//获取商品清单
//URL:/api/order/auth/trade method:get
export const reqOrderInfo = () => _Axios({ url: `/order/auth/trade`, method: 'get' })

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitorder = (tradeNo, data) => _Axios({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => _Axios({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

//获取支付订单状态工
//URL:/api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => _Axios({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

//获取个人中心的数据
//api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit) => _Axios({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
