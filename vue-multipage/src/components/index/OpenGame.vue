<template>
  <div class="opengame">
    <!-- 菜单 -->
    <div class="menu">
      <ul class="flex">
        <li class="flex-list">
          <a class="flex flex-list flex-x-center" href="javascript:void(0);" :class="activeMenu == 1 ? 'active' : ''" @click="viewMenu('newopen', 1)">已开新服</a>
        </li>
        <li class="flex-list">
          <a class="flex flex-list flex-x-center" href="javascript:void(0);" :class="activeMenu == 2 ? 'active' : ''" @click="viewMenu('soonopen', 2)">新服预告</a>          
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
  name: 'OpenGame',
  data() {
    return {
      activeMenu: 1,
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name == 'NewOpen' || to.name == 'OpenGame') {
        this.activeMenu = 1;
      } else if (to.name == 'SoonOpen') {
        this.activeMenu = 2;
      }
    }
  },
  methods: {
    // 切换菜单
    viewMenu(path, n) {
      this.$router.push('/opengame/' + path);
      this.activeMenu = n;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 判断当前激活路由
      if (this.$route.name == 'NewOpen' || this.$route.name == 'OpenGame') {
        this.activeMenu = 1;
      } else if (this.$route.name == 'SoonOpen') {
        this.activeMenu = 2;
      }
    })
  }
}
</script>

<style scoped>
.opengame {
  padding-bottom: 120px;
}
.opengame .menu {
  box-sizing: border-box;
  padding: 20px 36px;
  background-color: #fff;
}
.opengame .menu ul li:first-child a {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.opengame .menu ul li:last-child a {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.opengame .menu ul li {
  text-align: center;
}
.opengame .menu ul li a {
  padding: 11px 20px;
  font-size: 28px; /* px */
  color: #ff9c00;
  border: 1px solid #ff9c00; /* no */
}
.opengame .menu ul li a.active {
  color: #fff;
  background-color: #ff9c00;
}
</style>