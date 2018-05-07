<template>
  <div class="hotSearch">
    <ul class="">
      <li class="" v-for="game in hotSearchList" :key="game.gameId">
        <a class="" :href="'game.html?gameId=' + game.gameId + '&agentId=' + agentId">
          <span>{{ game.gameName }}</span>
        </a>
      </li>
    </ul>
    <a :href="'game.html?gameId=' + recommendGame.gameId + '&agentId=' + agentId">
      <img :src="recommendGame.gameBanner" alt="banner">
    </a>
  </div>
</template>

<script>
import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
  name: 'HotSearch',
  data() {
    return {
      agentId: '',
      hotSearchList: [
        {
          gameId: '1',
          gameName: '命令与征服命令与征服'
        },
        {
          gameId: '2',
          gameName: '命令与征'
        },
        {
          gameId: '3',
          gameName: '命令与'
        },
        {
          gameId: '4',
          gameName: '命dddddd'
        },
        {
          gameId: '5',
          gameName: '命令与征服命令与征服'
        },
      ],
      recommendGame: {
        gameId: 6,
        gameBanner: 'https://game.11h5.com/static/images/2018/0404/20180404065347540.gif',
      }
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  watch: {

  },
  methods: {
    // 获取默认显示的热门搜索列表
    getHotSearchList() {
      const that = this;
      const option = {
        url: Request.url.hotSearch,
        type: 'GET',
        data: {
          
        },
        success: function (data) {
          if (data.status) {
            that.hotSearchList = data.data.data;
          }
        },
        error: function (error) {
           
        }
      }
      Request.ajax(option);
    },
    
  },
  mounted: function () {
    this.$nextTick(function () {
      
    })
  }
}
</script>

<style scoped>
.hotSearch {
  box-sizing: border-box;
  padding: 40px;
}
.hotSearch ul {
  margin-bottom: 30px;
}
.hotSearch ul li {
  display: inline-block;
  padding: 32px 44px;
  margin-right: 13px;
  margin-bottom: 13px;
  border: 2px solid #e2e2e2;
  border-radius: 12px;
  font-size: 24px; /* px */
}
.hotSearch img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
</style>

