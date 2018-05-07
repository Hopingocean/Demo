<template>
  <div class="activity">
    <ul class="">
      <li class="">
        <a :href=" 'activityDetail.html?gameId=' + gameId + '&agentId=' + agentId">
          <div class="banner">
            <img src="https://game.11h5.com/static/images/2018/0423/20180423063547176.gif" alt="banner">
          </div>
          <div class="activity__info flex flex-y-center">
            <p class="flex flex-v flex-list">
              <span>【妖怪宝可萌】4月13日更新内容！占领忍者村！</span>
              <span>活动时间：2018/04/12 ~ 2018/04/13</span>
            </p>
            <a class="btn"><img :src="iconFlag" alt="icon">进行中</a>
          </div>
        </a>
      </li>
      <li class="">
        <a :href=" 'activityDetail.html?gameId=' + gameId + '&agentId=' + agentId">
          <div class="banner">
            <img src="https://game.11h5.com/static/images/2018/0423/20180423063547176.gif" alt="banner">
          </div>
          <div class="activity__info flex flex-y-center">
            <p class="flex flex-v flex-list">
              <span>【妖怪宝可萌】4月13日更新内容！占领忍者村！</span>
              <span>活动时间：2018/04/12 ~ 2018/04/13</span>
            </p>
            <a class="btn ending"><img :src="iconFlag" alt="icon">已结束</a>
          </div>
        </a>
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

import iconFlag from '@/assets/images/common/icon_flag.png'

export default {
  name: 'Activity',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameId: '',
      activityList: [],
      currentPage: 1,
      pageSize: 12,
      totalPage: '',
      // icon
      iconFlag: iconFlag
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取活动列表
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
.activity ul li {
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #e2e2e2;
}
.activity ul li img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.activity .activity__info {
  padding: 27px 0 16px 0;
  font-size: 28px; /* px */
  color: #111;
}
.activity .activity__info p {
  overflow: hidden;
  text-overflow: ellipsis;
}
.activity .activity__info p span:first-child {
  padding-bottom: 16px;
  font-size: 24px; /* px */
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.activity .activity__info p span:last-child {
  font-size: 20px; /* px */
  color: #999;
}
.activity .activity__info a {
  font-size: 28px; /* px */
  color: #fff;
  background-color: #ff9c00;
}
.activity .activity__info a img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.activity .activity__info a.ending {
  font-size: 28px; /* px */
  color: #fff;
  background-color: #aaa;
  border: none;
}
</style>