export default function throttle(func,time){
    let timer
    return function(){
        let context = this
        let args = arguments
        if(timer){
            return
        }
        timer = setTimeout(()=>{
            func.apply(context,[...args])
            timer = undefined
        },time)
    }
}