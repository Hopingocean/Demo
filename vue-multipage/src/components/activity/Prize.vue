<template>
  <div class="strategy">
    <ul class="">
      <li class="flex flex-y-center" v-for="activity in activityList" :key="activity.id">
        <a href="javascript:void(0);" class="btn">攻略</a>
        <a class="flex-list" :href=" 'activityDetail.html?activityId=' + activity.id + '&agentId=' + agentId">{{ activity.desc }}</a>
        <span>{{ activity.start_time }}</span>
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

import iconFlag from '@/assets/images/common/icon_flag.png'

export default {
  name: 'Prize',
  components: { InfiniteLoading },
  data() {
    return {
      agentId: '',
      gameId: '',
      activityList: [],
      currentPage: 1,
      totalPage: '',
      iconFlag: iconFlag,
    }
  },
  watch: {
    '$route'(to, from) {
      this.activityList = [];
      this.currentPage = 1;
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      })
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取有奖活动列表
    getActivityList($state) {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.activityList,
        data: {
          page: that.currentPage,
          type: 'prize' // activity/prize/notice
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
.strategy ul li {
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
  overflow: hidden;
}
.strategy ul li a {
  font-size: 24px; /* px */
  padding: 4px;
}
.strategy ul li a:nth-child(2) {
  padding-right: 18px;
  font-size: 28px; /* px */
  color: #111;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.strategy ul li span:nth-child(3) {
  font-size: 24px; /* px */
  color: #999;
  white-space: nowrap;
  overflow: hidden;
}
</style>