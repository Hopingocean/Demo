<template>
  <div id="game__container" class="game__container">
    <iframe class="game--url" :src="gameUrl" frameborder="0" width="100%" height="100%"></iframe>
    <!-- PC端拖动时使用透明遮挡层遮盖iframe使拖动流畅 -->
    <div class="iframe--cover"></div>
    <div class="icon--float">集结号</div>
    <div class="sideslip flex">
      <div class="sideslip__page">
        <!-- 用户信息 -->
        <div class="userinfo flex flex-y-center">
          <img src="https://img02.jjhgame.com/game1511/images/down/gicon-fish.jpg" alt="icon">
          <div class="userinfo--id flex flex-v flex-grow-2">
            <span>id</span>
            <span>123456</span>
          </div>
          <div class="flex flex-x-between flex-grow-1 btn--group">
            <a href="javascript:void(0);" class="btn">实名认证</a>
            <a href="javascript:void(0);" class="btn">客服</a>
            <a href="javascript:void(0);" class="btn" @click="showLogin">切换账号</a>
          </div>
        </div>
        <!-- 菜单列表 -->
        <div class="menu">
          <ul class="flex">
            <li class="flex flex-v flex-list">
              <router-link class="active flex flex-v" to="/gift">
                <i class="iconfont">&#xe653;</i>
                <span>礼包</span>
              </router-link>
            </li>
            <li class="flex flex-v flex-list">
              <router-link class="flex flex-v flex-list" to="/news">
                <i class="iconfont">&#xe60a;</i>
                <span>资讯</span>
              </router-link>
            </li>
            <li class="flex flex-v flex-list">
              <router-link class="flex flex-v flex-list" to="/vip">
                <i class="iconfont">&#xe6ba;</i>
                <span>VIP</span>
              </router-link>
            </li>
            <li class="flex flex-v flex-list">
              <router-link class="flex flex-v flex-list" to="/moregame">
                <i class="iconfont">&#xe67e;</i>
                <span>更多游戏</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 内容 -->
        <router-view></router-view>
      </div>
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
    <login
      @listen-hide-status="getHideStatus"
      :is-hide="isHide"></login>
  </div>
</template>

<script>
import Login from '@/components/Login'

import draggabilly from 'draggabilly'

import common from '@/assets/js/common.js'
export default {
  name: 'Game',
  components: { Login },
  data() {
    return{
      gameUrl: '',
      gameId: '',
      loginStatus: false,
      isHide: true
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
    },
    // 监听登陆框状态
    getHideStatus(status) {
      this.isHide = status;
    },
    // 显示登陆窗口
    showLogin() {
      this.isHide = false;
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.gameId = common.getUrlKey('gameId');
      this.gameUrl = '/by/' + this.gameId;
      // 初始化拖曳按钮
      this.initDrag();
      this.resizeWindow();
      // 判断当前激活路由
      if (this.$route.name == 'Gift') {
        this.$router.push('gift');
      }
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
.sideslip__page .userinfo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.sideslip__page .userinfo {
  padding: 20px;
  height: 100px;
}
.userinfo .userinfo--id {
  box-sizing: border-box;
  padding: 0 20px;
}
.sideslip__page .userinfo .btn--group .btn {
  
}
.sideslip__page .menu {
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
}
.sideslip__page .menu ul .router-link-active {
  background-color: #eee;
}
.sideslip__page .menu ul li {
  text-align: center;
}
.sideslip__page .menu ul li a {
    box-sizing: border-box;
    padding: 20px 0;
}
.sideslip__page .menu ul li i {
  font-size: 48px;
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
