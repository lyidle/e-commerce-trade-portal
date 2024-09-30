<template>
  <div class="pagination" @click="pagination">
    <div @click="prePage" class="prePage"></div>
    <div v-if="startNumber" data-name="startNumber">1</div>
    <div v-show="startDot" class="startDot" @click="goFirst"></div>

    <!-- 根据结束位置生成 连续页按钮 -->
    <template v-for="(end, index) in end">
      <div :class="{ active: pageData.currentPage === (index + 1) }" v-if="end >= start" :key="index" :data-id="index">
        {{ end }}
      </div>
    </template>

    <div v-show="endDot" class="endDot" @click="goLast"></div>
    <div v-show="endNumber" data-name="endNumber" class="total">{{ totalPage }}</div>
    <div @click="nextPage" class="nextPage"></div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页 页面展示个数 总条目数 连续页码
  props: ['currentPage', 'pageSize', 'total', 'continues'],
  data() {
    return {
      startNumber: false,
      startDot: false,
      endNumber: true,
      endDot: true,
      start: 0,
      end: 0,
      pageData: { ...this.$props }
    }
  },
  mounted() {
    this.render()
  },
  computed: {
    // 页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  methods: {
    // 渲染函数
    render() {
      // 外部变量
      const { currentPage, total, continues } = this.pageData
      this.start = 0, this.end = 0
      // 总页数 小于连续页数 纠正
      if (total < continues) {
        this.start = 1
        this.end = this.totalPage
      }
      // 总页数 大于 连续的页数
      else {
        this.start = currentPage - parseInt(continues / 2)
        this.end = currentPage + parseInt(continues / 2)
        // 纠正 start 负数的情况
        if (this.start < 1) {
          this.start = 1
          // 正常的现象不会出现 总页数 超出 连续的页数 的情况
          this.end = continues
        }
        // 结束页 超出 总页数
        if (this.end > this.totalPage) {
          this.start = this.totalPage - continues + 1
          this.end = this.totalPage
          // 超出时隐藏右边的数字和点
          this.endNumber = false
          this.endDot = false
        }
      }
      // 左边的第一个数字显示与隐藏
      if (currentPage > 3)
        this.startNumber = true
      else
        this.startNumber = false
      // 左边省略号的显示与隐藏
      if (currentPage > 4)
        this.startDot = true
      else
        this.startDot = false

      // 右边的第一个数字显示与隐藏
      if (currentPage <= this.totalPage) {
        this.endNumber = false
        this.endDot = false
      }
      if (currentPage < this.totalPage - 2) {
        this.endNumber = true
        this.endDot = true
      }
    },
    // 左边按钮
    prePage() {
      if (this.pageData.currentPage <= 1) return
      this.pageData.currentPage--
    },
    // 右边按钮
    nextPage() {
      if (this.pageData.currentPage >= this.totalPage) return
      this.pageData.currentPage++
    },
    pagination(e) {
      const index = e.target.dataset.id
      const name = e.target.dataset.name
      // 中间连续按钮的点击事件
      if (index) {
        this.pageData.currentPage = parseInt(index) + 1
      }
      // 回到第一页
      if (name === 'startNumber')
        this.pageData.currentPage = 1
      // 回到最后一页
      if (name === 'endNumber')
        this.pageData.currentPage = this.totalPage
    },
    goFirst() {
      this.pageData.currentPage = 1
    },
    goLast() {
      this.pageData.currentPage = this.totalPage
    }
  },
  watch: {
    'pageData.currentPage'(newV) {
      this.$emit('getCurrentPage', newV)
      this.render()
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  --width: 30px;
  --height: 30px;
  --margin: 5px;
  --total: 7;
  --background: #F4F4F5;
  --color: #606266;
  --userSelect: none;
  --hoverColor: #409EFF;
  --activeBackground: #409EFF;
  --activeColor: white;
  font-size: 13px;
  font-weight: bold;
  margin: 10px;

  div {
    display: inline-block;
    // width: var(--width);
    padding: 0 10px;
    height: var(--height);
    line-height: var(--height);
    text-align: center;
    background-color: var(--background);
    margin-right: var(--margin);
    cursor: pointer;
    color: var(--color);
    user-select: var(--userSelect);

    &:last-child {
      margin-right: 0;
    }

    &:not(:first-child):not(:last-child):not([class~='active']):hover {
      color: var(--hoverColor);
    }

    &.active {
      background-color: var(--activeBackground);
      color: var(--activeColor)!important;
    }

    &.endDot,
    &.startDot {
      width: var(--width);
      padding: 0;
    }

    &.prePage::before,
    &.nextPage::before {
      display: inline-block;
      width: var(--width);
      height: var(--height);
      line-height: var(--height);
      transform: scaleY(1.5);
    }

    &.prePage::before {
      content: '<';
    }

    &.nextPage::before {
      content: '>';
    }

    &.startDot::before,
    &.endDot::before {
      display: inline-block;
      width: var(--width);
      height: var(--height);
      line-height: var(--height);
    }

    &.startDot::before {
      content: '...';
    }

    &.startDot:hover::before {
      font-size: 10px;
      letter-spacing: -1px;
      content: '<<';
      transform: scaleY(1.7);
    }

    &.endDot::before {
      content: '...';
    }

    &.endDot:hover::before {
      font-size: 10px;
      letter-spacing: -1px;
      content: '>>';
      transform: scaleY(1.7);
    }
  }
}
</style>