<template>
  <div id="app" class="gameinfo">
    <div class="gameinfo__banner">
      <img class="banner" src="https://game.11h5.com/static/images/2017/0602/20170602044128254.jpg" alt="banner">
      <div class="gameinfo__icon flex flex-v">
        <img class="icon" src="https://game.11h5.com/static/images/2017/0421/20170421094832825.gif" alt="icon">
        <p>猫来了</p>
        <p>相亲相爱，不如来互相伤害！</p>
        <a class="btn btn--play" :href=" 'game.html?gameId=' + gameId ">开始游戏</a>
      </div>
    </div>
    <!-- 游戏简介 -->
    <div class="gameinfo__desc">
      <p class="font--desc">游戏简介</p>
      <p class="content--desc">
        时下最火爆的社交游戏《猫来了》，转盘疯狂赚金币，建岛开心打怪兽，猫猫带你环游世界！
      </p>
    </div>
    <!-- 游戏信息 -->
    <div class="gameinfo__desc">
      <p class="font--desc">游戏信息</p>
      <p class="content--desc">
        研发商：上海游光网络科技有限公司
      </p>
      <p class="content--desc">
        发行商：上海游光网络科技有限公司
      </p>
      <p class="content--desc">
        文网游备字：〔2017〕Ｍ-CSG 2002
      </p>
    </div>
    <menu-bar 
      :current-menu="currentMenu"></menu-bar>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Reports from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
export default {
  name: 'GameInfo',
  data() {
    return {
      currentMenu: 6,
      gameId: '',
    }
  },
  components: { MenuBar, Login },
  created: function () {
    this.gameId = CommonMethods.getUrlKey('gameId');
  },
  mounted: function () {
    this.$nextTick(function () {
      
    })
  }
}
</script>

<style scoped>
.gameinfo {
  background-color: #f5f5fa;
}
.gameinfo .gameinfo__banner {
  position: relative;
  margin-bottom: 20px;
  background-color: #fff;
}
.gameinfo .gameinfo__banner .banner {
  width: 100%;
  height: auto;
}
.gameinfo .gameinfo__banner .gameinfo__icon {
  margin-top: -100px;
  text-align: center;
}
.gameinfo__icon .icon {
  margin: 10px auto;
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.gameinfo__icon p:nth-child(2) {
  color: #333;
  font-size: 14px;
  padding: 10px 0;
}
.gameinfo__icon p:nth-child(3) {
  color: #888;
  font-size: 12px;
  padding: 10px 0;
}
.btn--play {
  margin: 10px auto;
  width: 50%;
  background: #2697fc;
  color: #fff;
  padding: 10px 0;
}
/* 游戏简介 */
.gameinfo__desc {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
}
.gameinfo__desc .font--desc {
  padding: 0 0 0 10px;
  border-left: 3px solid #2697fc;
  color: #333;
  font-size: 28px;
}
.gameinfo__desc .content--desc {
  padding: 10px 0;
  color: #888;
}
</style>
