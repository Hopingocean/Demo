<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftNav from './components/common/leftNav'
export default {
  name: 'App',
  components: {
    leftNav
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  max-height: 100%;
}
html, body, ul, li, p, dl, dt, dd {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  width: 90%;
  height: 100%;
  float: right;
}
</style>
