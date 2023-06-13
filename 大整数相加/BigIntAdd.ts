function add(a:string,b:string):string {
    if (a.length < b.length){ // 默认b为长度较小的
        return add(b,a)
    }
    
    // let diff = a.length - b.length
    // let zero:string = ""
    // for(let i=0;i<diff;i++){
    //     zero += "0"
    // }
    // b = zero + b // 前面补零
    b = b.padStart(a.length,"0")
    let carry = 0 // 进位数
    let res:string = ""
    for(let i=a.length-1;i>=0;i--){
        let sum = +a[i] +  +b[i]  + carry // 隐式类型转换
        res = (sum % 10)+res
        carry = Math.floor(sum / 10)
    }
    if (carry == 1){
        res = "1" + res
    }
    return res
}
//test
console.log(add("12345","10101010101"))

