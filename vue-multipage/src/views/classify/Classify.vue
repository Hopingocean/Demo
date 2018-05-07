<template>
  <div id="app" class="classify">
    <div class="classify--search">
      <input type="search" v-model="searchText" placeholder="搜索游戏名称、类型">
      <img class="icon--search" :src="iconSearch" @click="search" alt="icon">
    </div>
    <!-- 游戏分类 -->
    <div class="classify__menu">
      <ul class="flex">
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/chess">
            <img v-if="this.$route.name == 'Chess'" :src="iconChess1" alt="icon">
            <img v-if="this.$route.name != 'Chess'" :src="iconChess0" alt="icon">
            <span>棋牌</span>
          </router-link>
        </li>
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/puzzle">
            <img v-if="this.$route.name == 'Puzzle'" :src="iconPuzzle1" alt="icon">
            <img v-if="this.$route.name != 'Puzzle'" :src="iconPuzzle0" alt="icon">
            <span>益智</span>
          </router-link>
        </li>
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/casual">
            <img v-if="this.$route.name == 'Casual'" :src="iconCasual1" alt="icon">
            <img v-if="this.$route.name != 'Casual'" :src="iconCasual0" alt="icon">
            <span>休闲</span>
          </router-link>
        </li>
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/role">
            <img v-if="this.$route.name == 'Role'" :src="iconRole1" alt="icon">
            <img v-if="this.$route.name != 'Role'" :src="iconRole0" alt="icon">
            <span>角色</span>
          </router-link>
        </li>
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/action">
            <img v-if="this.$route.name == 'Action'" :src="iconAction1" alt="icon">
            <img v-if="this.$route.name != 'Action'" :src="iconAction0" alt="icon">
            <span>动作</span>
          </router-link>
        </li>
        <li class="flex flex-list flex-v">
          <router-link class="flex flex-v" to="/shooting">
            <img v-if="this.$route.name == 'Shooting'" :src="iconShooting1" alt="icon">
            <img v-if="this.$route.name != 'Shooting'" :src="iconShooting0" alt="icon">
            <span>射击</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <menu-bar :current-menu="currentMenu"></menu-bar>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Search from '@/components/classify/Search'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconChess1 from '@/assets/images/search/icon_chess_1.png'
import iconChess0 from '@/assets/images/search/icon_chess_0.png'
import iconPuzzle1 from '@/assets/images/search/icon_puzzle_1.png'
import iconPuzzle0 from '@/assets/images/search/icon_puzzle_0.png'
import iconCasual1 from '@/assets/images/search/icon_casual_1.png'
import iconCasual0 from '@/assets/images/search/icon_casual_0.png'
import iconRole1 from '@/assets/images/search/icon_role_1.png'
import iconRole0 from '@/assets/images/search/icon_role_0.png'
import iconAction1 from '@/assets/images/search/icon_action_1.png'
import iconAction0 from '@/assets/images/search/icon_action_0.png'
import iconShooting1 from '@/assets/images/search/icon_shooting_1.png'
import iconShooting0 from '@/assets/images/search/icon_shooting_0.png'

import iconSearch from '@/assets/images/search/icon_search.png'

export default {
  name: 'Classify',
  components: { MenuBar, Login, Search },
  data() {
    return {
      agentId: '',
      loginStatus: false,
      currentMenu: 3,
      searchText: '',
      searchList: [],
      // icon
      iconChess1: iconChess1,
      iconChess0: iconChess0,
      iconPuzzle1: iconPuzzle1,
      iconPuzzle0: iconPuzzle0,
      iconCasual1: iconCasual1,
      iconCasual0: iconCasual0,
      iconRole1: iconRole1,
      iconRole0: iconRole0,
      iconAction1: iconAction1,
      iconAction0: iconAction0,
      iconShooting1: iconShooting1,
      iconShooting0: iconShooting0,

      iconSearch: iconSearch,
    }
  },
  created: function () {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  watch: {
    searchText(newVal, oldVal) {
      if (newVal == '') {
        this.$router.push('/');
      }
    }
  },
  methods: {
    search() {
      if (this.searchText) {
        const searchText = this.searchText;
        this.$router.push({
          name: 'Search',
          params: {
            searchText
          }
        });
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log(this.$route);
    })
  }
}
</script>

<style scoped>
.classify--search {
  position: relative;
  padding: 33px 40px 36px 40px;
}
.classify--search input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 76px 14px 35px;
  background-color: #eee;
  border-radius: 30px;
  font-size: 24px; /* px */
}
.classify--search .icon--search {
  box-sizing: border-box;
  padding: 12px;
  width: 76px;
  height: 76px;
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  font-size: 48px; /* px */
}
.classify__menu ul {
  padding: 0 20px 35px 20px;
  border-bottom: 2px solid #f0f0f0;
}
.classify__menu ul li {
  text-align: center;
}
.classify__menu ul li a {
  font-size: 28px; /* px */
  color: #111;
}
.classify__menu ul li a img {
  width: 56px;
  height: auto;
  margin: 0 auto 16px auto;
}
.classify__menu ul li a.router-link-active, a.router-link-active i {
  color: #FF9C00;
}
</style>
