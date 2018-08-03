<template>
  <div id="app" class="gift">
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
            <div class="scroll">
                <div class="gift--search">
                    <input type="search" v-model="searchText" @keyup.enter="search" placeholder="搜索游戏名称">
                    <img class="icon--search" :src="iconSearch" @click="search" alt="icon">
                </div>
                <router-view></router-view>
            </div>
            <menu-bar :current-menu="currentMenu"></menu-bar>
        </div>
    </div>
    <login></login>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import iconSearch from '@/assets/images/search/icon_search.png'

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

export default {
    name: 'Gift',
    components: { MenuBar, Login, InfiniteLoading },
    data() {
        return {
            agentId: '',
            currentMenu: 2,
            searchText: '',
            // icon
            iconSearch: iconSearch,
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
    mounted() {
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
    }
}
</script>

<style scoped>
.gift--search {
  position: relative;
  padding: 30px 40px 20px 40px;
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
  top: 55%;
  right: 40px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  font-size: 48px; /* px */
}
</style>
