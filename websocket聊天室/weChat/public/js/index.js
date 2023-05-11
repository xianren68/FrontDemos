// 创建socket连接
const socket = io()
// 输入用户名的文本框
let text = document.querySelector('.username')
// 登录按钮
let submit = document.querySelector('.log-btn')
// 头像选择区
let content = document.querySelector('.avatar')
// 选中的头像
let select = document.querySelector('.select')
// 登录页面
let login = document.querySelector('.login')
// 聊天页面
let chat = document.querySelector('.chat')
// 个人信息
let userInfo = document.querySelector('.myself')
// 用户列表
let userList = document.querySelector('.userlist')
// 聊天人数显示
let total = document.querySelector('.top')
// 消息界面
let chatBox = document.querySelector('.main')
// 消息框
let textarea = document.querySelector('textarea')
// 发送消息按钮
let sendmsg = document.querySelector('.send')
// 保存登录个人信息
let username, img

// 绑定头像选中事件(事件委托)
content.addEventListener('click', function (e) {
    let current = e.target
    // 将原先选中的删除
    select.classList.remove('select')
    // 添加选中状态
    current.classList.add('select')
    // 修改选中的元素
    select = current
})

// 提交信息
submit.addEventListener('click', () => {
    // 获取数据
    let value = text.value
    let img = select.src
    // 触发登录方法
    socket.emit('login', { value, img })
})
// 登录成功，修改显示状态
socket.on('loginSuccess', data => {
    // 修改显示状态
    login.classList.add('unShow')
    chat.classList.remove('unShow')
    username = data.value
    img = data.img
    userInfo.appendChild(createUser(data))

})
// 登录失败
socket.on('loginFail', data => {
    alert(data.msg)
})
// 用户列表发生变化
socket.on('userlist', data => {
    userList.innerHTML = ''
    for (let item of data) {
        // 用户本身，跳过
        if (item.value == username) {
            continue
        }
        // 其他用户，直接渲染
        userList.appendChild(createUser(item))
    }
    total.innerHTML = `聊天室(${data.length})`
})
// 用户登录/离线广播
socket.on('loginState', (data, state) => {
    chatBox.appendChild(createSys(data, state))
    scrollView()
})
// 消息监听
socket.on('msg', data => {
    if(data.value == username){
        chatBox.appendChild(createMsg(data,'self'))
    }else {
        chatBox.appendChild(createMsg(data,'other'))
    }
    scrollView()
})
// 发送消息
sendmsg.addEventListener('click', () => {
    // 触发发送消息方法
    socket.emit('sendmsg', textarea.value)
    // 清空消息
    textarea.value = ''
})
// 用户发送消息
// 方法，创建用户div
function createUser(data) {
    // div
    let user = document.createElement('div')
    // 头像
    let img = document.createElement('img')
    img.src = data.img
    // 用户名
    let text = document.createElement('div')
    text.innerHTML = data.value
    user.classList.add('avat')
    user.appendChild(img)
    user.appendChild(text)
    return user
}
// 方法，创建系统广播
function createSys(data, state) {
    let x
    if (state) {
        x = '上线'
    } else {
        x = '离线'
    }
    let sys = document.createElement('div')
    sys.classList.add('sys')
    sys.innerHTML = `用户“${data.value}”${x}`
    return sys
}
// 创建消息
function createMsg(data, who) {
    let message = document.createElement('div')
    // 消息内容
    let text = document.createElement('div')
    text.innerHTML = data.msg
    text.classList.add('text')
    // 头像
    let avt = document.createElement('img')
    avt.src = data.img
    // 用户名
    let username = document.createElement('span')
    username.innerHTML = data.value
    // 普通的div盒子
    let div = document.createElement('div')
    div.classList.add('info')
    div.appendChild(username)
    div.appendChild(avt)
    let box = document.createElement('div')
    if (who == 'other') {
        message.appendChild(div)
        message.appendChild(text)
        message.classList.add('other')
        box.classList.add('box-left')
        message.classList.add('msg-left')
    }else {
        message.appendChild(text)
        message.appendChild(div)
        message.classList.add('self')
        box.classList.add('box-right')
        message.classList.add('msg-right')
    }
    box.appendChild(message)
    return box
}
// 滚动到视野中
function scrollView(){
    let last = chatBox.lastElementChild
    last.scrollIntoView(false)
}

