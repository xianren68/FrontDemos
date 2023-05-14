export function myCall(target,...args){
    if (typeof this !== 'function'){
        throw new Error('call方法只能被方法/函数调用')
    }
    //判断指定调用此方法的对象的是否存在，若存在，则包装为对象,不存在，则指定为window
    target = target ? Object(target): window
    // 将调用的函数添加到目标对象上
    const sym = Symbol()
    target[sym] = this
    // 执行方法，并保存返回值
    let result = args?target[sym](...args):target[sym]()
    // 去除函数
    delete target[sym]
    return result
}
export function myApply(target,arr){
    if (typeof this !== 'function'){
        throw new Error('call方法只能被方法/函数调用')
    }
    //判断指定调用此方法的对象的是否存在，若存在，则包装为对象,不存在，则指定为window
    target = target ? Object(target): window
    // 将调用的函数添加到目标对象上
    const sym = Symbol()
    target[sym] = this
    // 执行方法，并保存返回值
    let result = arr?target[sym](...arr):target[sym]()
    // 去除函数
    delete target[sym]
    return result
}
// 简单写法，这里没有考虑bind返回的函数作为构造函数的用法
export function myBind(target,...args){
    if (typeof this !== 'function'){
        throw new Error('call方法只能被方法/函数调用')
    }
    // 箭头函数，this往外找
    return (...arg)=>{
        // 返回的函数也可以传参，用apply更好处理
        return this.myApply(target,[...args,...arg])
    }
}