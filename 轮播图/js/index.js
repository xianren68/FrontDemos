// 获取元素节点
// 外层容器
let container = document.querySelector('.container')
// 图片盒子
let imgList = document.querySelector('.images')
// 上一个
let pre = document.querySelector('.prev')
// 下一个
let next = document.querySelector('.next')
// 数字盒子
let numbs = document.querySelector('.number')
// 数字列表
let numList = document.querySelectorAll('.number li')

// 定义全局变量
let current = 0 // 当前图片索引
let timer = null // 定时器
// 默认展示第一个
numList[current].style.backgroundColor = '#fff'
// 绑定事件
pre.addEventListener('click',prevFun)
next.addEventListener('click',nextFun)
// 移入，移出容器,决定是否自动播放
container.addEventListener('mouseenter',stopAutoplay)
container.addEventListener('mouseleave',autoPlay)
numbs.addEventListener('click',clickNum)

// 自动播放
function autoPlay(){
    timer = setInterval(nextFun,2000)
}
// 关闭自动播放
function stopAutoplay(){
    clearInterval(timer)
}
// 上一张
function prevFun(){
    imgList.style.transition = '0.5s'
    // 清空上一个选中的样式
    numList[current].style.backgroundColor = ''
    if(current == 0){ // 第0张，跳到最后
        imgList.style.transition = '0s' // 清除动画
        current = 2
    }else{
        current--
    }
    imgList.style.left = `-${current*800}px`
    // 设置选中样式
    numList[current].style.backgroundColor = '#fff'
}
// 下一张
function nextFun(){
    imgList.style.transition = '0.5s'
    // 清空上一个选中的样式
    numList[current].style.backgroundColor = ''
    if(current == 2){ // 第0张，跳到最后
        imgList.style.transition = '0s' // 清除动画
        current = 0
    }else{
        current++
    }
    imgList.style.left = `-${current*800}px`
    // 设置选中样式
    numList[current].style.backgroundColor = '#fff'
}
// 直接点击按钮(事件委托)
function clickNum(e){
    numbs.style.transition = '0.5s'
    let index = e.target.dataset.num
    if(index == undefined){
        return
    }
    // 清空上一个选中的样式
    numList[current].style.backgroundColor = ''
    current = Number(index)
    imgList.style.left = `-${current*800}px`
    // 设置选中样式
    numList[current].style.backgroundColor = '#fff'
}
autoPlay()