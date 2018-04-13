<template>
  <div id="app">
    <div class="game">
      <!-- swiper -->
      <div class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="game in swiperList" :key="game.id">
            <img class="swiper__banner swiper-lazy" :src="game.banner" alt="banner">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 最近在玩 -->
      <div class="recommend flex" v-if="loginStatus">
        <span class="font--recommend">最<br/>近<br/>在<br/>玩</span>
        <ul class="">
          <li class="" v-for="game in gameList" :key="game.id">
            <img :src="jjh_icon" alt="icon">
            <span>{{ game.name }}</span>
            <a :href="'game.html?gameId=' + game.id " class="btn">开始</a>
          </li>
        </ul>
      </div>
      <!-- 游戏分类 -->
      <div class="menu">
        <ul class="pure-g">
          <li class="menu--font pure-u-1-4">
            <router-link to="/hotgame">热门</router-link>
          </li>
          <li class="menu--font pure-u-1-4">
            <router-link to="/newgame">新上架</router-link>
          </li>
          <li class="menu--font pure-u-1-4">
            <router-link to="/hotactivity">活动</router-link>
          </li>
          <li class="menu--font pure-u-1-4">
            <router-link to="/opengame">新开服</router-link>
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

import Reports from '@/assets/js/api'

import jjh_icon from '@/assets/images/common/jjh.jpg'

export default {
  name: 'Index',
  components: { MenuBar, Login, swiper, swiperSlide },
  data() {
    return {
      loginStatus: true,
      currentMenu: 1,
      jjh_icon: jjh_icon,
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
      swiperList: [
        {
          id: '1',
          banner: 'https://game.11h5.com/static/images/2018/0403/20180403103119329.gif'
        },
        {
          id: '2',
          banner: 'https://game.11h5.com/static/images/2018/0404/20180404065347540.gif'
        },
        {
          id: '3',
          banner: 'https://game.11h5.com/static/images/2018/0412/20180412012010566.gif'
        },
      ],
    }
  },
  created: function () {

  },
  methods: {
    getUserinfo () {
      var that = this;
      var options = {
        type: 'get',
        url: Reports.requestUrl.userinfo,
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
      Reports.ajax(options);
    },
    getGameList () {
      var that = this;
      var options = {
        type: 'get',
        url: Reports.requestUrl.gameList,
        data: {
          page: '',
          page_size: '',
          type_id: '',
          is_hot: ''
        },
        success: function (data) {
          if (data.code == 'success') {
            that.gameList = data.data.data;
          } else {
            
          }
        },
        error: function (error) {
            
        }
      }
      Reports.ajax(options);
    }
  },
  mounted: function () {
    this.$nextTick(function() {
      this.getUserinfo();
      this.getGameList();
      // 判断当前激活路由
      if (this.$route.name == 'HotGame') {
        this.$router.push('hotgame');
      }
      console.log(this.$route);
    })
  }
}
</script>

<style scoped>
.game {
  padding-bottom: 110px;
}
/* 轮播图 */
.swiper, .swiper-container {
  width: 100%;
  min-height: 300px;
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
  margin: 10px 0 0 0;
  background-color: #fff;
}
.recommend .font--recommend {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  margin: 0 auto;
  font-size: 28px;
  color: #eee;

}
.recommend ul {
  display: inline-block;
  padding-left: 50px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.recommend ul li {
  display: inline-block;
  width: 200px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, .2);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, .2);
}
.recommend ul li img {
  display: block;
  width: 120px;
  height: 120px;
  margin: -10px auto 0 auto;
  border-radius: 20px;
}
.recommend ul li span {
  display: block;
  padding: 10px 0;
}
.recommend ul li a {
  display: block;
  width: 100px;
  margin: 10px auto;
}
/* 切换游戏类型 */
.menu ul {
  background-color: #fff;
  border-bottom: 1px solid #f5f5fa;
}
.menu .menu--font {
  line-height: 80px;
  text-align: center;
}
.menu .menu--font .router-link-active {
  padding: 10px;
  border-bottom: 4px solid #2697fc;
  color: #2697fc;
}
.menu .menu--font a {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  height: 24px;
  line-height: 24px;
}
</style>
