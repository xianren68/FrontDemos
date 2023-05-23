type Fn = (...params: any) => any

function memoize(fn: Fn): Fn {
    // 创建一个hash表，用于存储每次的参数
    let hash = new Map<string,any>()
    return function(...args) {
        if (hash.has(JSON.stringify(args))){ // 如果已有,直接返回结果
            return hash.get(JSON.stringify(args))
        }else { // 没有，执行函数，并将结果保存
            let r = fn(...args)
            hash.set(JSON.stringify(args),r)
            return r
        }
    }
}