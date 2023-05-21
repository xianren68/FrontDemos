function curry(fn: Function): Function {
    let list:Array<number> = []
    return function curried(...args:Array<number>) {
        list.push(...args)
        // 传入的参数大于等于函数参数长度
        if(list.length >= fn.length){
            // 执行函数
           return fn.apply(this,list)
        }else {
            // 返回函数，继续接收参数
            return curried
        }
    };
};