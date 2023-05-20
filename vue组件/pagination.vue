<!-- 分页器组件 -->

<template>
  <div class="page">
      <ul class="pagination">
        <li class="pre" :disabled="props.onPage == 1" @click="e=>turn(e,1)">上一页</li>
        <li v-if="startAndEnd.start > 1" @click="emit('getPageon',1)">1</li>
        <li v-if="startAndEnd.start > 2">...</li>
        <!-- 从start页才开始渲染 -->
        <li v-for="page in (startAndEnd.end+1-startAndEnd.start)" :key='page' @click="emit('getPageon',page+startAndEnd.start-1)"
        :class="{active:(page+startAndEnd.start-1) === onPage}">
          {{page+startAndEnd.start-1}}
        </li>
        <li v-if="startAndEnd.end < pages-1">...</li>
        <li v-if="startAndEnd.end < pages" @click="emit('getPageon',pages)">{{pages}}</li>
        <li class="next" :disabled="props.onPage == pages" @click="e=>turn(e,onPage+1)">下一页</li>
        <li class="total">共{{total}}条</li>
      </ul>
  </div>
</template>

<script setup>
import {computed} from 'vue'
// 获取props
const props = defineProps(['pageNum','total','onPage','continues'])
// 获取自定义事件
const emit = defineEmits(['getPageon'])
// 总页数
let pages = computed(()=>{
  return Math.ceil(props.total/props.pageNum)
})
// 开始和结束的页数
// 尽量让当前页码位于中间
let startAndEnd = computed(()=>{
  let start,end 
  // 如果连续页码数大于总页数
  if(props.continues>pages){
    start = 0
    end = pages
  }else{
    start = props.onPage - parseInt(props.continues/2)
    end = props.onPage + parseInt(props.continues/2)
    if(start<1){
      start = 1
      end = props.continues
    }
    if(end>pages.value){
      end = pages.value
      start = pages.value - props.continues+1
    }
    return {start,end}
  }
})
// 前一页或后一页，没有用按钮，导致disable无效，手动取消一下吧
const turn = (e,page)=>{
  if(e.target.getAttribute('disabled')=='true'){
    return
  }
  emit('getPageon',page)
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  height: 40px;
  justify-content: space-evenly;
  li {
    flex-grow: 1;
    list-style: none;
    width: 40px;
    background-color: aliceblue;
    border: 1px solid #ccc;
    line-height: 40px;
    margin-left: 10px;
  }
  .pre,.next,.total {
    width: 80px;
  }
  .active {
    background-color: #008c8c;
  }
}

</style>