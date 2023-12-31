type Curried<A extends any[],R> = A extends []
? ()=>R // 无参数
: A extends [infer AT]
? (arg:AT)=>R // 一个参数
: A extends [infer AT, ...infer REST]
? (arg:AT)=>Curried<REST,R> // 多参数
: never

declare function curry<A extends any[],R>(func:(...args:A)=>R):Curried<A,R>

function sum(a:number,b:number,c:number){
    return 123
}

const sumCurry = curry(sum)