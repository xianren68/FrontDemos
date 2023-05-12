export default function myNew(constructor){
    // 定义一个空对象
    let result = {}
    // 接收参数
    let args = [...arguments].splice(1)
    // 将新对象的原型指向构造方法的原型对象
    result.__proto__ = constructor.prototype
    // 给新对象添加方法
    const sym = Symbol()
    result[sym] = constructor
    // 执行方法，将所有的属性添加
    result[sym](...args)
    // 删除方法，避免对对象造成影响
    delete result[sym]
    // 返回构造的对象
    return result
}