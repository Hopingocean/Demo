<template>
  <div class="search">
    <p class="search__desc">
      <span class="search__text">"{{ searchText }}"</span>
      的搜索结果：共
      <span>{{ searchList.length }}</span>
      个
    </p>
    <ul class="search__list">
      <li class="flex flex-y-center" v-for="game in searchList" :key="game.id" @click="goGameDetail(game.id)">
        <div class="icon">
          <img v-lazy="game.icon" alt="icon">
        </div>
        <div class="gameInfo flex flex-v flex-list">
          <span>{{ game.name }}</span>
          <span>类型：{{ game.type }}</span>
          <span>{{ game.desc }}</span>
        </div>
        <a :href="'game.html?gameId=' + game.id + '&agentId=' + agentId" class="btn">开始</a>
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
    name: 'Search',
    components: { InfiniteLoading },
    data() {
      return {
        agentId: '',
        searchList: [],
        searchText: '',
        currentPage: 1,
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
          this.currentPage = 1;
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
        const options = {
          type: 'get',
          url: Request.url.search,
          data: {
            page: that.currentPage,
            name: that.searchText
          },
          success: function (data) {
            if (data.status) {
              that.searchList = that.searchList.concat(data.data.data);
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
.search {
  padding-bottom: 120px;
}
.search__desc {
  padding: 20px 40px;
  font-size: 32px; /* px */
  color: #111;
  border-bottom: 2px solid #f0f0f0;
}
.search__desc .search__text {
  color: #FF9C00;
}
.search__list li {
  box-sizing: border-box;
  padding: 20px 40px;
  line-height: 1;
  border-bottom: 2px solid #f0f0f0;
}
.search__list .icon {
  height: 128px;
}
.search__list .icon img {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}
.gameInfo {
  padding-left: 27px;
  color: #999999;
  overflow: hidden;
}
.gameInfo span:first-child {
  padding: 8px 0;
  color: #111;
  font-size: 32px; /* px */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gameInfo span:nth-child(2) {
  padding: 8px 0;
  font-size: 24px; /* px */
}
.gameInfo span:nth-child(3) {
  padding: 8px 0;
  font-size: 24px; /* px */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

