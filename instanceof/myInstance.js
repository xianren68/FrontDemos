export default function myInstance(origin,target){
    // 到顶部，没有
    if(origin.__proto__ === null){
        return false
    }
    // 对比原型
    if(origin.__proto__ === target.prototype){
        return true
    }
    // 继续向上追溯
    return myInstance(origin.__proto__,target)

}