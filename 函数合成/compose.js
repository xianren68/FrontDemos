function compose(){
    let args = arguments
    let start = args.length-1
    return function(){
        let result = args[start].apply(this,arguments)
        let i = start - 1
        while(i>0){
            result = args[i].apply(this,arguments)
            i--
        }
        return result
    }
}
function compose1(){
    let args = [...arguments]
    return function(x){
        // 通过reduce来完成函数合成
        return args.reduce(function(pre,cur){
            return cur(pre)
        },x)
    }
}
// test
function a(x){
    return x*10
}
function b(x){
    return x*100
}
function c(x){
    return x/10
}
let result = compose(a,b,c)(10)
let result1 = compose1(a,b,c)(10)
console.log(result,result1)
