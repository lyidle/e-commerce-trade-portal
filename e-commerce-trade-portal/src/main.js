import Vue from 'vue'
import App from '@/App'
import router from "@/router";
import store from '@/store'

//统一引入
import * as API from '@/api'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import { Carousel, CarouselItem, Pagination, MessageBox } from 'element-ui';
// 引入MockServer.js----mock数据
import "@/mock/mockServe"
import "swiper/css/swiper.css";
// 全局组件
Vue.component(TypeNav.name, TypeNav);
// 按需引入 elementUi
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
