<template>
  <div id="newgame" class="newgame">
    <ul>
      <li class="gameinfo flex flex-y-center" v-for="game in gameList" :key="game.id" @click="goGameInfo(game.id)">
        <div class="icon">
          <img class="game__icon" v-lazy="jjh_icon" />
        </div>
        <div class="flex flex-list flex-v">
          <p class="game__name">{{ game.name }}</p>
          <p class="game__desc">{{ game.name }}</p>
        </div>
        <a class="btn flex" :href=" 'game.html?gameId=' + game.id ">开玩</a>
      </li>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          敬请期待...
        </span>
        <span slot="no-results">
          服务器开小差了...
        </span>
      </infinite-loading>
    </ul>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import Reports from '@/assets/js/api'

import jjh_icon from '@/assets/images/common/jjh.jpg'

export default {
  name: 'NewGame',
  components: { InfiniteLoading },
  data() {
    return {
      gameList: [],
      jjh_icon: jjh_icon,
      currentPage: 1,
      totalPage: ''
    }
  },
  methods: {
    getGameList ($state) {
      var that = this;
      var options = {
        type: 'get',
        url: Reports.requestUrl.gameList,
        data: {
          page: that.currentPage,
          page_size: '',
          type_id: '',
          is_hot: ''
        },
        success: function (data) {
          if (data.code == 'success') {
            that.gameList = that.gameList.concat(data.data.data);
            that.currentPage = data.data.current_page + 1;
            that.totalPage = data.data.total_page;
            $state.loaded();
            if (that.currentPage > that.totalPage) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        },
        error: function (error) {
          $state.complete();
        }
      }
      Reports.ajax(options);
    },
    goGameInfo(id) {
      window.location.href = 'gameinfo.html?gameId=' + id;
    },
    // 滚动加载
    infiniteHandler($state) {
      this.getGameList($state);
    }
  },
  mounted: function () {
    this.$nextTick(function () {

    })
  }
}
</script>

<style scoped>
.newgame {
  background-color: #fff;
}
.newgame .gameinfo {
  padding: 20px 20px;
  border-top: 1px solid rgb(245, 245, 250);
}
.newgame .gameinfo:nth-last-child(2) {
  border-bottom: 1px solid rgb(245, 245, 250);
}
.gameinfo .icon {
  margin-right: 20px;
  text-align: center;
}
.gameinfo .game__icon {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.gameinfo .game__name {
  font-size: 28px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gameinfo .game__desc {
  font-size: 24px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gameinfo a {
  color: #1381f1;
}
</style>
