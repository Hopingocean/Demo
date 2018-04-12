<template>
  <div id="game__container" class="game__container">
    <!-- PC端拖动时使用透明遮挡层遮盖iframe使拖动流畅 -->
    <div class="iframe--cover"></div>
    <div class="icon--float">集结号</div>
    <div class="sideslip flex">
      <div class="sideslip__page"></div>
      <div class="sideslip__menu" @click.self="closeSideslip($event)">
        <div class="btn__close flex flex-v" @click="closeSideslip($event)">
          <i class="iconfont">&#xe60c;</i>
          <span>关闭</span>
        </div>
        <div class="btn__refresh flex flex-v">
          <i class="iconfont">&#xe607;</i>
          <span>刷新</span>
        </div>
      </div>
    </div>
    <iframe class="game--url" :src="gameUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
import draggabilly from 'draggabilly'

import common from '@/assets/js/common.js'
export default {
  name: 'Game',
  data() {
    return{
      gameUrl: '',
      gameId: '',
    }
  },
  methods: {
    initDrag() {
      var drag = new draggabilly('.icon--float', {
        containment: '.game__container'
      })
      // drag start
      drag.on('dragStart', function(event, pointer) {
        event.target.previousElementSibling.style.left = '0';
      })
      // drag move
      drag.on('dragMove', function(event, pointer, moveVector) {

      })
      // drag end
      drag.on('dragEnd', function(event, pointer) {
        event.target.previousElementSibling.style.left = '-100%';
        var clientWidth = document.body.clientWidth - 30;
        drag.setPosition(clientWidth);
      })
      // staticClick
      drag.on('staticClick', function(event, pointer) {
        event.target.nextElementSibling.style.left = '0';
      })
    },
    closeSideslip(event) {
      if (event.target.className == 'sideslip__menu') {
        event.target.parentNode.style.left = '-100%';
        return;
      }
      event.target.parentNode.parentNode.parentNode.style.left = '-100%';
    },
    // 监听resize事件
    resizeWindow() {
      var resizeTimer = null;
      window.addEventListener('resize', function () {
        if (resizeTimer) {
          clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(function () {
          var clientWidth = document.body.clientWidth - 30 + 'px';
          document.getElementsByClassName('icon--float')[0].style.left = clientWidth;
        }, 500)
      }, false)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.gameId = common.getUrlKey('gameId');
      this.gameUrl = '/by/' + this.gameId;
      // 初始化拖曳按钮
      this.initDrag();
      this.resizeWindow();
    })
  }
}
</script>

<style scoped>
.game__container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}
.iframe--cover {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.icon--float {
  position: fixed;
  z-index: 999;
  left: calc(100% - 40px);
  top: 100px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: blueviolet;
  color: #fff;
  line-height: 80px;
  text-align: center;
}
.sideslip {
  position: fixed;
  left: -100%;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
}
.sideslip .sideslip__page {
  width: 86%;
  height: 100%;
  background-color: #fff;
}
.sideslip .sideslip__menu {
  width: 14%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, .9);
}
.sideslip .sideslip__menu div {
  position: relative;
  top: 50%;
  margin-bottom: 40px;
  color: #fff;
}
.sideslip .sideslip__menu div i {
  color: #fff;
}
</style>
