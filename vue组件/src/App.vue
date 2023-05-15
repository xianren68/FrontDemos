
<template>
    <pagination :total="50" :pageNum="5" :onPage="onPage" :continues="5" @getPageon="getPageon"></pagination>
</template>
<script setup>
import pagination from './components/pagination.vue'
import {ref} from 'vue'
const onPage = ref(1)
// 获取当前页码的自定义事件
const getPageon = (data)=>{
  onPage.value = data
}
</script>
<style scoped>
</style>
