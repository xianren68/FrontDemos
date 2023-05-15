export default class eventBus{

    constructor(){
        // 事件列表
        this.events = {}
    }
    // 订阅事件
    on(type,func){
        // 判断是否存在事件
        if(!this.events[type]){
            // 不存在，新建并将func加入
            this.events[type] = [func]
        }else{
            // 存在，将func加入
            this.events[type].push(func)
        }
    }
    // 取消订阅
    off(type,func){
        // 如果事件不存在，直接返回
        if(!this.events[type]) return
        // 存在，直接筛选
       this.events[type] =  this.events[type].filters(item=>item.func!==func)
    }
    // 只触发一次的事件方法
    once(type,func){
        function fn(){
            func()
            this.off(type,fn)
        }
        this.on(type,fn)
    }
    // 触发事件
    emit(type,...args){
        if(!this.events[type]){
            return 
        }
        this.events.forEach(item=>item.call(this,...args))
    }

}