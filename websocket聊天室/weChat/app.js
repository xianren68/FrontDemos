import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { log } from 'console'

const __dirname = dirname(fileURLToPath(import.meta.url))
// 创建express实例
const app = express()
const server = http.createServer(app)
const io = new Server(server)
// 设置静态资源目录
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=> {
    res.redirect('/index.html')
})
// 用户列表
const userList = []
// 连接
io.on('connection', (socket) => {
    socket.on('login',data=>{
        // 登录失败
        if (userList.find(item=>item.value == data.value)) {
            socket.emit('loginFail',{msg:'登陆失败，请更换昵称'})
        
        }else{ // 登录成功，添加新用户
            userList.push(data)
            // 向登录成功的用户发送
            socket.emit('loginSuccess',data)
            // 向所有用户广播列表的变化
            io.emit('userlist',userList)
            // 广播
            io.emit('loginState',data,true)
            // 给当前连接对象添加属性，用于断开时用
            socket.userInfo = data
        }   
    })
    socket.on('disconnect',()=>{
        // 删除当前用户
        let index = userList.findIndex(item=>item.value == socket.userInfo.value)
        userList.splice(index,1)
        // 广播用户列表的变化
        io.emit('userlist',userList)
        // 广播用户下线的消息
        io.emit('loginState',socket.userInfo,false)
    })
    socket.on('sendmsg',data=>{
        // 广播消息
        let {value,img} = socket.userInfo
        io.emit('msg',{value,img,msg:data})
    })
  })
server.listen(3000,()=>{
    console.log('3000端口已启动')
})
