<template>
  <div class="hotgame">
    <ul>
      <li class="gameInfo flex flex-y-center" v-for="game in gameList" :key="game.id" @click="goGameDetail(game.id)">
        <div class="icon">
          <img class="game__icon" v-lazy="game.icon" alt="icon" />
        </div>
        <div class="gameDesc flex flex-list flex-v">
          <p class="gameInfo__tags flex flex-y-center">
            <span class="game__name">{{ game.name }}</span>
            <span class="tag" :class="game.is_exclusive ? 'tag--exclusive' : ''" v-if="game.is_exclusive">{{ game.is_exclusive }}</span>
            <span class="tag" :class="game.is_gift ? 'tag--gift' : ''" v-if="game.is_gift">{{ game.is_gift }}</span>
            <span class="tag" :class="game.is_recommend ? 'tag--recommend' : ''" v-if="game.is_recommend">{{ game.is_recommend }}</span>
          </p>
          <p class="game__type">类型：{{ game.type }}</p>
          <p class="game__desc">{{ game.desc }}</p>
        </div>
        <a class="btn flex" :href=" 'game.html?gameId=' + game.id + '&agentId=' + agentId">开始</a>
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
  name: 'HotGame',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameList: [],
      currentPage: 1,
      totalPage: '',
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取热门游戏列表
    getGameList ($state) {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.gameList,
        data: {
          page: that.currentPage,
          type_id: '', // 类型ID
          is_hot: 1
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
  mounted: function () {
    this.$nextTick(function () {

    })
  }
}
</script>

<style scoped>
.hotgame {
  padding-bottom: 120px;
  box-sizing: border-box;
  line-height: 1;
  background-color: #fff;
}
.hotgame .gameInfo {
  padding: 20px 40px;
  border-top: 2px solid #f0f0f0; /* px */
}
.hotgame .gameInfo:nth-child(1) {
  border-top: none;
}
.hotgame .gameInfo:nth-last-child(2) {
  border-bottom: 2px solid #f0f0f0; /* px */
}
.gameInfo .gameDesc {
  overflow: hidden;
}
.gameInfo .icon {
  height: 128px;
  margin-right: 27px;
  text-align: center;
}
.gameInfo .game__icon {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}
.gameInfo .gameInfo__tags {
  padding: 8px 0;
}
.gameInfo .game__name {
  display: inline-block;
  font-size: 32px; /* px */
  color: #111;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gameInfo .game__type {
  padding: 8px 0;
  font-size: 24px; /* px */
  color: #999;
}
.gameInfo .game__desc {
  padding: 8px 0;
  font-size: 24px; /* px */
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gameInfo a {
  color: #ff9c00;
}
.gameInfo .gameInfo__tags .tag {
  display: inline-block;
  box-sizing: border-box;
  padding: 2px;
  margin-left: 4px;
  font-size: 20px; /* px */
  border-radius: 6px;
  white-space: nowrap;
}
.gameInfo .gameInfo__tags span.tag--exclusive {
  border: 2px solid #ffa800; /* px */
  color: #ffa800;
}
.gameInfo .gameInfo__tags span.tag--gift {
  border: 2px solid #ff0000; /* px */
  color: #ff0000;
}
.gameInfo .gameInfo__tags span.tag--recommend {
  border: 2px solid #00a2ff; /* px */
  color: #00a2ff;
}
</style>
