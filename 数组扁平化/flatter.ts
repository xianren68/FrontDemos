// 全部扁平化
function flatter<T>(arr:Array<any>){
    let res:Array<T> = []
    for(let i of arr){
        // 如果是数组
        if(i instanceof Array){
            let r = flatter<T>(i)
            res = res.concat(r)
        }else {
            res.push(i)
        }
    }
    return res
}
// 可控制深度的扁平化
function flat<T>(arr:Array<any>,n:number):Array<T>{
    // 层数为0,直接返回
    if(n <= 0){
        return arr
    }
    let res:Array<T> = []
    for(let i of arr){
        if(i instanceof Array){
            // 层数减1
            let r = flat<T>(i,n-1)
            res.push(...r)
        }else {
            res.push(i)
        }
    }
    return res
}

// example
let t1 = [1,[2,3,4],5,6,[7,8,9,[10,11,12,[13,14]]],15]
console.log(flatter<number>(t1))
console.log(flat<number>(t1,2))
