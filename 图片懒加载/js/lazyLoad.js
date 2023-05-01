// 三种可能触发的情况
// 1. 滚动事件
document.addEventListener('scroll',lazyLoad())
// 2. 缩放
window.addEventListener('resize',lazyLoad())
// 3. 旋转
window.addEventListener('orientationchange',lazyLoad())

// 判断是否在视口
function isView(element){
    // 获得视口范围
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    const viewWidth = window.innerWidth || document.documentElement.clientWidth
    // 获取元素所在位置
    const {
        top,
        left,
        bottom
    } = element.getBoundingClientRect()

    // 全部进入
    // return (
    //     top >= 0 &&
    //     bottom <= viewHeight &&
    //     left >= 0
    // )
    // 进入一部分
    return (
        top >= 0 &&
        top <= viewHeight &&
        left >= 0
    )
}

// 懒加载并防抖
function lazyLoad(){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            // 遍历所有图片，判断其所在位置
            let images = document.querySelectorAll('.lazy')
            images.forEach(img=>{
                console.log(img)
                if(isView(img)){
                    // 将图片地址替换
                    img.src = img.dataset.src
                    // 并删除lazy
                    img.classList.remove('lazy')
                }
            })
            // 如果所有图片都加载完成，移出事件
            if(images.length == 0){
                document.removeEventListener('scroll',lazyLoad())
                window.removeEventListener('resize',lazyLoad())
                window.removeEventListener('orientationchange',lazyLoad())
            }
        },200)
    }
}