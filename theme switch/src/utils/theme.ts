import {ref,watch} from 'vue'
const LOCAL_KEY = '--theme--'
// 定义全局变量，主题变量
let loaclTheme = localStorage.getItem(LOCAL_KEY)
// 判断是否有本地存储
const theme = ref(loaclTheme?loaclTheme:'light')
// 监听theme变化，切换css变量
watch(theme,()=>{
    document.documentElement.dataset.theme = theme.value
    // 存到本地
    localStorage.setItem(LOCAL_KEY,theme.value)
})

// 返回出去
export default function useTheme(){
    return theme
}