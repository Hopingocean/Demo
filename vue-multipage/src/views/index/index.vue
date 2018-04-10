<template>
  <div id="app">
    <div class="game">
      <!-- swiper -->
      <div class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="game in swiperList" :key="game.id">{{ game.banner }}</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 游戏分类 -->
      <div class="menu">
        <ul class="pure-g">
          <li class="pure-u-1-4">
            <router-link to="/hotgame">热门</router-link>
          </li>
          <li class="pure-u-1-4">
            <router-link to="/newgame">新上架</router-link>
          </li>
          <li class="pure-u-1-4">
            <router-link to="/hotactivity">活动</router-link>
          </li>
          <li class="pure-u-1-4">
            <router-link to="/opengame">新开服</router-link>
          </li>
        </ul>
        <router-view></router-view>
      </div>
      <ul>
        <li class="gameinfo pure-g" v-for="game in gameList" :key="game.id">
          <span class="pure-u-1-5"><img></span>
          <span class="pure-u-3-5">{{ game.name }}</span>
          <span class="pure-u-1-5"><button class="btn--play"><a :href=" 'game.html?gameId=' + game.id ">开玩</a></button></span>
        </li>
      </ul>
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

export default {
  name: 'Index',
  components: { MenuBar, Login },
  data() {
    return {
      loginStatus: true,
      currentMenu: 1,
      gameList: [],
      // swiper
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperList: [],
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
            that.swiperList = data.data.data;
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
    })
  }
}
</script>

<style scoped>
.game {
  padding: 20px;
}
.swiper, .swiper-container {
  width: 100%;
  min-height: 300px;
}
.game .gameinfo {
  padding: 10px 0;
}
.game .btn--play {
  border: none;
  border-radius: 10px;
}
</style>
