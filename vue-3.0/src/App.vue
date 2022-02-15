<template>
  <div id="app">
    <AppCom v-model.capitalize="myText"></AppCom>
    {{myText}}
  </div>
</template>

<script>
import AppCom from '@/views/components/ComA.vue'

export default {
  name: 'App',
  components: {
    AppCom
  },
  data () {
    return {
      myText: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
