//防抖实现
export default function debounce(fn, delay) {
  let timer = null
  return function () {
    const _this = this;
    const args = arguments;
    // 有就去除
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, delay) 
    return undefined
  }
}