const lazy = {
  inserted: (el, binding) => {
    const imgSrc = el.src
    el.src=''
    // 观察者
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
        // isIntersecting 被指令绑定元素在可视区域内，变为true
      if (isIntersecting) {
        el.src = imgSrc
          // 停止观察
        observer.unobserve(el)
      }
    })
    // 开启观察
    observer.observe(el)
  }
}
export {
  lazy
}