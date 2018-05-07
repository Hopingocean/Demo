<template>
  <div id="app">
    <div class="game">
      <!-- swiper -->
      <div class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="game in swiperList" :key="game.id">
            <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId">
              <img class="swiper__banner swiper-lazy" :src="game.image" alt="banner">
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 最近在玩 -->
      <!-- <div class="recommend flex" v-if="gameList.length">
        <span class="font--recommend" v-if="gameList.length">最<br/>近<br/>在<br/>玩</span>
        <ul class="">
          <li class="" v-for="game in gameList" :key="game.id">
            <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId">
              <img :src="game.icon" alt="icon">
              <span>{{ game.name }}</span>
            </a>
          </li>
        </ul>
      </div> -->
      <!-- 有奖活动 -->
      <!-- <div class="activity--prize flex flex-y-center">
        <a :href="'activityDetail.html?gameId=' + prizeActivityInfo.gameId + '&agentId=' + agentId">
          <span class="type">有奖活动<img :src="iconGift" alt="icon"></span>
          <span class="desc">新游火爆上线，iPhoneX免费送</span>
        </a>
      </div> -->
      <!-- 游戏分类 -->
      <div class="menu">
        <ul class="flex">
          <li class="menu--font flex flex-list">
            <router-link to="/hotgame">热门</router-link>
          </li>
          <li class="menu--font flex flex-list">
            <!-- <router-link to="/newgame">新上架</router-link> -->
          </li>
          <li class="menu--font flex flex-list">
            <!-- <router-link to="/hotactivity">活动</router-link> -->
          </li>
          <li class="menu--font flex flex-list">
            <!-- <router-link to="/opengame">新开服</router-link> -->
          </li>
        </ul>
        <router-view></router-view>
      </div>
    </div>
    <menu-bar
      :current-menu="currentMenu"
      :login-status="loginStatus"></menu-bar>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import jjh_icon from '@/assets/images/common/jjh.jpg'
import iconGift from '@/assets/images/common/icon_gift.png'

export default {
  name: 'Index',
  components: { MenuBar, Login, swiper, swiperSlide },
  data() {
    return {
      agentId: '',
      loginStatus: false,
      currentMenu: 1,
      jjh_icon: jjh_icon,
      iconGift: iconGift,
      gameList: [],
      // swiper
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
      // 有奖活动
      prizeActivityInfo: '',
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    getUserinfo () {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.userinfo,
        data: {},
        success: function (data) {
          if (data.status) {
            that.loginStatus = true;
          } else {
            that.loginStatus = false;
          }
        },
        error: function (error) {
            that.loginStatus = false;
        }
      }
      Request.ajax(options);
    },
    // 获取轮播图列表
    getSwiperList () {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.swiperList,
        data: {
          type: 1, // 首页轮播图
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
    // 获取有奖活动信息
    getPrizeActivityInfo() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.prizeActivityInfo,
        data: {
          
        },
        success: function (data) {
          if (data.code == 'success') {
            that.prizeActivityInfo = data.data.data;
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
        type: 'get',
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
    }
  },
  mounted: function () {
    this.$nextTick(function() {
      this.getUserinfo();
      this.getMyGame();
      this.getSwiperList();
      // 判断当前激活路由
      if (this.$route.name == 'HotGame') {
        this.$router.push('hotgame');
      }
      // 初始化QQ分享信息
      CommonMethods.qqShare('集结号捕鱼', '', '', location.origin);
    })
  }
}
</script>

<style scoped>
.game {
  padding-bottom: 128px;
}
/* 轮播图 */
.swiper, .swiper-container {
  width: 100%;
  min-height: 260px;
}
.swiper .swiper__banner {
  width: 100%;
  height: auto;
}
/* 最近在玩 */
.recommend {
  position: relative;
  width: 100%;
  height: auto;
  margin: 30px 0 0 0;
  background-color: #fff;
}
.recommend .font--recommend {
  position: absolute;
  left: 0;
  top: 0;
  padding: 23px 16px;
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
  padding-left: 60px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.recommend ul li {
  display: inline-block;
  width: 200px;
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
  padding: 28px 40px;
}
.activity--prize .type {
  padding: 8px 13px;
  font-size: 28px; /* px */
  color: #ff0000;
  border: 2px solid #ff0000;
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
  padding-left: 16px;
  font-size: 24px; /* px */
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 切换游戏类型 */
.menu ul {
  background-color: #fff;
  border-bottom: 2px solid #e2e2e2;
}
.menu .menu--font {
  font-size: 28px; /* px */
  line-height: 80px;
}
.menu .menu--font .router-link-active {
  border-bottom: 8px solid #ff9c00;
  color: #ff9c00;
}
.menu .menu--font a {
  margin: 0 auto;
  font-size: 28px; /* px */
  color: #111;
}
</style>
