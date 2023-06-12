export default function(timeout = 1000) {
    return function(url,options){
        return new Promise((resolve,reject)=>{
            const singalController = new AbortController() // 信号控制器
            fetch(url,{
                ...options,
                signal:singalController.signal
            }).then(resolve,reject)
            setTimeout(()=>{
                reject(new Error("fetch timeout"))
                singalController.abort() // 请求取消
            },timeout)
        })
    }
}