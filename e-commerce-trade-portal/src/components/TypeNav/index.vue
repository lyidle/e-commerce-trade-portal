<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 移出 全部商品分类 复位 currentIndex -->
      <div @mouseleave="leaveEffect" @mouseenter="enterEffect">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 感觉 transition 适合做加载动画 这里使用时进入的时候会执行一次 所以使用ref绑定用原生写  -->
        <div class="sort" @click="goSearch" :style="`height:${thisHeight}`">
          <div class="all-sort-list2">
            <!-- slice 截取前15条数据 防止溢出 -->
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
              :class="{ active: currentIndex === index }">
              <h3 @mouseenter="changeIndex(index)">
                <!-- <a href="">{{ c1.categoryName }}</a> -->
                <a :data-category-name="c1.categoryName" :data-category1-id="c1.categoryId"
                  to="/search">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二级、三级分类 -->
              <div class="item-list clearfix" v-show="currentIndex === index">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <!-- <a href="">{{ c2.categoryName }}</a> -->
                      <a :data-category-name="c2.categoryName" :data-category2-id="c2.categoryId"
                        to="/search">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="">{{ c3.categoryName }}</a> -->
                        <a :data-category-name="c3.categoryName" :data-category3-id="c3.categoryId"
                          to="/search">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      thisHeight: 0
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // 不能使用splice 会修改数据
        return state.home.categoryList.slice(0, 15)
      }
    })
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
    },
    enterEffect() {
      if (this.$route.path !== '/home') {
        this.thisHeight = '460px'
      }
    },
    leaveEffect() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.thisHeight = 0
      }
    },
    goSearch(e) {
      // 更据身上是否有 categoryName 来跳转Search
      if (e.target.dataset.categoryName) {
        const {
          categoryName,
          category1Id,
          category2Id,
          category3Id
        } = e.target.dataset
        // 跳转配置
        let location = {
          name: 'search',
          query: {
            categoryName
          }
        }
        // 根据是几级category来跳转配置
        // 没有就undefined 不带给服务器
        location.query.category1Id = category1Id || undefined
        location.query.category2Id = category2Id || undefined
        location.query.category3Id = category3Id || undefined
        this.$router.push(location)
      }
    }
  },
  // 组件挂载完毕
  mounted() {
    if (this.$route.path === '/home') {
      this.thisHeight = '460px'
    } else {
      this.thisHeight = 0
    }
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      overflow: hidden;
      transition: .5s linear;

      a {
        cursor: pointer;
      }

      .all-sort-list2 {
        .active {
          background-color: skyblue;
        }

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;


            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>