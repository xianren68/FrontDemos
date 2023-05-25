export {}
function objDiff(obj1: any, obj2: any): any {
    // 类型不相等
    if(Object.prototype.toString.call(obj1)!=Object.prototype.toString.call(obj2)){
        return [obj1,obj2]
    }
    let res = {}
    // 遍历ojb1
    for(let i in obj1){
        // 判断obj2中有无相同的属性
        if(obj2[i]!==undefined){ // 写全可能会遇到有布尔值，判断会出错
            // 对象类型
            if(obj1[i] instanceof Object && obj2[i] instanceof Object){
                // 是否相等，不相等递归比较
                if(JSON.stringify(obj1[i])!=JSON.stringify(obj2[i])){ 
                    let r = objDiff(obj1[i],obj2[i])
                    if(JSON.stringify({}) != JSON.stringify(r)){ // 内部有修改
                            res[i] = r
                    }
                }
            }else { // 基础类型
                if(obj1[i]!==obj2[i]){
                    res[i]=[obj1[i],obj2[i]]
                }
             }
        }
    }
    return res
};