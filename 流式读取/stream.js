// 1.xhr
export function Xhr(url,body){
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(body))
    xhr.onreadystatechange = function () {
        // 接收到信息就打印
        if (xhr.readyState === 3) {
            console.log(xhr.response)
        }
    }
}
// 2.fetch
export async function Fetch(url,body){
    // 解码器
    const decoder = new TextDecoder()
    let res = await fetch(url,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify(body)
    }
    )
    // 一个可读流
    let reader = res.body.getReader()
    while(true){
        // 从可读流中获取数据
        let {done,value} = await reader.read()
        if(done){
            console.log(value)
            break
        }
        // 对读取的字节数组解码
        console.log(decoder.decode(value))
    }

}