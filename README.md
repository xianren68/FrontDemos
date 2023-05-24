# FrontDemos
一些前端的小demo
### 1.图片懒加载
[link](./图片懒加载)
###### 优点
懒加载即延迟加载，让图片在可视区域时再加载，可以极大的提升用户体验
###### 原理
将要加载的图片地址先存储在`data-src`中，等到图片进入视口时将`src`替换

[参考](https://juejin.cn/post/6971453092592091143)
[intersectionObserve](https://www.haorooms.com/post/intersectionobserver)

### 2.轮播图
[link](./轮播图)
###### 组成
1. 用于轮播的图片
2. 一个容器，大小与图片一致，设置超出范围隐藏
3. 图片容器，包含所有图片
4. 前后按钮，用于前后切换
5. 数字按钮，显示当前图片并可用于点击切换
6. 随时间轮转图片
###### 实现
1. 图片容器定义绝对定位，随着它left属性的移动，可以在容器中显示不同的图片
2. 通过定位将前后与数字按钮放到指定的位置
3. 给前后按钮绑定事件，点击则修改图片left属性+-图片宽度，并记录位置，便于数字按钮显示样式
4. 给数字容器绑定事件，通过target属性完成事件委托，点击那个数字，则跳转相应的距离
5. 通过定时器来自动轮播，在鼠标进入容器后，停止轮播，移出容器后，重新轮播
   
[参考](https://juejin.cn/post/7072683227625816072)

### fetch
下一代的ajax技术，模仿axios对其简单封装

[link](./封装fetch)

### sleep
通过`async,await`以及定时器，实现一个休眠函数sleep
因为通过定时器实现，所以只是大概的时间

[link](./实现sleep)

### websocket聊天室
1. 通过nodejs-websocket实现一个极简聊天室
   
[link](./websocket聊天室/simple)
2. 通过socketio实现一个仿微信群的聊天室
socketio的模式类似于发布订阅模式，注册事件与触发事件，触发事件时可以传入参数

[link](./websocket聊天室/weChat)

### 深拷贝
对引用类型进行深拷贝，本质是判断类型然后递归

[link](./深拷贝)

### new关键字
本质上是对this的应用，将构造方法加入到新的对象上，然后通过新对象调用，this关键字自然会将属性添加到新对象上然后再将`__proto__`属性指向构造方法的`prototype`，最后将方法删除，返回新对象即可。

[link](./new关键字)

### v-model
v-model 本质是v-bind和input事件组成的，v-bind单向绑定，而input事件拿到元素本身的值，再将其赋给绑定值

[link](./v-model)

### call,apply,bind
这三个方法都可以用来改变一个方法的this指向，call和apply的区别在于传递的参数一个是不定长的参数，一个是数组
bind会返回一个函数，不会立即执行
这些方法的本质是对this的应用，通过其他方法调用这三个方法，那么这三个方法中的this就是调用它们的方法，将this添加到
要执行的对象上执行即可
记住，谁调用函数，函数的this指向谁

[link](./call,apply,bind)

### 防抖和节流
对闭包的应用，防抖是只触发最后一次，类似于moba游戏中的回城，你点几次它只会执行最最后一次
节流是在有限事件内只触发第一次，类似于释放平a,在固定的阈值内，只会触发一次

[link](./防抖，节流)

### 发布订阅模式(快手二面)
通过一个对象来作为事件总线
每个事件都对应一个数组，用于订阅事件的方法
在触发事件时会将对应事件数组中的函数全部执行

[link](./订阅发布模式)

### vue组件
#### 分页器组件
###### 需要的数据
1. `onPage`,当前页
2. `total`,总数据条数
3. `continues`,分页器连续页码的个数
4. `pageNum`,每页的数据个数
5. `getPageon()`页码发生改变时触发的函数（自定义），接收参数为当前选中页码
通过父级传递参数来定制分页器组件的具体形式，并且通过自定义函数来让分页器组件向父组件传递数据（点击的是哪个组件）

[link](./vue组件/pagination)

### 函数合成(快手二面)
令compose(fn,...f3,f2,f1)(x) 等价于 fn(...f3(f2(f1(x))))

[link](./函数合成)

### 主题切换
利用css变量,定义一些有关主题的变量,例如背景色,字体颜色等
在使用到背景色等时,我们用变量代替,切换主题时直接切换整个变量内容即可

[link](./theme switch/src/theme.css)


### 数组扁平化
将嵌套的数组转化为一维数组，js中有Array.flat方法可以实现，接收两个参数，一个为嵌套的数组，一个为展开的层数
手动实现

[link](./数组扁平化)

leetcode:https://leetcode.cn/problems/flatten-deeply-nested-array/

> push性能比concat好，用concat拼接会超时

### 函数柯里化
柯里化就是只传递给函数**一部分参数**来调用它，让它返回一个函数去处理剩余的参数。

本质上是闭包的应用，在外层函数中将参数的数量保存起来，如果参数数量与传入的函数参数一致，则执行传入函数
如果不一致，则返回内部函数继续接收参数

[link](./函数柯里化)

leetcode:https://leetcode.cn/problems/curry/

### 分组 
通过传入函数运行的结果，结果相同的分为一组，返回分组后的对象
遍历数组每一项，放到函数中执行，判断结果是否在对象中，如果已存在，则添加到数组
如果不存在，则创建对应的数组，并将当前项加入

[link](./分组)

leetcode:https://leetcode.cn/problems/group-by/

### 记忆函数
接收一个函数作为参数，同时返回一个记忆函数，给记忆函数传入参数，如果是第一次执行，会调用原函数执行，将结果缓存并返回出去
如果是前面传入过的参数，则直接返回缓存的结果。
本质上扔然是闭包的应用，用hash表将执行结果存起来，遇到相同的参数返回即可

[link](./记忆函数)

leetcode:https://leetcode.cn/problems/memoize/

### 流式读取
流式读取后端传来的数据

[link](./流式读取)

