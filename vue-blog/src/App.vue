<template>
  <div id="app">
    <header-bar></header-bar>
    <sidebar></sidebar>
    <about></about>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Sidebar from './components/frontEnd/Sidebar'
import About from './components/frontEnd/About'
import HeaderBar from './components/frontEnd/Header'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    Sidebar,
    About,
    HeaderBar
  },
  methods: {}
}
</script>

<style>
html, body, h1, h2, h3, h4, h5, h6, div, dl, dt, dd, ul, ol, li, p, blockquote, pre, hr, figure, table, caption, th, td, form, fieldset, legend, input, button, textarea, menu {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}
html, body {
  height: 100%;
  max-height: 100%;
}
#app {
  height: 100%;
}
ul, li {
  list-style: none;
}
.content {
  float: right;
  padding: 20px 20px;
  margin: 0 auto;
  box-sizing: border-box;
}
@media screen and (min-width: 1024px) {
  .header {
    width: calc(100% - 250px);
    display: none;
  }
  .sidebar {
    width: 250px;
    height: 100%;
  }
  .content {
    width: calc(100% - 250px);
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .header{
    display: none;
  }
  .sidebar {
    width: 75px;
    height: 100%;
  }
  .content {
    width: calc(100% - 75px);
  }
  .sidebar .font--title {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .header[data-behavior='1'] {
    width: 100%;
    display: block;
  }
  .header[data-behavior='2'] {
    width: calc(100% - 200px);
    display: block;
    float: right;
  }
  .sidebar[data-behavior='1'] {
    display: none;
  }
  .sidebar[data-behavior='2'] {
    display: block;
    height: 100%;
  }
  .content[data-behavior='1'] {
    width: 100%;
  }
  .content[data-behavior='2'] {
    width: calc(100% - 200px);
    overflow: hidden;
  }
}
/* router-view 过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

