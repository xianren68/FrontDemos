class Promise {
    constructor(executor) {
        //promise状态
        this.state = 'pending'
        //promise值
        this.data = null
        //回调函数列表
        //成功的回调
        this.onResolveCallBacks = []
        //失败的回调
        this.onRejectCallBacks = []
        //resolve,改变promise的状态为成功
        //保存this
        let self = this
        function resolve(value) {
            //判断状态是否以改变过
            if (self.state === 'pending') {
                //修改状态和值
                self.state = "resolved"
                self.data = value
                //调用成功后的回调函数
                self.onResolveCallBacks.forEach(item => { item() })
            }

        }
        function reject(reason) {
            //判断状态是否以改变过
            if (self.state === 'pending') {
                //修改状态和值
                self.state = "rejected"
                self.data = reason
                //调用失败后的回调函数
                self.onRejectCallBacks.forEach(item => { item() })
            }

        }
        //立即执行
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        //判断传进来的是否为函数,值传递
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        //不捕获即抛出错误
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        //返回一个新的Promise对象
        let promise = new Promise((resolve, reject) => {
            //状态还未改变，将回调函数存储起来
            // 使用queueMicrotask实现微任务
            if (this.state === 'pending') {
                this.onResolveCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let result = onFulfilled(this.data)
                            //处理返回值
                            resolvePromise(promise, result, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onRejectCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let result = onRejected(this.data)
                            resolvePromise(promise, result, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
            //状态为成功
            if (this.state === 'resolved') {
                //异步执行onfulfilled
                queueMicrotask(() => {
                    try {
                        let result = onFulfilled(this.data)
                        resolvePromise(promise, result, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            //状态为失败
            if (this.state === 'rejected') {
                //异步执行onRejected
                queueMicrotask(() => {
                    try {
                        let result = onRejected(this.data)
                        resolvePromise(promise, result, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

        })
        return promise
    }
    catch(onRejected) {
        //直接调用then方法
        this.then(null, onRejected)
    }
    //静态方法
    static resolve(value) {
        //返回一个成功的Promise
        return new Promise((resolve, reject) => {
            // value是promise
            if (value instanceof Promise) { // 使用value的结果作为promise的结果
                value.then(resolve, reject)
            } else { // value不是promise  => promise变为成功, 数据是value
                resolve(value)
            }
        })
    }
    static reject(reason) {
        //返回一个成功的Promise
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    static all(iterable) {
        //存储所有返回的结果
        const aResult = new Array(iterable.length)
        let i = 0
        //遍历可迭代对象中的所有值
        //成功将成功的值加入数组，并将i+1
        //失败即直接reject失败的值
        return new Promise((resolve, reject) => {
            iterable.forEach((p, index) => {
                p.then(res => {
                    //全部成功了，返回成功的数组
                    i++
                    aResult[index] = res
                    if (i >= iterable.length) {
                        resolve(aResult)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }
    static race(iterable) {
        return new Promise((resolve, reject) => {
            iterable.forEach(p => {
                p.then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            })
        })
    }
}
//处理返回值
function resolvePromise(promise, result, resolve, reject) {
    // 解决循环引用报错
    if (promise == result) {
        // reject报错
        reject(new TypeError("请避免Promise循环引用"))
    }
    // 定义状态-防止多次调用
    let called
    // result不是null 且result是对象或函数
    if (result != null && (typeof result === "object" || typeof result === "function")) {
        try {
            // 拿到result的then方法
            let then = result.then
            // 如果then是函数，就默认是promise
            if (typeof then === "function") {
                // 执行then 使用call传递this 第一个参数是this 后面是成功的回调 和 失败的回调
                then.call(
                    result,
                    y => {
                        // 成功和失败只能调用一个
                        if (called) return
                        called = true
                        // 防止用户在resolve的时候传入Promise，递归调用,直到传入的值为普通值
                        resolvePromise(result, y, resolve, reject)
                    },
                    err => {
                        // 成功和失败只能调用一个
                        if (called) return
                        called = true
                        reject(err)
                    }
                )
            } else {
                resolve(result)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(result)
    }
}
