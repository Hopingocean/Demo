<template>
  <div class="hotactivity">
    <!-- 菜单 -->
    <div class="menu">
      <ul class="flex">
        <li class="flex flex-list">
          <router-link class="flex flex-list flex-x-center" to="activity">活动</router-link>
        </li>
        <li class="flex-list">
          <router-link class="flex flex-list flex-x-center" to="prize">有奖</router-link>          
        </li>
        <li class="flex-list">
          <router-link class="flex flex-list flex-x-center" to="notice">公告</router-link>          
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
export default {
  name: 'HotActivity',
  data() {
    return {
      agentId: '',
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  mounted: function () {
    this.$nextTick(function () {
      // 判断当前激活路由
      if (this.$route.name == 'HotActivity') {
        this.$router.push('hotactivity/activity');
      }
    })
  }
}
</script>

<style scoped>
.hotactivity .menu {
  box-sizing: border-box;
  padding: 20px 36px;
  background-color: #fff;
}
.hotactivity .menu ul li:first-child a {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.hotactivity .menu ul li:last-child a {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.hotactivity .menu ul li {
  text-align: center;
}
.hotactivity .menu ul li:nth-child(2) a {
  border-left: none;
  border-right: none;
}
.hotactivity .menu ul li a {
  padding: 11px 20px;
  font-size: 28px; /* px */
  color: #ff9c00;
  border: 2px solid #ff9c00;
}
.hotactivity .menu ul li a.router-link-active {
  color: #fff;
  background-color: #ff9c00;
}
</style>