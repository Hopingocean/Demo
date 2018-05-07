<template>
  <div class="soonopen">
    <ul>
      <li class="flex flex-y-center" v-for="game in gameList" @click="goGameDetail(game.id)" :key="game.id">
        <div class="icon">
          <img :src="game.icon" alt="icon">
        </div>
        <div class="open__desc flex flex-v flex-list">
          <p>{{ game.name }}</p>
          <p>类型：{{ game.type }}</p>
          <p>九尾3服</p>
        </div>
        <div class="flex flex-v">
          <span class="open__time">已开服12小时</span>
          <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId" class="btn">开始</a>
        </div>
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

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
  name: 'SoonOpen',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameList: [],
      currentPage: 1,
      pageSize: 12,
      totalPage: ''
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    getGameList ($state) {
      var that = this;
      var options = {
        type: 'get',
        url: Request.url.gameList,
        data: {
          page: that.currentPage,
          page_size: that.pageSize,
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
.soonopen ul li {
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #e2e2e2;
}
.soonopen ul li img {
  width: 128px;
  height: 128px;
  border-radius: 18px;
  text-align: center;
}
.soonopen ul li .open__desc {
  padding-left: 27px;
}
.soonopen ul li div p:first-child {
  padding: 6px 0;
  font-size: 32px; /* px */
  color: #111;
}
.soonopen ul li div p:nth-child(2) {
  padding: 21px 0 14px 0;
  font-size: 24px; /* px */
  color: #999;
}
.soonopen ul li div p:nth-child(3) {
  font-size: 24px; /* px */
  color: #ff0000;
}
.soonopen ul li .open__time {
  font-size: 24px; /* px */
  color: #999;
  padding-bottom: 13px;
}
</style>