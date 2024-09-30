<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag" @click="removeBreadList">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i class="delete" data-key="classify">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i class="delete" data-key="keyword">×</i>
            </li>
            <!-- tradeMark的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i class="delete" data-key="trademark">×</i>
            </li>
            <!-- 平台的售卖的属性值展示的面包屑 -->
            <template v-if="searchParams.props">
              <li
                class="with-x"
                v-for="(props, index) in searchParams.props"
                :key="index"
              >
                {{ props.split(":")[1] }}
                <i class="delete" data-key="attr" :data-id="index">×</i>
              </li>
            </template>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @CustomTradeMark="handleTradeMarkInfo"
          @customAttrInfo="attrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav" @click="orderClick">
                <li :class="{ active: orderCheck('1') }">
                  <a data-id="1"
                    >综合
                    <i
                      v-show="orderCheck('1')"
                      :class="{
                        iconfont: true,
                        'icon-up': orderCheck('1,asc'),
                        'icon-down': orderCheck('1,desc'),
                      }"
                    >
                    </i>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li> -->
                <li :class="{ active: orderCheck('2') }">
                  <!-- 价格⬆ -->
                  <a data-id="2"
                    >价格
                    <i
                      v-show="orderCheck('2')"
                      :class="{
                        iconfont: true,
                        'icon-up': orderCheck('2,asc'),
                        'icon-down': orderCheck('2,desc'),
                      }"
                    >
                    </i>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <router-link :to="`/detail/${item.id}`"><img :src="item.defaultImg" /></router-link> -->
                    <router-link :to="`/detail/${item.id}`"
                      ><img :src="handleDefault(item.defaultImg)"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :currentPage="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getCurrentPage="handleAxiosPage"
            style="text-align: center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/utils/Pagination";

import { mapGetters, mapState } from "vuex";
import SearchSelector from "@/view/Search/SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
    Pagination,
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 1 是综合 2是价格
        order: "2:desc",
        // 短暂存储pageNo
        pageNo: 1,
        // 代表的是每一个展示数据个数
        pageSize: 10,
        // 平台售卖属性操作带的参数  banner
        props: [],
        trademark: "",
      },
      orderThrottle: true,
    };
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    ...mapState({ total: (state) => state.search.searchList.total }),
  },
  beforeMount() {
    // 加载完毕之前整理发送的参数
    this.upDate();
  },
  mounted() {
    // 加载完毕发起axios 得到数据
    this.getData();
  },
  methods: {
    upDate() {
      // 合并数据
      this.searchParams = {
        ...this.searchParams,
        ...this.$route.query,
        ...this.$route.params,
      };
    },
    // 发起请求
    getData() {
      this.$store.dispatch("search/getSearchInfoList", this.searchParams);
    },
    // 移除面包屑
    removeBreadList(e) {
      if (e.target.className === "delete") {
        switch (e.target.dataset.key) {
          // 分类面包屑
          case "classify":
            // 把带给服务器的参数置空了，还需要向服务器发请求
            this.searchParams.categoryName = undefined;
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            // 发起axios 获得数据
            this.getData();
            // 再次跳转 改变地址栏
            // if (this.$route.params)//不清除params参数
            this.$router.push({ name: "search", params: this.$route.params });
            break;
          // 清除关键字 params 面包屑 触发v-if or v-show 隐藏面包屑
          case "keyword":
            this.searchParams.keyword = undefined;
            // 发送消息清空input
            this.$bus.$emit("clear");
            // if (this.$route.query)//不清空 query
            this.$router.push({ name: "search", query: this.$route.query });
            break;
          // 删除品牌的信息
          case "trademark":
            // 将品牌信息置空
            this.searchParams.trademark = undefined;
            // 再次发请求
            this.getData();
            break;
          case "attr":
            // 再次整理参数
            this.searchParams.props.splice(e.target.dataset.id, 1);
            // 再次发请求
            this.getData();
            break;
        }
      }
    },
    handleTradeMarkInfo({ tmId, tmName }) {
      // 整理品牌字段的参数 品牌名称
      this.searchParams.trademark = `${tmId}:${tmName}`;
      // 发起axios 获得数据
      this.getData();
    },
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.includes(props)) return;
      this.searchParams.props.push(props);
      // 发起axios 获得数据
      this.getData();
    },
    orderCheck(index) {
      switch (index) {
        // 判断综合标签是否激活
        case "1":
          return this.searchParams.order.includes("1");
        // 升序
        case "1,asc":
          return this.searchParams.order.includes("asc");
        // 降序
        case "1,desc":
          return this.searchParams.order.includes("desc");
        // 判断价格标签是否激活
        case "2":
          return this.searchParams.order.includes("2");
        // 升序
        case "2,asc":
          return this.searchParams.order.includes("asc");
        // 降序
        case "2,desc":
          return this.searchParams.order.includes("desc");
      }
    },
    orderClick(e) {
      if (this.orderThrottle) {
        this.orderThrottle = false;
        const originOrder = this.searchParams.order.split(":")[1];
        switch (e.target.dataset.id) {
          // 综合
          case "1":
            originOrder === "asc"
              ? (this.searchParams.order = "1:desc")
              : (this.searchParams.order = "1:asc");
            this.getData();
            break;
          // 价格
          case "2":
            originOrder === "asc"
              ? (this.searchParams.order = "2:desc")
              : (this.searchParams.order = "2:asc");
            this.getData();
            break;
        }
        // 节流 1s
        setTimeout(() => {
          this.orderThrottle = true;
        }, 1000);
      }
    },
    handleAxiosPage(current) {
      this.searchParams.pageNo = current;
      this.getData();
    },
    // 项目上线反代用
    handleDefault(defaultImg) {
      if (defaultImg.includes("http://39.98.123.211"))
        return defaultImg.replace("http://39.98.123.211", "/portalImg");
      if (defaultImg.includes("http://139.198.127.41:9000"))
        return defaultImg.replace(
          "http://139.198.127.41:9000",
          "/portalImg_9000"
        );
    },
  },
  watch: {
    $route() {
      // 整理数据
      this.upDate();
      // 再次发起请求
      this.getData();
      // 每次发送完毕都清空 三级联选的id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
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
