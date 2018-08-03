<template>
  <div id="game__container" class="game__container">
    <!-- loading -->
    <div class="loading">
      <img class="loading__bg" :src="loadingBg">
      <img class="loading__logo" :src="loadingLogo">
      <img class="loading__tip" :src="loadingTip">
      <!-- <span class="loading__font1">正在加载...</span> -->
      <span class="loading__font2">
        进入游戏表示您已阅读并同意
        <br>
        本公司在“游戏中心”的用户条例
      </span>
    </div>
    <!-- 游戏未加载之前显示游戏banner -->
    <img class="bgImage" :src="gameInfo.bg_image">
    <iframe id="game_iframe" class="game--url iframe__game" :src="gameUrl" frameborder="0" name="game_frame" width="100%" height="100%"></iframe>
    <!-- PC端拖动时使用透明遮挡层遮盖iframe使拖动流畅 -->
    <div class="iframe--cover"></div>
    <img class="icon--float" :src="logo" alt="logo">
    <div class="sideslip flex">
      <div class="sideslip__page">
        <!-- 用户信息 -->
        <div class="userinfo flex flex-y-center">
          <img :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="icon">
          <div class="userinfo--id flex flex-v flex-list">
            <span>{{ userinfo.nickname ? userinfo.nickname : userinfo.username }}</span>
            <span>UID:{{ userinfo.uid }}</span>
          </div>
          <!-- <div class="userinfo--money flex flex-v">
            <span>余额</span>
            <span>{{userinfo.money? userinfo.money : 0}}</span>
          </div> -->
        </div>
        <!-- 菜单列表 -->
        <div class="menu">
          <ul class="flex">
            <li class="flex flex-v">
              <router-link class="active flex flex-v" to="/gift" replace>
                <img :src="this.$route.name == 'Gift' ? iconGift1 : iconGift0" alt="icon">
                <span>礼包</span>
              </router-link>
            </li>
            <li class="flex flex-v">
              <router-link class="flex flex-v flex-list" to="/news" replace>
                <img :src="this.$route.name == 'News' ? iconInfo1 : iconInfo0" alt="icon">
                <span>关注公众号</span>
              </router-link>
            </li>
            <li class="flex flex-v">
              <a class="flex flex-v flex-list" :href=" 'index.html?agentId=' + agentId">
                <img :src="this.$route.name == 'MoreGame' ? iconGame1 : iconGame0" alt="icon">
                <span>更多游戏</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 内容 -->
        <router-view></router-view>
        <!-- 切换账号 -->
        <button class="btn--logout" @click="switchAccount('dialog__login')">切换账号</button>
      </div>
      <div class="sideslip__menu" @click.self="closeSideslip($event)">
        <div class="btn__close flex flex-v">
          <img :src="iconClose" alt="icon" @click="closeSideslip($event)">
          <p @click="closeSideslip($event)">关闭</p>
        </div>
        <div class="btn__refresh flex flex-v" @click="refresh($event)">
          <img :src="iconRefresh" alt="icon">
          <p>刷新</p>
        </div>
        <div class="btn__custom flex flex-v" @click="custom">
          <img :src="iconCustom" alt="icon">
          <p>客服</p>
        </div>
      </div>
    </div>
    <!-- 退出弹框 -->
    <div id="quitBox" v-show="boxStatus" @click.self="hideBox">
      <div class="box__content">
        <div class="game--banner">
          <a v-if="ads && ads.skip_type == 1" :href="ads.url">
            <img :src="ads.image" alt="banner">
          </a>
          <a v-if="ads && ads.skip_type == 2" :href="'game.html?gameId=' + ads.app_id + '&agentId=' + agentId">
            <img :src="ads.image" alt="banner">
          </a>
          <a v-if="ads && ads.skip_type == 3" href="javascript:void(0);">
            <img :src="ads.image" alt="banner">
          </a>
        </div>
        <div class="btn--leave">
          <a href="javascript:void(0);" @click="leave">离开游戏</a>
        </div>
        <p class="font--tip">微信搜索集结号微游，关注不迷路</p>
        <div class="checkbox--tip">
          <input id="tip" type="checkbox" v-model="checked">
          <label for="tip">今日不再提示</label>
        </div>
      </div>
    </div>
    <login :is-hide="isHide"></login>
    <bind-phone :userinfo="userinfo" :refresh-bind-code="refreshBindCode"></bind-phone>
  </div>
</template>

<script>
import Login from '@/components/Login'
import BindPhone from '@/components/user/BindPhone'

import draggabilly from 'draggabilly'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import loadingBg from '@/assets/images/common/bg.png'
import loadingLogo from '@/assets/images/common/loading_logo.png'
import loadingTip from '@/assets/images/common/loading_tip.png'

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
  components: { Login, BindPhone },
  data() {
    return{
      pUserId: '',
      agentId: '',
      gameInfo: '',
      gameUrl: '',
      gameId: '',
      userinfo: {},
      ads: '',
      
      loginStatus: false,
      isHide: false,
      boxStatus: false,
      checked: false,
      refreshBindCode: false, // 通知绑定手机号组件请求图片验证码
      // icon
      loadingBg: loadingBg,
      loadingLogo: loadingLogo,
      loadingTip: loadingTip,
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
  watch: {},
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
        const width = document.getElementsByClassName('icon--float')[0].offsetWidth;
        const clientWidth = document.body.clientWidth - width * 0.75;
        drag.setPosition(clientWidth);
      })
      // pointUp
      drag.on('pointUp', function(event, pointer) {})
      // staticClick
      drag.on('staticClick', function(event, pointer) {
        event.target.nextElementSibling.className = event.target.nextElementSibling.className ? event.target.nextElementSibling.className + ' ' + 'fadeInLeft' : 'fadeInLeft';
        const btn = document.getElementsByClassName('btn--logout')[0];
        btn.className = btn.className ? btn.className + ' ' + 'fadeInLeft' : 'fadeInLeft';
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
          const width = document.getElementsByClassName('icon--float')[0].offsetWidth;
          const clientWidth = document.body.clientWidth - width * 0.75;
          document.getElementsByClassName('icon--float')[0].style.left = clientWidth;
        }, 500)
      }, false)
    },
    // 显示登陆窗口
    showDialog(el) {
      if (el == 'bindPhone') {
        this.refreshBindCode = true;
      }
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'block';
    },
    // 切换账号
    switchAccount(el) {
      this.isHide = true;
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
            that.getGameDetail();
            that.statistics();
            that.isBindPhone();
          } else {
            that.statistics();
            that.getGameDetail();
            that.showDialog('dialog__login');
          }
        },
        error: function (error) {
          that.getGameDetail();
          that.statistics();
        }
      }
      Request.ajax(options);
    },
    // 判断是否需要绑定手机号
    isBindPhone() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.isBindPhone,
        data: {
          app_id: that.gameId
        },
        success: function (data) {
          if (data.status) {
            if (data.data.need_mobile) {
              // 制定游戏绑定手机号，弹出绑定手机号弹框
              that.showDialog('bindPhone');
            } else {
              that.getGameUrl();
            }
          } else {
            that.showDialog('dialog__login');
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 请求游戏地址
    getGameUrl() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.gameUrl + that.gameId,
        data: {
          agent_id: that.agentId,
          puid: that.pUserId
        },
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
    getGameDetail() {
      var that = this;
      var options = {
          type: 'get',
          url: Request.url.gameDetail,
          data: {
            id: that.gameId,
          },
          success: function (data) {
            if (data.status) {
              that.gameInfo = data.data;
              // 初始化meta信息
              document.title = data.data.name;
              document.getElementsByTagName('meta')['description'].content = data.data.desc;
              document.getElementsByTagName('meta')['name'].content = data.data.name;
              document.getElementsByTagName('meta')['image'].content = data.data.icon;

              // 初始化微信分享
              const username = that.userinfo.username ? that.userinfo.username : '';
              const link = CommonMethods.changeUrlKeyVal('puid', username);
              const shareInfo = {
                title: data.data.name,
                desc: data.data.desc,
                imgUrl: data.data.icon,
                link: link
              }
              if (wxApi.isWeChat()) {
                wxApi.wxInit(shareInfo);
              }
            }
          },
          error: function (error) {}
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
        const now = Date.parse(new Date()) / 1000;
        const t = localStorage.getItem('box_hide');
        if (now < t) {
          history.go(-1);
          return;
        }
        // 循环显示弹框
        const title = document.title;
        const path = location.href.replace(/#.*$/, '');
        window.history.pushState({
          title: title,
          url: path
        }, title, path);
        that.getAds();
        that.boxStatus = true;
      })
    },
    // 隐藏退出弹框
    hideBox() {
      this.boxStatus = false;
    },
    // 获取弹框广告图
    getAds() {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.adList,
        data: {
          type: 5, // 1,首页轮播图；2,搜索页文字；3,搜索页轮播图；4,首页文字；5,游戏弹框
        },
        success: function (data) {
          if (data.code == 'success') {
            that.ads = data.data.data[0];
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 刷新
    refresh(event) {
      event.target.className = event.target.className ? event.target.className + ' ' + 'rotate' : 'rotate';
      setTimeout(function (e) {
        window.location.reload();
      }, 1000)
    },
    // 客服
    custom() {
      window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf', '_blank');
    },
    // 游戏是否加载完毕
    gameLoading() {
      const that = this;
      const iframe = document.getElementsByClassName('iframe__game')[0];
      const isIE = /msie/i.test(navigator.userAgent) && !window.opera;
      const isPC = window.innerWidth > window.innerHeight;
      document.getElementsByClassName('bgImage')[0].setAttribute('class', isPC ? 'bgImage pc hide' : 'bgImage');
      document.getElementsByClassName('loading')[0].setAttribute('class', isPC ? 'loading pc' : 'loading hide');
      if (isIE) {
        iframe.onreadystatechange = function () {
          if (iframe.readyState == "loaded" || iframe.readyState == "complete") {
            if (that.gameUrl) {
              document.getElementsByClassName('bgImage')[0].setAttribute('class', 'hide');
              document.getElementsByClassName('loading')[0].setAttribute('class', 'hide');
              // 判断是否为捕鱼游戏
              if (that.gameId == '100240') {
                that.sendMsgToIframe();
              }
            }
          }
        };
      } else {
        iframe.onload = function () {
          if (that.gameUrl) {
            document.getElementsByClassName('bgImage')[0].setAttribute('class', 'hide');
            document.getElementsByClassName('loading')[0].setAttribute('class', 'hide');
            // 判断是否为捕鱼游戏
            if (that.gameId == '100240') {
              that.sendMsgToIframe();
            }
          }
        };
      }
    },
    // 针对捕鱼游戏进行popstate
    sendMsgToIframe() {
      const state = {
        title: "集结号捕鱼H5",
        url: location.href.replace(/#.*$/, '')
      };
      window.history.pushState(state, state.title, state.url);
      window.addEventListener("popstate", function(e) {  // popstate监听返回按钮
        var iframe = window.frames['game_frame'];
        if (iframe) {
          window.history.pushState(state, state.title, state.url);
          iframe.postMessage('exit_game', 'https://cdn-byh5.jjhgame.com');
        }
      }, false);
    },
    // 接收游戏内信息
    goHome() {
      window.addEventListener('message', function (event) {
        if (event.data !='close') {
          return;
        }
        window.location.href = 'index.html?agentId=' + (this.agentId ? this.agentId : '');
      });
    },
    // 统计用户信息
    statistics() {
      const that = this;
      const options = {
        type: 'post',
        url: Request.url.statistics,
        data: {
          member_id: that.userinfo.uid,
          app_id: that.gameId,
          agent_id: that.agentId,
          url: window.location.href.split('#')[0],
          type: 1,
          remark: ''
        },
        success: function (data) {},
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 离开游戏
    leave() {
      if (this.checked) {
        // 一天86400秒
        const today = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
        const tomorrow = today + 86400;
        // localStorage
        localStorage.setItem('box_hide', tomorrow);
      } else {
        localStorage.removeItem('box_hide');
      }
      window.location.href = 'index.html?agentId=' + this.agentId;
    }
  },
  created() {
    this.gameId = CommonMethods.getUrlKey('gameId');
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
    this.pUserId = CommonMethods.getUrlKey('puid') ? CommonMethods.getUrlKey('puid') : '';
  },
  mounted () {
    this.getUserinfo();
    this.gameLoading();

    // 接收游戏内信息并返回首页
    this.goHome();

    // 初始化拖曳按钮
    this.initDrag();
    this.resizeWindow();
    // 初始化拦截器（捕鱼不拦截）
    if (this.gameId != '100240') {
      this.intercept();
    }

    GameYawy = new GameYawy();
  }
}
</script>

<style scoped>
.hide {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.loading .loading__bg {
  width: 100%;
  height: 100%;
}
.loading .loading__logo {
  position: absolute;
  top: 200px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80%;
  height: auto;
}
.loading.pc .loading__logo {
  position: absolute;
  top: 200px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 500px; /* no */
  height: auto;
}
.loading .loading__tip {
  position: absolute;
  top: 500px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 60%;
  height: auto;
}
.loading.pc .loading__tip {
  position: absolute;
  top: 500px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 400px; /* no */
  height: auto;
}
.loading .loading__font1 {
  position: absolute;
  top: 630px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 28px; /* px */
  color: #fff;
  text-align: center;
}
.loading .loading__font2 {
  position: absolute;
  bottom: 35px; /* no */
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 28px; /* px */
  color: #fff;
  text-align: center;
}
.bgImage {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.bgImage.pc {
  max-width: none;
}
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
  padding: 15px;
  position: fixed;
  z-index: 999;
  left: calc(100% - 60px);
  top: 20%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: #fff;
  line-height: 80px;
  text-align: center;
  border: 1px solid rgba(211, 211, 211, 0.8); /* no */
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
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
}
.sideslip__page .userinfo img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
}
.sideslip__page .userinfo {
  padding: 20px 40px;
}
.userinfo .userinfo--id {
  box-sizing: border-box;
  padding-left: 24px;
  overflow: hidden;
}
.userinfo .userinfo--id span:first-child {
  padding: 8px 0;
  font-size: 32px; /* px */
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userinfo .userinfo--id span:last-child {
  padding: 8px 0;
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
  padding: 20px 36px;
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
}
.sideslip .sideslip__menu {
  width: 14%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, .8);
}
.sideslip .sideslip__menu .btn__close {
  position: relative;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 0 60px 0;
  font-size: 28px; /* px */
  color: #fff;
}
.sideslip .sideslip__menu .btn__refresh {
  position: relative;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 0 60px 0;
  font-size: 28px; /* px */
  color: #fff;
}
.sideslip .sideslip__menu .btn__custom {
  position: relative;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 0 60px 0;
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
  bottom: 20px;
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
  background-color: rgba(0, 0, 0, .5);
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
  height: 300px;
  overflow: hidden;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
.box__content .game--banner img {
  height: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
.box__content .btn--leave {
  padding: 20px 0;
}
#quitBox .btn--leave a {
  font-size: 28px; /* px */
  color: #fff;
  background: #ff9c00;
  padding: 10px 60px;
  border-radius: 8px;
}
.box__content .font--tip {
  padding: 20px 20px 0 20px;
  color: red;
  font-size: 20px;
}
.box__content .checkbox--tip {
  padding: 20px 0;
  color: #999;
  font-size: 20px;
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
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid #999; /* no */
  line-height: .65;  /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
}
.box__content input[type="checkbox"]:checked + label::before {
  content: "";
  background-color: #ff9c00;
}
</style>
