// 容器
const container = document.querySelector('.lrc')
const ul = document.querySelector('.lrc ul')
const audio = document.querySelector('audio')
// 容器高度
const containerHeight = container.clientHeight



/**
 * @param {string} lrc 歌词字符串
 * @returns time:时间str:歌词内容
 */
function parseLrc(lrc){
    let res = []
    lrc = lrc.split('\n')
    // 将歌词通过']'分割
    for(let i = 0; i < lrc.length; i++){
        lrc[i] = lrc[i].split(']')
        let obj = {}
        obj.str = lrc[i][1]
        let time = lrc[i][0].slice(1).split(':')
        obj.time = +time[0] * 60 +  +time[1]
        res.push(obj)
    }
    return res
}

/**
 * 创建歌词元素
 * @param {array} 歌词对象数组
 */
function createLrc(){
    let frag = document.createDocumentFragment()
    lrcList.forEach(item => {
        let li = document.createElement('li')
        li.innerText = item.str
        frag.appendChild(li)
    })
    ul.appendChild(frag)
}
let lrcList = parseLrc(lrc)
createLrc()

const maxOffset = ul.clientHeight - containerHeight
const lrcHeight = ul.children[0].clientHeight

/**
 * 获取当前歌词的索引
 * @returns 定位到的歌这的第几句
 */

function getCurrentLrcIndex(){
    let currentTime = audio.currentTime
    for(let i = 0; i < lrcList.length; i++){
        if(currentTime < lrcList[i].time){
            return i-1
        }
    }
    // 遍历完，一直停留在最后一句
    return lrcList.length-1

}

/** 
 * 设置歌词容器的偏移量
 * @param {number} index 定位到的歌这的第几句
*/
function setOffset(){
    let index = getCurrentLrcIndex()
    let offset = index * lrcHeight + lrcHeight / 2 - containerHeight / 2
    if(offset < 0){
        offset = 0
    }
    if(offset > maxOffset){
        offset = maxOffset
    }
    ul.style.transform = `translateY(-${offset}px)`
    if(index === -1){
        return
    }
    let li = document.querySelector('.lrc ul li.active')
    if(li){
        li.classList.remove('active')
    }
    ul.children[index].classList.add('active')
}


// 事件绑定
audio.addEventListener('timeupdate',setOffset)