<template>
  <div>
    <h1 class="title">{{ msg }}</h1>
    <button @click="handleClick">点击切换</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const msg = ref('hello')
    const handleClick = () => {
      msg.value = 'hello, world'
    }
    return {msg, handleClick}
  }
})
</script>
