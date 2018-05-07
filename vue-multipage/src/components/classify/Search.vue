<template>
  <div class="search">
    <p class="search__desc">
      <span class="search__text">"{{ searchText }}"</span>
      的搜索结果：共
      <span>{{ searchList.length }}</span>
      个
    </p>
    <ul class="search__list">
      <li class="flex flex-y-center" v-for="game in searchList" :key="game.gameId" @click="goGameDetail(game.gameId)">
        <div class="icon">
          <img :src="game.gameIcon" alt="icon">
        </div>
        <div class="gameInfo flex flex-v flex-list">
          <span>{{ game.gameName }}</span>
          <span>类型：{{ game.gameType }}</span>
          <span>{{ game.gameDesc }}</span>
        </div>
        <a :href="'game.html?gameId=' + game.gameId + '&agentId=' + agentId" class="btn">开始</a>
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
    name: 'Search',
    components: { InfiniteLoading },
    data() {
      return {
        agentId: '',
        searchList: [],
        searchText: '',
        currentPage: 1,
        pageSize: 12,
      }
    },
    props: {},
    created() {
      this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
    },
    watch: {
      '$route'(to, from) {
        if(to.path != from.path) {
          this.searchText = this.$route.params.searchText;
          this.getSearchList();
        }
      }
    },
    methods: {
      // 获取搜索游戏列表
      getSearchList($state) {
        const that = this;
        if (!that.searchText) {
          return;
        }
        that.searchList = [
          {
            gameId: '11',
            gameIcon: '',
            gameName: '疯狂捕鱼',
            gameType: '休闲',
            gameDesc: '高还原街机移植版'
          },
          {
            gameId: '12',
            gameIcon: '',
            gameName: '集结号捕鱼',
            gameType: '休闲',
            gameDesc: '高还原街机移植版'
          }
        ];
        const options = {
          type: 'get',
          url: Request.url.search,
          data: {
            page: that.currentPage,
            page_size: that.pageSize,
          },
          success: function (data) {
            if (data.status) {
              that.searchList = data.data.data;
              $state.loaded();
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
      // 滚动加载
      infiniteHandler($state) {
          this.getSearchList($state);
      },
      // 游戏详情页
      goGameDetail(gameId) {
        window.location.href = "gameDetail.html?gameId=" + gameId + '&agentId=' + this.agentId;
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // 获取路由参数
        this.searchText = this.$route.params.searchText;
      })
    }
  }
</script>

<style scoped>
.search__desc {
  padding: 28px 40px;
  font-size: 32px; /* px */
  color: #111;
  border-bottom: 2px solid #f0f0f0;
}
.search__desc .search__text {
  color: #FF9C00;
}
.search__list li {
  box-sizing: border-box;
  padding: 32px 40px;
  border-bottom: 2px solid #f0f0f0;
}
.search__list .icon img {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}
.gameInfo {
  padding-left: 27px;
  color: #999999;
}
.gameInfo span:first-child {
  color: #111;
  font-size: 32px; /* px */
}
.gameInfo span:nth-child(2) {
  padding: 24px 0 13px 0;
  font-size: 24px; /* px */

}
</style>

