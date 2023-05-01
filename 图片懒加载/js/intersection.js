// 通过interSectionObserve来进行监听
// 创建监听对象
const imgObserve = new IntersectionObserver(entries=>{
    // 遍历监听的元素
    entries.forEach(entry=>{
        // 可见性发生变化
        if(entry.isIntersecting){
            // 拿到目标元素
            let img = entry.target
            // 修改src
            img.src = img.dataset.src
            // 修改class,卸载事件监听
            img.classList.remove('lazy')
            imgObserve.unobserve(img)
        }
    })
})
let imgs = document.querySelectorAll('.lazy')
// 监听所有懒加载的图片
for(let i of imgs){
    imgObserve.observe(i)
}