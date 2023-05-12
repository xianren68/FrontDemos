export default function deepCopy(target){
    let res = {}
    // 判断是否为数组
    if(Array.isArray(target)){
        res = []
    }
    // 遍历属性
    for(let i in target){
        // 判断是否是继承来的
        if(!Object.hasOwn(target,i)){
            continue
        }
        // 引用类型
        if(target[i] instanceof Object){
            res[i] = deepCopy(target[i])
        }else {
            res[i] = target[i]
        }
    }
    return res
}