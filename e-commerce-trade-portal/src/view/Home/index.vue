<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="list in floorList" :key="list.id" :list="list" />
    <Brand />
  </div>
</template>

<script>

// 引入其余的组件
import ListContainer from '@/view/Home/ListContainer';
import Recommend from '@/view/Home/Recommend';
import Rank from '@/view/Home/Rank';
import Like from '@/view/Home/Like';
import Floor from '@/view/Home/Floor';
import Brand from '@/view/Home/Brand';

import { mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState('home', ['floorList'])
  },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
  }
}
</script>

<style lang="scss" scoped></style>