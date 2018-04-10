<template>
  <div id="app" class="menubar">
      <ul class="pure-g">
          <li class="pure-u-1-5">
            <div v-if="currentMenu !== 1" @click="go(1)">
                <i class="iconfont menu__icon">&#xe6a2;</i>
                <span class="menu__font">游戏</span>
            </div>
            <div class="current" v-if="currentMenu == 1">
                <i class="iconfont menu__icon">&#xe6a2;</i>
                <span class="menu__font">游戏</span>
            </div>
          </li>
          <li class="pure-u-1-5">
            <div v-if="currentMenu !== 2" @click="go(2)">
                <i class="iconfont menu__icon">&#xe608;</i>
                <span class="menu__font">礼包</span>
            </div>
            <div class="current" v-if="currentMenu == 2">
                <i class="iconfont menu__icon">&#xe608;</i>
                <span class="menu__font">礼包</span>
            </div>
          </li>
          <li class="pure-u-1-5">
            <div v-if="currentMenu !== 3" @click="go(3)">
                <i class="iconfont menu__icon">&#xe652;</i>
                <span class="menu__font">分类</span>
            </div>
            <div class="current" v-if="currentMenu == 3">
                <i class="iconfont menu__icon">&#xe652;</i>
                <span class="menu__font">分类</span>
            </div>
          </li>
          <li class="pure-u-1-5">
            <div v-if="currentMenu !== 4" @click="go(4)">
                <i class="iconfont menu__icon">&#xe635;</i>
                <span class="menu__font">社区</span>
            </div>
            <div class="current" v-if="currentMenu == 4">
                <i class="iconfont menu__icon">&#xe635;</i>
                <span class="menu__font">社区</span>
            </div>
          </li>
          <li class="pure-u-1-5">
            <div v-if="currentMenu !== 5" @click="go(5)">
                <i class="iconfont menu__icon">&#xe62b;</i>
                <span class="menu__font">个人</span>
            </div>
            <div class="current" v-if="currentMenu == 5">
                <i class="iconfont menu__icon">&#xe62b;</i>
                <span class="menu__font">个人</span>
            </div>
          </li>
      </ul>
      <login
        :is-hide="isHide"
        @listen-hide-status="getHideStatus"
        ></login>
  </div>
</template>

<script>
import Login from '@/components/Login'

import Reports from '@/assets/js/api.js'

export default {
  name: 'MenuBar',
  components: { Login },
  data() {
      return {
          isHide: true,
      }
  },
  props: {
      currentMenu: {
          type: Number,
          default: 1
      },
      loginStatus: {
          type: Boolean,
          default: false
      }
  },
  created: function () {
  },
  methods: {
      go(n) {
          switch(n) {
            case 1:
                window.location.href = 'index.html';
                break;
            case 2:
                window.location.href = 'gift.html';
                break;
            case 3:
                window.location.href = 'classify.html';
                break;
            case 4:
                window.location.href = 'community.html';
                break;
            case 5:
                if (this.loginStatus) {
                    window.location.href = 'user.html';
                } else {
                    // 未登录，显示登陆页面
                    this.isHide = false;
                }
                break;
          }
      },
      getHideStatus(status) {
          this.isHide = status;
      }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 622303 */
  src: url('//at.alicdn.com/t/font_622303_1ibgrgrswzv9529.eot');
  src: url('//at.alicdn.com/t/font_622303_1ibgrgrswzv9529.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_622303_1ibgrgrswzv9529.woff') format('woff'),
  url('//at.alicdn.com/t/font_622303_1ibgrgrswzv9529.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_622303_1ibgrgrswzv9529.svg#iconfont') format('svg');
}
.iconfont{
    font-family: "iconfont" !important;
    font-size: 60px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #666;
}
.menubar .menu__icon, .menu__font{
    display: block;
    color: #666;
}
.menubar .current .menu__font, .current .menu__icon {
    color: #2697fc;
}
.menubar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #2b323d;
}
.menubar ul li {
    box-sizing: border-box;
    padding: 6px;
    text-align: center;
}
.menubar ul li img {
    width: 120px;
    height: auto;
    text-align: center;
}
</style>

