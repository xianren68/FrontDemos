export default async function sleep(delay){
    return await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1)
        },delay)
    })
}