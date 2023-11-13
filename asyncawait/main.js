/**
 * request 模拟网络请求
 * @params {string} url 网址
 */
function request(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        },1000)
    })
}

// 用promise实现异步请求
request('aaa').then(res=>request(res + ' bbb')
).then(res => request(res + ' ccc')).then(res => console.log(res)) // aaa bbb ccc

// 用async await 实现
async function re(){
    let res = await request('aaa')
    let res1 = await request(res + ' bbb')
    let res2 = await request(res1 + ' ccc')
    console.log(res2)
}
re()

// 使用generatior来模拟async await
function* generator(url){
    let res = yield request(url)
    let res1 = yield request(res + ' bbb')
    let res2 = yield request(res1 + ' ccc')
    console.log(res2)
}

// 递归函数自动执行next方法
function execGende(gener,url){
    // 产生生成器
    const gen = gener(url)
    // 递归执行next
    function recurse(url){
        const result = gen.next(url)
        if(result.done){
            return
        }
        result.value.then(res=>{
            recurse(res)
        })
    }
    recurse()
}
// 使用
execGende(generator,'aaa') // aaa bbb ccc