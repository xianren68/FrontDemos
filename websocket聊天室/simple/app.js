import websocket from 'nodejs-websocket'

// 定义状态常量
const ENTER = 0
const LEAVE = 1
const CHAT = 2
// 用户总数
let count = 0

// 创建一个服务，每次有用户连接，就会执行，并给当前用户创建connect对象
const ws = websocket.createServer(connect=>{
    // 用户+1
    count ++
    // 广播用户连接
    let msg = `用户${count}进入聊天室`
    connect.name = count
    broadcast({type:ENTER,msg,time:new Date().toDateString()})
    // text事件，用户发送数据时触发
    connect.on('text',data=>{
        let msg = `用户${connect.name}:${data}`
        broadcast({type:CHAT,msg,time:new Date().toDateString()})
    })
    // close事件，连接关闭时触发
    connect.on('close',()=>{
        let msg = `用户${count}离开聊天室`
        broadcast({type:LEAVE,msg,time:new Date().toDateString()})
        count --
    })
    // error，监听连接的异常信息
    connect.on('error',()=>{

    })
})

// 广播事件
function broadcast(obj){
    ws.connections.forEach(item=>{
        item.send(JSON.stringify(obj))
    })
}
// 监听端口
ws.listen(3000,()=>{
    console.log('3000端口,服务已启动')
})