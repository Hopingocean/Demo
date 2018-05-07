<template>
  <div id="game__container" class="game__container">
    <iframe class="game--url" :src="gameUrl" frameborder="0" width="100%" height="100%"></iframe>
    <!-- PC端拖动时使用透明遮挡层遮盖iframe使拖动流畅 -->
    <div class="iframe--cover"></div>
    <!-- <img class="icon--float" :src="logo" alt="logo"> -->
    <div class="sideslip flex">
      <div class="sideslip__page">
        <!-- 用户信息 -->
        <div class="userinfo flex flex-y-center">
          <img :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="icon">
          <div class="userinfo--id flex flex-v flex-list">
            <span>{{ userinfo.username }}</span>
            <span>UID:{{ userinfo.uid }}</span>
          </div>
          <div class="userinfo--money flex flex-v">
            <span>余额</span>
            <span>{{userinfo.money? userinfo.money : 0}}</span>
          </div>
        </div>
        <!-- 菜单列表 -->
        <div class="menu">
          <ul class="flex">
            <li class="flex flex-v">
              <router-link class="active flex flex-v" to="/gift">
                <!-- <i class="iconfont">&#xe653;</i> -->
                <img :src="this.$route.name == 'Gift' ? iconGift1 : iconGift0" alt="icon">
                <span>礼包</span>
              </router-link>
            </li>
            <li class="flex flex-v">
              <a class="flex flex-v flex-list" :href=" 'index.html?agentId=' + agentId">
                <!-- <i class="iconfont">&#xe60a;</i> -->
                <img :src="this.$route.name == 'News' ? iconInfo1 : iconInfo0" alt="icon">
                <span>资讯</span>
              </a>
            </li>
            <li class="flex flex-v">
              <a class="flex flex-v flex-list" :href=" 'index.html?agentId=' + agentId">
                <!-- <i class="iconfont">&#xe67e;</i> -->
                <img :src="this.$route.name == 'MoreGame' ? iconGame1 : iconGame0" alt="icon">
                <span>更多游戏</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 内容 -->
        <router-view></router-view>
        <!-- 切换账号 -->
        <button class="btn--logout" @click="showDialog('dialog__login')">切换账号</button>
      </div>
      <div class="sideslip__menu" @click.self="closeSideslip($event)">
        <div class="btn__close flex flex-v" @click="closeSideslip($event)">
          <img :src="iconClose" alt="icon">
          <span>关闭</span>
        </div>
        <div class="btn__refresh flex flex-v" @click="refresh($event)">
          <img :src="iconRefresh" alt="icon">
          <span>刷新</span>
        </div>
        <div class="btn__custom flex flex-v">
          <img :src="iconCustom" alt="icon">
          <span>客服</span>
        </div>
      </div>
    </div>
    <!-- 退出弹框 -->
    <div id="quitBox" v-show="boxStatus" @click.self="hideBox">
      <div class="box__content">
        <div class="game--banner">
          <img src="" alt="banner">
        </div>
        <div class="btn--leave">
          <a :href=" 'index.html?agentId=' + agentId ">离开游戏</a>
        </div>
        <div class="checkbox--tip">
          <input id="tip" type="checkbox" v-model="checked">
          <label for="tip">今日不再提示</label>
        </div>
      </div>
    </div>
    <login :is-hide="isHide"></login>
  </div>
</template>

<script>
import Login from '@/components/Login'

import draggabilly from 'draggabilly'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconUser from '@/assets/images/common/icon_user_1.png'
import logo from '@/assets/images/game/logo.png'
import iconInfo1 from '@/assets/images/game/icon_info_1.png'
import iconInfo0 from '@/assets/images/game/icon_info_0.png'
import iconGame1 from '@/assets/images/common/icon_game_1.png'
import iconGame0 from '@/assets/images/common/icon_game_0.png'
import iconGift1 from '@/assets/images/common/icon_gift_1.png'
import iconGift0 from '@/assets/images/common/icon_gift_0.png'

import iconClose from '@/assets/images/game/icon_close.png'
import iconRefresh from '@/assets/images/game/icon_refresh.png'
import iconCustom from '@/assets/images/game/icon_custom.png'
export default {
  name: 'Game',
  components: { Login },
  data() {
    return{
      agentId: '',
      gameUrl: '',
      gameId: '',
      userinfo: '',
      
      loginStatus: false,
      isHide: false,
      boxStatus: false,
      checked: false,
      // icon
      logo: logo,
      iconUser: iconUser,
      iconInfo1: iconInfo1,
      iconInfo0: iconInfo0,
      iconGift1: iconGift1,
      iconGift0: iconGift0,
      iconGame1: iconGame1,
      iconGame0: iconGame0,
      iconClose: iconClose,
      iconRefresh: iconRefresh,
      iconCustom: iconCustom
    }
  },
  methods: {
    initDrag() {
      const that = this;
      const drag = new draggabilly('.icon--float', {
        containment: '.game__container'
      })
      // drag start
      drag.on('dragStart', function(event, pointer) {
        event.target.previousElementSibling.style.left = '0';
      })
      // drag move
      drag.on('dragMove', function(event, pointer, moveVector) { })
      // drag end
      drag.on('dragEnd', function(event, pointer) {
        event.target.previousElementSibling.style.left = '-100%';
        const clientWidth = document.body.clientWidth - 50;
        drag.setPosition(clientWidth);
      })
      // pointUp
      drag.on('pointUp', function(event, pointer) { })
      // staticClick
      drag.on('staticClick', function(event, pointer) {
        console.log(event);
        event.target.nextElementSibling.className = event.target.nextElementSibling.className ? event.target.nextElementSibling.className + ' ' + 'fadeInLeft' : 'fadeInLeft';
        const btn = document.getElementsByClassName('btn--logout')[0];
        btn.className = btn.className ? btn.className + ' ' + 'fadeInLeft' : 'fadeInLeft';
        // 获取用户信息
        that.getUserinfo();
        // 判断当前激活路由
        if (that.$route.name == 'Gift') {
          that.$router.push('gift');
        }
      })
    },
    closeSideslip(event) {
      if (event.target.className == 'sideslip__menu') {
        event.target.parentNode.setAttribute('class', 'sideslip flex');
        const btn = document.getElementsByClassName('btn--logout')[0];
        btn.className =  'btn--logout';
        return;
      }
      event.target.parentNode.parentNode.parentNode.setAttribute('class', 'sideslip flex');
      const btn = document.getElementsByClassName('btn--logout')[0];
      btn.className =  'btn--logout';
    },
    // 监听resize事件
    resizeWindow() {
      let resizeTimer = null;
      window.addEventListener('resize', function () {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function () {
          const clientWidth = document.body.clientWidth - 50 + 'px';
          document.getElementsByClassName('icon--float')[0].style.left = clientWidth;
        }, 500)
      }, false)
    },
    // 显示登陆窗口
    showDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'block';
    },
    getUserinfo() {
      const that = this;
      const options = {
          type: 'get',
          url: Request.url.userinfo,
          data: {},
          success: function (data) {
              if (data.status) {
                  that.loginStatus = true;
                  that.userinfo = data.data;
              } else {
                  that.loginStatus = false;
                  that.showDialog('dialog__login');
              }
          },
          error: function (error) {
              that.loginStatus = false;
          }
      }
      Request.ajax(options);
    },
    // 请求游戏地址
    getGameUrl() {
      const that = this;
      const options = {
          type: 'get',
          url: Request.url.gameUrl + that.gameId,
          data: {},
          success: function (data) {
              if (data.status) {
                  that.gameUrl = data.data.url;
              }
          },
          error: function (error) {
          }
      }
      Request.ajax(options);
    },
    // 拦截浏览器退出动作
    intercept() {
      const that = this;
      const interceptBox = document.getElementById('quitBox');
      window.addEventListener('load', function () {
        const title = document.title;
        const path = location.href.replace(/#.*$/, '');
        // 添加并激活一个历史记录条目
        window.history.pushState({
          title: title,
          url: path
        }, title, path);
      })
      window.addEventListener('popstate', function (e) {
        console.log(e);
        that.boxStatus = true;
      })
    },
    // 隐藏退出弹框
    hideBox() {
      this.boxStatus = false;
    },
    // 刷新
    refresh(event) {
      event.target.className = event.target.className ? event.target.className + ' ' + 'rotate' : 'rotate';
      setTimeout(function (e) {
        window.location.reload();
      }, 1000)
    }
  },
  created() {
    this.gameId = CommonMethods.getUrlKey('gameId');
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getUserinfo();
      this.getGameUrl();
      // 初始化拖曳按钮
      // this.initDrag();
      // this.resizeWindow();
      // 初始化拦截器
      // this.intercept();
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
  box-sizing: border-box;
  padding: 14px 15px;
  position: fixed;
  z-index: 99;
  left: calc(100% - 40px);
  top: 100px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: #fff;
  line-height: 80px;
  text-align: center;
  border: 2px solid rgba(211, 211, 211, 0.8);
  background-color: rgba(224, 224, 224, 0.8);
}
/* 侧滑页面 */
.sideslip {
  position: fixed;
  left: -100%;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}
/* 显示动画 */
.fadeInLeft {
  animation-name: fadeInOut;
  animation-duration: .6s;
  animation-timing-function: ease;
  animation-fill-mode:forwards;
  -webkit-animation: fadeInOut .6s forwards ease;
}
@keyframes fadeInOut {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
@-webkit-keyframes fadeInOut {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
.sideslip .sideslip__page {
  width: 86%;
  height: 100%;
  overflow: scroll;
  background-color: #fff;
}
.sideslip__page .userinfo img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
}
.sideslip__page .userinfo {
  padding: 40px;
}
.userinfo .userinfo--id {
  box-sizing: border-box;
  padding-left: 24px;
  overflow: hidden;
}
.userinfo .userinfo--id span:first-child {
  padding-bottom: 20px;
  font-size: 32px; /* px */
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userinfo .userinfo--id span:last-child {
  font-size: 28px; /* px */
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userinfo .userinfo--money {
  box-sizing: border-box;
  padding-left: 24px;
  text-align: right;
}
.userinfo .userinfo--money span:first-child {
  padding-bottom: 20px;
  font-size: 28px; /* px */
  color: #111;
}
.userinfo .userinfo--money span:last-child {
  font-size: 28px; /* px */
  color: #999;
}
/* btn */
.sideslip__page .menu {
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
}
.sideslip__page .menu ul .router-link-active {
  color: #ff9c00;
}
.sideslip__page .menu ul li {
  box-sizing: border-box;
  padding: 36px;
  text-align: center;
}
.sideslip__page .menu ul li a {
    box-sizing: border-box;
    font-size: 28px; /* px */
    color: #111;
}
.sideslip__page .menu ul li img {
  width: 60px;
  height: auto;
  margin: 0 auto;
  padding-bottom: 16px;
}
.sideslip .sideslip__menu {
  width: 14%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, .7);
}
.sideslip .sideslip__menu div {
  position: relative;
  top: 20%;
  margin-bottom: 60px;
  font-size: 28px; /* px */
  color: #fff;
}
.sideslip .sideslip__menu div img {
  width: 80px;
  height: 80px;
  margin: auto auto 10px auto;
}
/* 旋转动画 */
.btn__refresh img.rotate {
  -webkit-animation: rotate 1s ease;
  animation: rotate 1s ease;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
    -webkit-transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  0% {
    transform: rotate(0);
    -webkit-transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
/* 切换账号 */
.btn--logout {
  position: fixed;
  left: -176%;
  right: 0;
  bottom: 40px;
  width: 76%;
  margin: 0 auto;
  font-size: 32px; /* px */
  color: #fefefe;
  line-height: 76px;
  background-color: #ff9c00;
  border-radius: 8px;
  border: none;
}
.btn--logout.fadeInLeft {
  animation-name: fadeInLeft;
  animation-duration: .6s;
  animation-timing-function: ease;
  animation-fill-mode:forwards;
  -webkit-animation: fadeInLeft .6s forwards ease;
}
@keyframes fadeInLeft {
  0% {
    left: -176%;
  }
  100% {
    left: -14%;
  }
}
@-webkit-keyframes fadeInLeft {
  0% {
    left: -176%;
  }
  100% {
    left: -14%;
  }
}
/* 退出弹框 */
#quitBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, .3);
}
#quitBox .box__content {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 99999;
  background-color: #fff;
  text-align: center;
}
.box__content .game--banner {
  width: 100%;
  height: 267px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
.box__content .btn--leave {
  padding: 40px 0 20px 0;
}
#quitBox .btn--leave a {
  font-size: 32px; /* px */
  color: #fff;
  background: #ff9c00;
  padding: 23px 58px;
  border-radius: 8px;
}
.box__content .checkbox--tip {
  padding: 28px 0;
  color: #999;
  font-size: 24px;
}
/* 自定义单选框样式 */
.box__content .checkbox--tip input {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
.box__content input[type="checkbox"] + label::before {
    content: "";  /*不换行空格*/
    display: inline-block;
    vertical-align: sub;
    width: 30px;
    height: 30px;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid #999;
    line-height: .65;  /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
}
.box__content input[type="checkbox"]:checked + label::before {
    content: "";
    background-color: #ff9c00;
}
</style>
