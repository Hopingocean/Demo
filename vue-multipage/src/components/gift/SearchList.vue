<template>
  <div class="search">
    <p class="search__desc">
      <span class="search__text">"{{ searchText }}"</span>
      的搜索结果：共
      <span>{{ searchList.length }}</span>
      个
    </p>
    <ul class="search__list">
      <li v-for="gift in searchList" :key="gift.id">
        <a class="flex flex-y-center" :href="'gameDetail.html?gameId=' + gift.id + '&agentId=' + agentId">
          <div class="icon">
            <img :src="gift.icon" alt="icon">
          </div>
          <div class="giftInfo flex flex-v flex-list">
            <span>{{ gift.app_name }}</span>
            <span>共有{{ gift.gift_num }}个礼包</span>
          </div>
        </a>
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
        totalPage: '',
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
      getSearchList($state) {
        const that = this;
        if (!that.searchText) {
          return;
        }
        that.searchList = [];
        const options = {
          type: 'get',
          url: Request.url.giftList,
          data: {
            page: that.currentPage,
            title: that.searchText,
          },
          success: function (data) {
            if (data.status) {
              that.searchList = data.data.data;
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
  background-color: #fff;
  padding-bottom: 120px;
}
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
  padding: 20px 40px;
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
.giftInfo {
  padding-left: 27px;
  color: #999;
}
.giftInfo span:first-child {
  padding: 8px 0;
  color: #111;
  font-size: 32px; /* px */
}
.giftInfo span:nth-child(2) {
  padding: 8px 0;
  font-size: 24px; /* px */

}
</style>

