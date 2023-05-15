export default function debounce(func,time){
    let timer 
    return function(){
        let context = this
        let args = arguments
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(context,[...args])
        },time)
    }
}