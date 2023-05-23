export {}
declare global {
    interface Array<T> {
        groupBy(fn: (item: T) => string): Record<string, T[]>
    }
}
Array.prototype.groupBy = function(fn) {
    let res:any = {}
    for(let i of this){
        let r = fn(i)
        if(res[r]){
            res[r].push(i)
        }else{
            res[r] = [i]
        }
    }
    return res

}