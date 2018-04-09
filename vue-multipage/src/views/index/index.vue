<template>
  <div id="app">
    <!-- <img src="../../assets/logo.png"> -->
    <!-- <a href="test.html">跳转测试页面</a> -->
    <div class="game">
      <ul>
        <li class="gameinfo pure-g" v-for="game in gameList" :key="game.id">
          <span class="pure-u-1-5"><img></span>
          <span class="pure-u-3-5">{{ game.name }}</span>
          <span class="pure-u-1-5"><button class="btn--play"><a :href="game.url">开玩</a></button></span>
        </li>
      </ul>
    </div>
    <menu-bar
      :current-menu="currentMenu" 
      :login-status="loginStatus"></menu-bar>
  </div>
</template>

<script>
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
    })
  }
}
</script>

<style scoped>
.game {
  padding: 20px;
}
.game .gameinfo {
  padding: 10px 0;
}
.game .btn--play {
  border: none;
  border-radius: 10px;
}
</style>
