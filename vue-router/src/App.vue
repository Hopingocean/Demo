<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link> |
      <router-link :to="{ name: 'Page1', params: { id: '888'} }">Page1</router-link> |
      <router-link to="/page2">Page2</router-link> |
      <router-link to="/page3/888/Lee">Page3</router-link> |
      <router-link to="/goHome">goHome</router-link> |
      <router-link to="/goPage3/666/Lee12589">goPage3</router-link> |
      <router-link to="/goPage2">goPage2</router-link>
      <button @click="goBack">后退</button>
      <button @click="goTo">前进</button>
    </div>
    <!-- name传参 -->
    <!-- <p>{{ $route.name }}</p> -->
    <transition>
      <router-view/>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view name="left"></router-view>
    </transition>
    <transition name="slide">
      <router-view name="right"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // 编程式导航
    goBack() {
      this.$router.go(-1);
    },
    goTo() {
      // this.$router.push({name:'Page3', params: {userId: 666, userName: 'Lee'}});
      this.$router.push({path:'page2', query: {userId: 666, userName: 'Lee'}});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page2 {
  width: 50%;
  line-height: 100px;
  float: right;
  background-color: red;
}
.page1 {
  width: 50%;
  line-height: 100px;
  float: left;
  background-color: green;
}
/* fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
