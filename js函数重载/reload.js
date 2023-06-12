export default function createOvreload(){
    const hash = new Map()
    let f = function (...args){ // 返回重载后的函数
        // 将传入参数的类型全部判断一下,并连接起来
        let key = args.map(item=>typeof item).join(",")
        let method = hash.get(key)
        if (!method) {
            return
        }
        // 改变this执行
        return method.call(this,...args)

    }
    f.addMethod = function(...args){
        let method = args.pop()// 最后一个参数为函数
        // 判断是否为函数
        if (typeof method !== "function"){
            return 
        }
        let key = args.join(",")
        // 存到hash表中
        hash.set(key,method)
    }
    return f
    
}
