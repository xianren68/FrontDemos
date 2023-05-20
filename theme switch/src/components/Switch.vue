<!-- switch组件,用于修改全局主题 -->
<template>
    <div class="switch" :class="{ 'switch--on': value, 'switch--off': !value }" @click="toggle">
        <div class="switch__handle"></div>
    </div>
</template>
  
<script setup lang="ts">
import useTheme from '../utils/theme'
import {computed} from 'vue'
const theme = useTheme()
const value = computed(()=>theme.value==='light'?false:true)
const toggle = ()=>{
    theme.value = value.value?'light':'dark'
}
</script>
  
<style scoped>
.switch {
    display: inline-block;
    width: 50px;
    height: 20px;
    border-radius: 10px;
    background-color: #dcdcdc;
    transition: background-color 0.25s ease-in-out;
}

.switch--on {
    background-color: #5cb85c;
}

.switch--off {
    background-color: #dcdcdc;
}

.switch__handle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    transition: transform 0.25s ease-in-out;
    transform: translateX(2px);
}

.switch--on .switch__handle {
    transform: translateX(30px);
}

.switch--off .switch__handle {
    transform: translateX(2px);
}
</style>