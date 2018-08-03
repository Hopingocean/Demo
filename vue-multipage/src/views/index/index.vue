<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div class="menu--top">
      <div class="flex">
        <a href="javascript:void(0);" class="flex-list">
          <img class="icon__logo" :src="iconLogo" alt="icon">
        </a>
        <a href="javascript:void(0);" class="flex flex-y-center">
          <!-- <img :src="iconPhone" alt="icon" class="icon__phone">
          <span>下载App</span> -->
        </a>
        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf" target="_blank" class="flex flex-y-center">
          <img :src="iconPcCustom" alt="icon" class="icon__custom">
          <span>客服</span>
        </a>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="tip--footer">
      <img :src="monster1" alt="icon1">
      <img :src="monster2" alt="icon1">
      <div class="content">
        <!-- <ul class="">
          <li class="">
            <a href="javascript:void(0);">家长监护 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">纠纷处理 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">关于我们 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">开放平台</a>
          </li>
        </ul> -->
        <p>浙网文〔2016〕0261-131号 | 浙ICP备12003105号-1 | 浙B2-20120158-4 浙公网安备 33071802100104号</p>
        <p>Copyright2014-2018 All Rights Reserved</p>
        <p>抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
      </div>
      <img :src="monster3" alt="icon1">
      <img :src="monster4" alt="icon1">
    </div>
    <div class="wrap__box">
      <!-- pc端背景中的内容 -->
      <div class="bg__content">
        <!-- 点击即玩 -->
        <div class="tip--left">
          <img :src="iconTip1" alt="icon">
          <img :src="iconTip2" alt="icon">
        </div>
        <!-- phone -->
        <div class="flex flex-v leftBtn">
            <i></i>
            <i></i>
            <i></i>
        </div>
        <div class="flex flex-v topBtn">
            <i></i>
            <div class="flex">
                <i></i>
                <i></i>
            </div>
        </div>
        <div class="bottomBtn flex">
          <i></i>
        </div>
        <!-- 二维码 -->
        <div class="code">
          <img class="code--border" :src="codeBorder" alt="icon">
          <!-- 公众号 -->
          <img :src="qrCode" alt="二维码" class="qrCode">
        </div>
      </div>
      <div class="wrap">
        <div class="scroll">
          <!-- swiper -->
          <div class="swiper">
            <swiper :options="swiperOption">
              <swiper-slide v-for="game in swiperList" :key="game.id">
                <a v-if="game.skip_type == 1" :href="game.url">
                  <img class="swiper__banner swiper-lazy" :src="game.image" alt="banner">
                </a>
                <a v-if="game.skip_type == 2" :href="'game.html?gameId=' + game.app_id + '&agentId=' + agentId">
                  <img class="swiper__banner swiper-lazy" :src="game.image" alt="banner">
                </a>
                <a v-if="game.skip_type == 3" href="javascript:void(0);">
                  <img class="swiper__banner swiper-lazy" :src="game.image" alt="banner">
                </a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <!-- 有奖活动 :style="adsList.length ? 'padding-top: 1px;' : ''" -->
          <div class="activity--prize flex flex-y-center" v-if="adsList.length">
            <span class="type">活动公告</span>
            <swiper :options="adsSwiperOption">
              <swiper-slide v-for="ads in adsList" :key="ads.id">
                <a class="desc" v-if="ads.skip_type == 1" :href="ads.url">
                  {{ ads.title }}
                </a>
                <a class="desc" v-if="ads.skip_type == 2" :href="'game.html?gameId=' + ads.app_id + '&agentId=' + agentId">
                  {{ ads.title }}
                </a>
                <a class="desc" v-if="ads.skip_type == 3" href="javascript:void(0);">
                  {{ ads.title }}
                </a>
              </swiper-slide>
            </swiper>
          </div>
          <!-- 最近在玩 -->
          <div class="recommend flex" v-if="gameList.length">
            <span class="font--recommend">游<br/>戏<br/>记<br/>录</span>
            <ul class="">
              <li class="" v-for="game in gameList" :key="game.id">
                <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId">
                  <img :src="game.icon" alt="icon">
                  <span>{{ game.name }}</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- 游戏分类 -->
          <div class="menu">
            <ul class="flex">
              <li class="menu--font flex flex-list" @click="viewMenu(1)">
                <router-link class="flex-list" :class=" activeMenu == 1 ? 'active' : '' " to="/hotgame">
                  <span>热门</span>
                </router-link>
              </li>
              <li class="menu--font flex flex-list" @click="viewMenu(2)">
                <router-link class="flex-list" :class=" activeMenu == 2 ? 'active' : '' " to="/newgame">
                  <span>新游</span>
                </router-link>
              </li>
              <li class="menu--font flex flex-list" @click="viewMenu(3)">
                <router-link class="flex-list" :class=" activeMenu == 3 ? 'active' : '' " to="/hotactivity">
                  <span>活动</span>
                </router-link>
              </li>
              <li class="menu--font flex flex-list" @click="viewMenu(4)">
                <router-link class="flex-list" :class=" activeMenu == 4 ? 'active' : '' " to="/opengame">
                  <span>新服</span>
                </router-link>
              </li>
            </ul>
            <!-- <a href="javascript:" @click="postMessage">postMessage</a> -->
            <router-view></router-view>
          </div>
        </div>
        <!-- components -->
        <menu-bar :current-menu="currentMenu"></menu-bar>
      </div>
    </div>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import iconGift from '@/assets/images/common/icon_gift.png'

import iconLogo from '@/assets/images/pc/icon_logo.png'
import iconPhone from '@/assets/images/pc/icon_phone.png'
import iconPcCustom from '@/assets/images/pc/icon_custom.png'
import iconTip1 from '@/assets/images/pc/icon_tip1.png'
import iconTip2 from '@/assets/images/pc/icon_tip2.png'
import codeBorder from '@/assets/images/pc/codeBorder.png'
import qrCode from '@/assets/images/pc/qrCode.jpg'
import monster1 from '@/assets/images/pc/monster1.png'
import monster2 from '@/assets/images/pc/monster2.png'
import monster3 from '@/assets/images/pc/monster3.png'
import monster4 from '@/assets/images/pc/monster4.png'

export default {
  name: 'Index',
  components: { MenuBar, Login, swiper, swiperSlide },
  data() {
    return {
      agentId: '',
      loginStatus: false,
      currentMenu: 1,
      iconGift: iconGift,
      iconLogo: iconLogo,
      iconPcCustom: iconPcCustom,
      iconPhone: iconPhone,
      iconTip1: iconTip1,
      iconTip2: iconTip2,
      qrCode: qrCode,
      codeBorder: codeBorder,
      monster1: monster1,
      monster2: monster2,
      monster3: monster3,
      monster4: monster4,
      gameList: [],
      // 轮播图配置
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        lazy: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
      },
      swiperList: [],
      // 活动轮播配置
      adsSwiperOption: {
        direction: 'vertical',
        autoplay: true,
        autoHeight: true,
        freeMode: true,
        roundLengths : true, //防止文字模糊
      },
      adsList: [],
      // 当前菜单
      activeMenu: 1,
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    getUserinfo () {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.userinfo,
        data: {},
        success: function (data) {
          if (data.status) {
            that.loginStatus = true;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 获取首页轮播图列表
    getSwiperList () {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.adList,
        data: {
          type: 1, // 1,首页轮播图；2,搜索页文字；3,搜索页轮播图；4,首页文字；5,游戏弹框
        },
        success: function (data) {
          if (data.code == 'success') {
            that.swiperList = data.data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 获取广告列表
    getAdsList() {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.adList,
        data: {
          type: 4, // 1,首页轮播图；2,搜索页文字；3,搜索页轮播图；4,首页文字；5,游戏弹框
        },
        success: function (data) {
          if (data.code == 'success') {
            that.adsList = data.data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 最近在玩游戏列表
    getMyGame() {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.myGame,
        data: {},
        success: function (data) {
          if (data.status) {
            that.gameList = data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 切换菜单
    viewMenu(n) {
      this.activeMenu = n;
    }
  },
  mounted: function () {
    this.$nextTick(function() {
      this.getUserinfo();
      this.getMyGame();
      this.getSwiperList();
      this.getAdsList();
      // 判断当前激活路由
      if (this.$route.path.split('/')[1] == 'hotgame') {
        this.activeMenu = 1;
      } else if (this.$route.path.split('/')[1] == 'newgame') {
        this.activeMenu = 2;
      } else if (this.$route.path.split('/')[1] == 'hotactivity') {
        this.activeMenu = 3;
      } else if (this.$route.path.split('/')[1] == 'opengame') {
        this.activeMenu = 4;
      }
      // 初始化分享信息
      const shareInfo = {
        title: '集结号微游-游戏中心',
        desc: '无需下载，点击即玩！集结号微游-游戏中心，海量游戏在线玩！',
        imgUrl: 'https://static.12h5.com/120.png',
        link: location.origin
      }
      if (wxApi.isWeChat()) {
        wxApi.wxInit(shareInfo);
      }
      wxApi.qqShare(shareInfo);
    })
  }
}
</script>

<style scoped>
/* 轮播图 */
.swiper, .swiper-container {
  width: 100%;
  background-color: #fff;
}
.swiper .swiper__banner {
  width: 100%;
  height: auto;
  max-height: 300px;
}
/* 最近在玩 */
.recommend {
  position: relative;
  width: 100%;
  height: auto;
  margin: 10px 0 0 0;
  border-bottom: 10px solid #f0f0f0;
  background-color: #fff;
}
.recommend .font--recommend {
  position: absolute;
  left: 0;
  top: 0;
  padding: 24px 16px;
  margin: 0 auto;
  font-size: 28px; /* px */
  color: #eee;
  line-height: 32px;
  background-color: #ff5e66;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
}
.recommend ul {
  width: 100%;
  display: inline-block;
  padding-left: 80px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.recommend ul li {
  display: inline-block;
  width: 160px;
  margin: 10px;
  text-align: center;
  overflow: hidden;
}
.recommend ul li img {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  border-radius: 18px;
}
.recommend ul li span {
  padding: 14px 0;
  display: block;
  font-size: 24px; /* px */
  color: #111;
}
/* 有奖活动 */
.activity--prize {
  box-sizing: border-box;
  /* padding: 0 40px; */
  border-bottom: 10px solid #f0f0f0;
  background-color: #fff;
}
.activity--prize .type {
  padding: 4px 8px;
  font-size: 26px; /* px */
  color: #ff0000;
  border: 2px solid #ff0000; /* px */
  border-radius: 8px;
  white-space: nowrap;
}
.activity--prize .type img {
  padding-left: 9px;
  width: 36px;
  height: auto;
  vertical-align: bottom;
}
.activity--prize .desc {
  display: inline-block;
  padding-left: 16px;
  font-size: 24px; /* px */
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.activity--prize .swiper-slide {
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
/* 切换游戏类型 */
.menu ul {
  background-color: #fff;
  border-bottom: 2px solid #e2e2e2; /* px */
}
.menu .menu--font {
  font-size: 28px; /* px */
  line-height: 80px;
}
.menu .menu--font .active span {
  display: inline-block;
  padding: 0 10px;
  color: #ff9c00;
  border-bottom: 8px solid #ff9c00;
}
.menu .menu--font a {
  margin: 0 auto;
  font-size: 28px; /* px */
  color: #111;
  text-align: center;
}
</style>
