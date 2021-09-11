<template>
  <div>
    <h1>{{ msg }}</h1>
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
      msg.value = 'hello, world8'
    }
    return {msg, handleClick}
  }
})
</script>
<style lang="less" scoped>
.my-scope {
  transform: translate(7px, 8px);
  margin: 20px 20px 20px 20px;
}
</style>
