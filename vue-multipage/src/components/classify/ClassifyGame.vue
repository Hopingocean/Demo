<template>
  <div class="classifyGame">
    <ul>
      <li class="gameInfo flex flex-y-center" v-for="gameInfo in gameList" :key="gameInfo.id" @click="goGameInfo(gameInfo.id)">
        <div class="icon">
          <img class="game__icon" v-lazy="gameInfo.icon" alt="icon"/>
        </div>
        <div class="game__info flex flex-list flex-v">
          <p class="gameInfo__tags flex flex-y-center">
            <span class="game__name">{{ gameInfo.name }}</span>
            <span class="tag" :class="gameInfo.is_exclusive ? 'tag--exclusive' : ''" v-if="gameInfo.is_exclusive">{{ gameInfo.is_exclusive }}</span>
            <span class="tag" :class="gameInfo.is_gift ? 'tag--gift' : ''" v-if="gameInfo.is_gift">{{ gameInfo.is_gift }}</span>
            <span class="tag" :class="gameInfo.is_recommend ? 'tag--recommend' : ''" v-if="gameInfo.is_recommend">{{ gameInfo.is_recommend }}</span>
          </p>
          <p class="game__type">类型:{{ gameInfo.type }}</p>
          <p class="game__desc">{{ gameInfo.desc }}</p>
        </div>
        <a class="btn flex" :href=" 'game.html?gameId=' + gameInfo.id + '&agentId=' + agentId">开玩</a>
      </li>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
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
  name: 'ClassifyGame',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameList: [],
      currentPage: 1,
      totalPage: 1,
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  watch: {
    '$route'(to, from) {
      this.gameList = [];
      this.currentPage = 1;
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      })
    }
  },
  methods: {
    // 获取分类游戏列表
    getGameList ($state) {
      var that = this;
      var options = {
        type: 'get',
        url: Request.url.gameList,
        data: {
          page: that.currentPage,
          type_id: that.$route.params.typeId
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
.classifyGame {
  padding-bottom: 120px;
  line-height: 1;
  background-color: #fff;
}
.classifyGame .gameInfo {
  padding: 20px 40px;
  border-top: 2px solid #f1f1f1;
}
.classifyGame .gameInfo:nth-last-child(2) {
  border-bottom: 1px solid #f1f1f1;
}
.gameInfo .icon {
  height: 128px;
  padding-right: 28px;
  text-align: center;
}
.gameInfo .game__icon {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}
.gameInfo .game__info {
  overflow: hidden;
}
.gameInfo .gameInfo__tags {
  padding: 8px 0;
}
.gameInfo .gameInfo__tags .game__name {
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
