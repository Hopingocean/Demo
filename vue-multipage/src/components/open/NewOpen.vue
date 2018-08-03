<template>
  <div class="newopen">
    <ul>
      <li class="flex flex-y-center" v-for="(game, i) in gameList" @click="goGameDetail(game.id)" :key="i">
        <div class="icon">
          <img v-lazy="game.icon" alt="icon">
        </div>
        <div class="open__desc flex flex-v flex-list">
          <p>{{ game.name }}</p>
          <p>类型：{{ game.type_name }}</p>
          <p>{{ game.server_name }}</p>
        </div>
        <div class="flex flex-v">
          <span class="open__time">{{ game.time }}</span>
          <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId" class="btn">开始</a>
        </div>
      </li>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          没有更多内容了...
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

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
  name: 'NewOpen',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameList: [],
      currentPage: 1,
      totalPage: ''
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取新开服游戏列表
    getGameList ($state) {
      var that = this;
      var options = {
        type: 'get',
        url: Request.url.gameList,
        data: {
          page: that.currentPage,
          type_id: '',
          is_new_server: 1,
          server_opened: 1,
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
      Request.ajax(options);
    },
    goGameDetail(id) {
      window.location.href = 'gameDetail.html?gameId=' + id + '&agentId=' + this.agentId;
    },
    // 滚动加载
    infiniteHandler($state) {
      this.getGameList($state);
    }
  },
}
</script>

<style scoped>
.newopen {
  box-sizing: border-box;
  line-height: 1;
}
.newopen ul li {
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #e2e2e2; /* px */
}
.newopen .icon {
  height: 128px;
  text-align: center;
}
.newopen ul li img {
  width: 128px;
  height: 128px;
  border-radius: 18px;
  text-align: center;
}
.newopen ul li .open__desc {
  padding-left: 26px;
  overflow: hidden;
}
.newopen ul li div p:first-child {
  padding: 8px 0;
  font-size: 32px; /* px */
  color: #111;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newopen ul li div p:nth-child(2) {
  padding: 8px 0;
  font-size: 24px; /* px */
  color: #999;
}
.newopen ul li div p:nth-child(3) {
  padding: 8px 0;
  font-size: 24px; /* px */
  color: #ff0000;
}
.newopen ul li .open__time {
  font-size: 24px; /* px */
  color: #999;
  padding-bottom: 12px;
}
</style>