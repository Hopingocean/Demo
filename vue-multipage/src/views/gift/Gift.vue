<template>
  <div id="app" class="gift">
    <div class="gift--search">
      <input type="text" v-model="searchText" placeholder="搜索游戏名称、类型">
      <img class="icon--search" :src="iconSearch" @click="search" alt="icon">
    </div>
    <router-view></router-view>
    <menu-bar
      :current-menu="currentMenu"
    ></menu-bar>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconSearch from '@/assets/images/search/icon_search.png'

export default {
    name: 'Gift',
    components: { MenuBar, Login, InfiniteLoading },
    data() {
        return {
            agentId: '',
            currentMenu: 2,
            iconSearch: iconSearch,
            searchText: '',
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
    mounted() {}
}
</script>

<style scoped>
.gift--search {
  position: relative;
  padding: 33px 40px 36px 40px;
  background-color: #fff;
}
.gift--search input {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 76px 14px 35px;
  background-color: #eee;
  border-radius: 30px;
  font-size: 24px; /* px */
}
.gift--search .icon--search {
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
</style>
