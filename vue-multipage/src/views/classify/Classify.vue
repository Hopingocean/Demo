<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div class="menu--top">
      <div class="flex">
        <a href="javascript:void(0);" class="flex-list">
          <img class="icon__logo" :src="iconLogo" alt="icon">
        </a>
        <a href="javascript:void(0);" class="flex flex-y-center">
          <!-- <img :src="iconPhone" alt="icon" class="icon__phone">
          <span>下载App</span> -->
        </a>
        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf" target="_blank" class="flex flex-y-center">
          <img :src="iconPcCustom" alt="icon" class="icon__custom">
          <span>客服</span>
        </a>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="tip--footer">
      <img :src="monster1" alt="icon1">
      <img :src="monster2" alt="icon1">
      <div class="content">
        <!-- <ul class="">
          <li class="">
            <a href="javascript:void(0);">家长监护 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">纠纷处理 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">关于我们 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">开放平台</a>
          </li>
        </ul> -->
        <p>浙网文〔2016〕0261-131号 | 浙ICP备12003105号-1 | 浙B2-20120158-4 浙公网安备 33071802100104号</p>
        <p>Copyright2014-2018 All Rights Reserved</p>
        <p>抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
      </div>
      <img :src="monster3" alt="icon1">
      <img :src="monster4" alt="icon1">
    </div>
    <div class="wrap__box">
      <!-- pc端背景中的内容 -->
      <div class="bg__content">
        <!-- 点击即玩 -->
        <div class="tip--left">
          <img :src="iconTip1" alt="icon">
          <img :src="iconTip2" alt="icon">
        </div>
        <!-- phone -->
        <div class="flex flex-v leftBtn">
            <i></i>
            <i></i>
            <i></i>
        </div>
        <div class="flex flex-v topBtn">
            <i></i>
            <div class="flex">
                <i></i>
                <i></i>
            </div>
        </div>
        <div class="bottomBtn flex">
          <i></i>
        </div>
        <!-- 二维码 -->
        <div class="code">
          <img class="code--border" :src="codeBorder" alt="icon">
          <!-- 公众号 -->
          <img :src="qrCode" alt="二维码" class="qrCode">
        </div>
      </div>
      <div class="wrap">
        <div class="scroll classify">
          <div class="classify--search">
            <input type="search" v-model="searchText" @keyup.enter="search" placeholder="搜索游戏名称、类型">
            <img class="icon--search" :src="iconSearch" @click="search" alt="icon">
          </div>
          <!-- 游戏分类 -->
          <div class="classify__menu">
            <ul class="flex">
              <li class="flex flex-list flex-v" v-for="classify in classifyList" :key="classify.id">
                <router-link class="flex flex-v" :to=" '/' + classify.id">
                  <img v-if="classify.name == '棋牌'" :src="typeId == classify.id ? iconChess1 : iconChess0" alt="icon">
                  <span v-if="classify.name == '棋牌'">棋牌</span>
                  <img v-if="classify.name == '益智'" :src="typeId == classify.id ? iconPuzzle1 : iconPuzzle0" alt="icon">
                  <span v-if="classify.name == '益智'">益智</span>
                  <img v-if="classify.name == '休闲'" :src="typeId == classify.id ? iconCasual1 : iconCasual0" alt="icon">
                  <span v-if="classify.name == '休闲'">休闲</span>
                  <img v-if="classify.name == '角色'" :src="typeId == classify.id ? iconRole1 : iconRole0" alt="icon">
                  <span v-if="classify.name == '角色'">角色</span>
                  <img v-if="classify.name == '动作'" :src="typeId == classify.id ? iconAction1 : iconAction0" alt="icon">
                  <span v-if="classify.name == '动作'">动作</span>
                  <img v-if="classify.name == '射击'" :src="typeId == classify.id ? iconShooting1 : iconShooting0" alt="icon">
                  <span v-if="classify.name == '射击'">射击</span>
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <!-- components -->
        <menu-bar :current-menu="currentMenu"></menu-bar>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Search from '@/components/classify/Search'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

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

import iconLogo from '@/assets/images/pc/icon_logo.png'
import iconPhone from '@/assets/images/pc/icon_phone.png'
import iconPcCustom from '@/assets/images/pc/icon_custom.png'
import iconTip1 from '@/assets/images/pc/icon_tip1.png'
import iconTip2 from '@/assets/images/pc/icon_tip2.png'
import codeBorder from '@/assets/images/pc/codeBorder.png'
import qrCode from '@/assets/images/pc/qrCode.jpg'
import monster1 from '@/assets/images/pc/monster1.png'
import monster2 from '@/assets/images/pc/monster2.png'
import monster3 from '@/assets/images/pc/monster3.png'
import monster4 from '@/assets/images/pc/monster4.png'

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
      classifyList: [],
      typeId: '',
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

      iconLogo: iconLogo,
      iconPcCustom: iconPcCustom,
      iconPhone: iconPhone,
      iconTip1: iconTip1,
      iconTip2: iconTip2,
      qrCode: qrCode,
      codeBorder: codeBorder,
      monster1: monster1,
      monster2: monster2,
      monster3: monster3,
      monster4: monster4,

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
    },
    '$route'(to, from) {
      this.typeId = this.$route.params.typeId;
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
    },
    // 获取游戏分类列表
    getClassifyList() {
      const that = this;
      const options = {
        url: Request.url.gameType,
        type: 'GET',
        data: {},
        success: function(data) {
          if (data.status) {
            that.classifyList = data.data.data;
          }
        },
        error: function (err) {}
      }
      Request.ajax(options);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$router.push('/');
      this.getClassifyList();
      // 初始化分享信息
      const shareInfo = {
        title: '集结号微游-游戏中心',
        desc: '无需下载，点击即玩！集结号微游-游戏中心，海量游戏在线玩！',
        imgUrl: 'https://static.12h5.com/120.png',
        link: location.origin
      }
      if (wxApi.isWeChat()) {
        wxApi.wxInit(shareInfo);
      }
      wxApi.qqShare(shareInfo);
    })
  }
}
</script>

<style scoped>
.classify {
  overflow-y: scroll;
}
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
