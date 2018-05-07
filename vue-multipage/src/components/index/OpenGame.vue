<template>
  <div class="opengame">
    <!-- 菜单 -->
    <div class="menu">
      <ul class="flex">
        <li class="flex flex-list">
          <router-link class="flex flex-list flex-x-center" to="newopen">已开新服</router-link>
        </li>
        <li class="flex-list">
          <router-link class="flex flex-list flex-x-center" to="soonopen">新服预告</router-link>          
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
      
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 判断当前激活路由
      if (this.$route.name == 'OpenGame') {
        this.$router.push('opengame/newopen');
      }
    })
  }
}
</script>

<style scoped>
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
  border: 2px solid #ff9c00;
}
.opengame .menu ul li a.router-link-active {
  color: #fff;
  background-color: #ff9c00;
}
</style>