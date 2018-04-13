<template>
  <div id="opengame" class="opengame">
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
export default {
  name: 'OpenGame',
  data() {
    return {
      title: '新开服游戏列表'
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
.opengame {
  background-color: #fff;
}
.opengame .menu ul {
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
}
.opengame .menu ul li {
  text-align: center;
}
.opengame .menu ul li a {
  padding: 15px 20px;
  border: 1px solid #2697fc;
  color: #999;
  line-height: 24px;
}
.opengame .menu ul li a.router-link-active {
  color: #fff;
  background-color: #2697fc;
}
</style>