<template>
  <div id="hotactivity" class="hotactivity">
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
export default {
  name: 'HotActivity',
  data() {
    return {
      title: '热门活动列表'
    }
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
  background-color: #fff;
}
.hotactivity .menu ul {
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
}
.hotactivity .menu ul li {
  text-align: center;
}
.hotactivity .menu ul li a {
  padding: 15px 20px;
  border: 1px solid #2697fc;
  color: #999;
  line-height: 24px;
}
.hotactivity .menu ul li a.router-link-active {
  color: #fff;
  background-color: #2697fc;
}
</style>