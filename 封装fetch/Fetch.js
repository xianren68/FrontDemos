//
export default class Fetch {
    // 设置基础路径
    constructor(baseUrl){
        this.url = baseUrl
    }
    // 判断传入的地址是否有协议头
    setUrl(url){
        if(url.startsWith('http://') || url.startsWith('https://')){
            // 有前缀，直接使用传入的url
            return url 
        }else {
            // 没有前缀，拼接
            return this.url + url
        }
    }
    // get请求
    async get(url,query){
        url = this.setUrl(url)
        // 如果有query参数，则将其拼接
        if(query){
            str = '?' + new URLSearchParams(query).toString()
            url += str
        }
        let res = await fetch(url)
        return res.json()
    }
    // post请求
    async post(url,data){
        let res =  await this.p(url,data,'post')
        return res.json()
    }
    // put请求
    async put(url,data){
        let res =  await this.p(url,data,'put')
        return res.json()
    }
    // delete请求
    async delete(url,data){
        let res =  await this.p(url,data,'put')
        return res.json()
    }
    async p(url,data,method){
        url = this.setUrl(url)
        let res = await fetch(url,{
            method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        return res
    }
}