import createOvreload  from "./reload.js"

const overload = createOvreload()
overload.addMethod("string","number",function(val,num){
    console.log(val,num)
})
overload.addMethod("string",function(val){
    console.log(val)
})
overload("string",33)
overload("val")