<template>
  <div class="puzzle">
    <ul>
      <li class="gameInfo flex flex-y-center" v-for="gameInfo in gameList" :key="gameInfo.id" @click="goGameInfo(gameInfo.id)">
        <div class="icon">
          <img class="game__icon" v-lazy="jjh_icon" />
        </div>
        <div class="flex flex-list flex-v">
          <p class="gameInfo__tags">
            <span class="game__name">{{ gameInfo.name }}</span>
            <span class="tag">独家</span>
            <span class="tag">礼包</span>
            <span class="tag">推荐</span>
          </p>
          <p class="game__type">类型:{{ gameInfo.type }}</p>
          <p class="game__desc">{{ gameInfo.desc }}</p>
        </div>
        <a class="btn flex" :href=" 'game.html?gameId=' + gameInfo.id + '&agentId=' + agentId">开玩</a>
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

import jjh_icon from '@/assets/images/common/jjh.jpg'

export default {
  name: 'PuzzleGame',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameList: [],
      jjh_icon: jjh_icon,
      currentPage: 1,
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
      Request.ajax(options);
    },
    goGameInfo(id) {
      window.location.href = 'gameDetail.html?gameId=' + id + '&agentId=' + this.agentId;
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
.puzzle {
  margin-bottom: 128px;
  background-color: #fff;
}
.puzzle .gameInfo {
  padding: 32px 40px;
  border-top: 2px solid #f1f1f1;
}
.puzzle .gameInfo:nth-last-child(2) {
  border-bottom: 1px solid #f1f1f1;
}
.gameInfo .icon {
  padding-right: 28px;
  text-align: center;
}
.gameInfo .game__icon {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}
.gameInfo .gameInfo__tags .game__name {
  padding-right: 10px;
  margin-bottom: 21px;
  font-size: 32px; /* px */
  color: #111;
}
.gameInfo .game__type, .game__desc {
  font-size: 24px; /* px */
  color: #999;
}
.gameInfo .gameInfo__tags .tag {
  display: inline-block;
  box-sizing: border-box;
  padding: 4px;
  font-size: 20px; /* px */
  border-radius: 6px;
  white-space: nowrap;
}
.gameInfo .gameInfo__tags span:nth-child(2) {
  border: 2px solid #ffa800;
  color: #ffa800;
}
.gameInfo .gameInfo__tags span:nth-child(3) {
  border: 2px solid #ff0000;
  color: #ff0000;
}
.gameInfo .gameInfo__tags span:nth-child(4) {
  border: 2px solid #00a2ff;
  color: #00a2ff;
}
</style>
