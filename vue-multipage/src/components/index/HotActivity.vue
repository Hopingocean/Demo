<template>
  <div class="hotactivity">
    <!-- 菜单 -->
    <div class="menu">
      <ul class="flex">
        <li class=" flex flex-list">
          <a class="flex flex-list flex-x-center" href="javascript:void(0);" :class="activeMenu == 1 ? 'active' : ''" @click="viewMenu('activity', 1)">活动</a>
        </li>
        <!-- <li class=" flex flex-list">
          <a class="flex flex-list flex-x-center" href="javascript:void(0);" :class="activeMenu == 2 ? 'active' : ''" @click="viewMenu('prize', 2)">攻略</a>
        </li> -->
        <li class=" flex flex-list">
          <a class="flex flex-list flex-x-center" href="javascript:void(0);" :class="activeMenu == 3 ? 'active' : ''" @click="viewMenu('notice', 3)">公告</a>
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
      activityType: [],
      activeMenu: 1,
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name == 'HotActivity' || to.name == 'Activity') {
        this.activeMenu = 1;
      } else if (to.name == 'Prize') {
        this.activeMenu = 2;
      } else if (to.name == 'Notice') {
        this.activeMenu = 3;
      }
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 菜单选择
    viewMenu(name, n) {
      this.activeMenu = n;
      this.$router.push('/hotactivity/' + name);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 判断当前激活路由
      if (this.$route.name == 'HotActivity' || this.$route.name == 'Activity') {
        this.activeMenu = 1;
      } else if (this.$route.name == 'Prize') {
        this.activeMenu = 2;
      } else if (this.$route.name == 'Notice') {
        this.activeMenu = 3;
      }
    })
  }
}
</script>

<style scoped>
.hotactivity {
  padding-bottom: 120px;
}
.hotactivity .menu {
  box-sizing: border-box;
  padding: 20px 36px 0 36px;
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
  /* border-right: none; */
}
.hotactivity .menu ul li a {
  padding: 11px 20px;
  font-size: 28px; /* px */
  color: #ff9c00;
  border: 1px solid #ff9c00; /* no */
}
.hotactivity .menu ul li a.active {
  color: #fff;
  background-color: #ff9c00;
}
</style>