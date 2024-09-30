<template>
  <div id="app">
    <Header />
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 可以在vm(main.js)或vc(App.vue)上挂载只执行一次
    // 减少重复请求服务器
    // 大多数都有 TypeNav
    this.$store.dispatch('home/getCategoryList')
  },
}
</script>

<style></style>
