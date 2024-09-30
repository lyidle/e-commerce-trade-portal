<template>
  <div class="spec-preview">
    <img :src="skuImageList?.[currentIndex]?.imgUrl" />
    <div class="event" @mousemove="handler" @mouseleave="handlerLeave"></div>
    <div class="big">
      <img :src="skuImageList?.[currentIndex]?.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // 三个handler处理放大镜 使用window挂载 防止速度过快 mask 丢失
    handler(e) {
      const mask = this.$refs.mask
      const maskWidth = mask.offsetWidth
      const maskHeight = mask.offsetHeight
      const middleWidth = e.target.offsetWidth
      const middleHeight = e.target.offsetHeight
      const bigImg = this.$refs.bigImg
      const scaleX = bigImg.offsetWidth / middleWidth
      const scaleY = bigImg.offsetHeight / middleWidth
      document.addEventListener('mousemove', this.handleFn(e, mask, maskWidth, maskHeight, middleWidth, middleHeight, bigImg, scaleX, scaleY))

    },
    handleFn(e, mask, maskWidth, maskHeight, middleWidth, middleHeight, bigImg, scaleX, scaleY) {
      let left = e.offsetX - maskWidth / 2
      let top = e.offsetY - maskHeight / 2
      if (left < 0) left = 0
      if (top < 0) top = 0
      if (left > maskWidth) left = middleWidth / 2
      if (top > maskHeight) top = middleHeight / 2
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      bigImg.style.left = -left * scaleX + 'px'
      bigImg.style.top = -top * scaleY + 'px'
    },
    handlerLeave() {
      document.removeEventListener('mousemove', this.handleFn)
    }
  },
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>