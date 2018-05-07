<template>
  <div id="notice" class="notice">
    <ul>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <a class="flex-list" :href=" 'activityDetail.html?gameId=' + gameId + '&agentId=' + agentId">【传奇世界之仗剑天涯H5】典藏新法宝</a>
        <span>2018-04/03</span>
      </li>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <a class="flex-list" :href=" 'activityDetail.html?gameId=' + gameId + '&agentId=' + agentId">【传奇世界之仗剑天涯H5】典藏新法宝</a>
        <span>2018-04/03</span>
      </li>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <a class="flex-list" :href=" 'activityDetail.html?gameId=' + gameId + '&agentId=' + agentId">【传奇世界之仗剑天涯H5】典藏新法宝</a>
        <span>2018-04/03</span>
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
  name: 'Notice',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameId: '',
      activityList: [],
      currentPage: 1,
      pageSize: 12,
      totalPage: ''
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取公告列表
    getActivityList($state) {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.activityList,
        data: {
          page: that.currentPage,
          page_size: that.pageSize
        },
        success: function (data) {
          if (data.status) {
            that.activityList = that.activityList.concat(data.data.data);
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
      this.getActivityList($state);
    }
  }
}
</script>

<style scoped>
.notice ul li {
  padding: 32px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
  overflow: hidden;
}
.notice ul li a {
  font-size: 24px; /* px */
  padding: 4px;
}
.notice ul li span:nth-child(2) {
  padding-right: 18px;
  font-size: 28px; /* px */
  color: #111;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.notice ul li span:nth-child(3) {
  font-size: 24px; /* px */
  color: #999;
}
</style>