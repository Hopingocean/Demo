<template>
<div id="app" class="gameinfo">
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
        <div class="gameinfo__banner">
          <img class="banner" :src="gameInfo.title_image" alt="banner">
          <div class="gameinfo__icon flex flex-y-center">
            <img class="icon" :src="gameInfo.icon" alt="icon">
            <div class="gameinfo__name flex flex-list flex-v">
              <p>{{ gameInfo.name }}</p>
              <p>{{ gameInfo.desc }}</p>
            </div>
            <a class="btn btn--play" :href=" 'game.html?gameId=' + gameId + '&agentId=' + agentId">开始游戏</a>
          </div>
        </div>
        <!-- 游戏简介 -->
        <div class="gameinfo__desc">
          <p class="font--desc">游戏简介</p>
          <p id="game--desc" class="content--desc game--desc">
            {{ gameInfo.elaborate ? gameInfo.elaborate : '暂无' }}
            <span class="btn--all" v-show="isShow" @click="showAllDesc($event)">...全文</span>
          </p>
        </div>
        <!-- 礼包信息 -->
        <div class="gift">
          <p class="font--gift">礼包<span>{{ giftList.length }}个礼包未领取</span></p>
          <div class="gift__list">
            <ul>
              <li class="flex flex-list flex-y-center" v-for="(gift, j) in giftList" v-if="j < 1" :key="j">
                <div class="gift__info flex flex-list flex-v">
                  <p class="gift__name flex flex-y-center">
                    <span :class="gift.type == 1 ? 'gift--type1' : 'gift--type2'">{{ gift.type_name }}</span>
                    <span class="gift__title">{{ gift.title }}</span>
                  </p>
                  <p class="gift__desc">{{ gift.content }}</p>
                </div>
                <a href="javascript:void(0);" class="btn" @click="getGift(gift.id)">领取</a>
              </li>
            </ul>
            <ul>
              <li class="flex flex-list flex-y-center" v-for="(gift, j) in giftList" v-if="j >= 1" :key="j">
                <div class="gift__info flex flex-list flex-v">
                  <p class="gift__name flex flex-y-center">
                    <span :class="gift.type == 1 ? 'gift--type1' : 'gift--type2'">{{ gift.type_name }}</span>
                    <span class="gift__title">{{ gift.title }}</span>
                  </p>
                  <p class="gift__desc">{{ gift.content }}</p>
                </div>
                <a href="javascript:void(0);" class="btn" @click="getGift(gift.id)">领取</a>
              </li>
            </ul>
            <p class="btn--more" v-if="giftList.length > 1" @click.self="loadMoreGift($event)">
              查看更多礼包({{ giftList.length - 1 }})
              <img class="arrow--bottom" :src="iconArrowBottom" @click.self="loadMoreGift($event)" alt="icon">
            </p>
          </div>
        </div>
        <!-- 游戏信息 -->
        <!-- <div class="gameinfo__desc">
          <p class="font--desc">游戏信息</p>
          <p class="content--desc">
            研发商：{{ gameInfo.firm ? gameInfo.firm : '暂无' }}
            <br>
            发行商：{{ gameInfo.distributor ? gameInfo.distributor : '暂无' }}
          </p>
        </div> -->
        <!-- btn -->
        <div class="btn__group flex">
          <a href="javascript:void(window.history.go(-1));" class="btn--other btn--back">返回</a>
          <a :href=" 'game.html?gameId=' + gameId + '&agentId=' + agentId" class="btn--other btn--play flex-list">开始游戏</a>
        </div>
        <!-- components -->
        <login></login>
        <receive-gift :game-id="gameId" :gift-info="giftInfo"></receive-gift>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'
import ReceiveGift from '@/components/gift/ReceiveGift'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import iconArrowBottom from '@/assets/images/common/icon_arrow_bottom.png'

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
  name: 'GameDetail',
  components: {
    Login,
    ReceiveGift
  },
  data() {
    return {
      loginStatus: false,
      agentId: '',
      gameId: '',
      gameInfo: {},
      giftList: [],
      giftInfo: {},
      iconArrowBottom: iconArrowBottom,
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
      isShow: false,
    }
  },
  created: function() {
    this.gameId = CommonMethods.getUrlKey('gameId');
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    // 获取游戏详情
    getGameDetail() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.gameDetail,
        data: {
          id: that.gameId
        },
        success: function(data) {
          if (data.status) {
            that.gameInfo = data.data;
          }
        },
        error: function(error) {}
      }
      Request.ajax(options);
    },
    getGift(giftId) {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.userinfo,
        data: {},
        success: function(data) {
          if (data.status) {
            that.loginStatus = true;
            that.receiveGift(giftId);
          } else {
            that.showDialog('dialog__login');
          }
        },
        error: function(error) {}
      }
      Request.ajax(options);
    },
    showDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'block';
    },
    // 领取礼包
    receiveGift(giftId) {
      const that = this;
      const options = {
        type: 'post',
        url: Request.url.receiveGift,
        data: {
          gift_id: giftId,
        },
        success: function(data) {
          if (data.code == 'success' || data.code == 'gift_code_exist') {
            that.giftInfo = {
              status: true,
              giftCode: data.data.code
            };
          } else {
            that.giftInfo = {
              status: false,
              msg: data.msg
            };
          }
          that.showDialog('dialog__gift');
        },
        error: function(error) {
          that.giftInfo = {
            status: false,
            msg: '服务器出小差了'
          };
          that.showDialog('dialog__gift');
        }
      }
      Request.ajax(options);
    },
    // 获取某个应用的礼包列表
    getGiftList() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.giftList,
        data: {
          app_id: that.gameId
        },
        success: function(data) {
          if (data.status) {
            that.giftList = data.data.data[0].gift;
          }
        },
        error: function(error) {}
      }
      Request.ajax(options);
    },
    // 更多礼包
    loadMoreGift(event) {
      console.log(event);
      if (event.target.className == 'btn--more') {
        event.target.previousElementSibling.style.display = 'block';
        event.target.style.display = 'none';
      } else if (event.target.className == 'arrow--bottom') {
        event.target.parentNode.previousElementSibling.style.display = 'block';
        event.target.parentNode.style.display = 'none';
      }
    },
    // 获取游戏简介的行高
    getGameDescHeight() {
      const el = document.getElementById('game--desc');
      if (el.currentStyle) {
        var lineHeight = el.currentStyle['lineHeight'];
      } else {
        var lineHeight = getComputedStyle(el, false)['lineHeight'];
      }
      const height = document.getElementById('game--desc').offsetHeight;
      if (height / lineHeight > 3) {
        this.isShow = true;
      }
      console.log(lineHeight);
    },
    showAllDesc(event) {
      event.target.parentNode.style.height = 'auto';
      this.isShow = false;
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getGameDetail();
      // this.getGameDescHeight();
      this.getGiftList();
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
.gameinfo {
  min-height: 100%;
  background-color: #fff;
}

.gameinfo .gameinfo__banner {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.gameinfo .gameinfo__banner .banner {
  width: 100%;
  height: auto;
  min-height: 400px;
}

.gameinfo .gameinfo__banner .gameinfo__icon {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, .5);
}

.gameinfo__icon .icon {
  width: 128px;
  height: 128px;
  border-radius: 18px;
}

.gameinfo__name {
  padding: 0 20px;
  overflow: hidden;
}

.gameinfo__name p:nth-child(1) {
  color: #fff;
  font-size: 32px;
  /* px */
  padding: 8px 0;
}

.gameinfo__name p:nth-child(2) {
  padding: 8px 0;
  color: #fff;
  font-size: 24px;
  /* px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn--play {
  background: #ff9c00;
  color: #fff;
}


/* 游戏简介 */

.gameinfo__desc {
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}

.gameinfo__desc .font--desc {
  font-size: 32px;
  /* px */
  color: #111;
}

.gameinfo__desc .game--desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.gameinfo__desc .content--desc {
  position: relative;
  padding-top: 20px;
  color: #999;
  font-size: 24px;
  /* px */
  line-height: 36px;
  overflow: hidden;
}

.gameinfo__desc .btn--all {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9;
  color: #ff9c00;
  background-color: #fff;
  background: -webkit-linear-gradient(right, transparent, #fff 33%);
  background: -o-linear-gradient(right, transparent, #fff 33%);
  background: -moz-linear-gradient(right, transparent, #fff 33%);
  background: linear-gradient(to right, transparent, #fff 33%);
}


/* 礼包列表 */
.gift {
  padding-bottom: 20px;
  background-color: #fff;
}

.gift .font--gift {
  padding: 20px 40px 0 40px;
  font-size: 32px;
  color: #111;
}

.gift .font--gift span {
  padding-left: 10px;
  font-size: 24px;
  color: #999;
}

.gift__list ul:nth-child(2) {
  display: none;
}

.gift__list ul li {
  padding: 20px 40px;
  border-bottom: 2px solid #f0f0f0; /* px */
}

.gift__list ul li div {
  padding-right: 10px;
}

.gift__list .gift__info {
  overflow: hidden;
}

.gift__list .gift__name {
  padding-bottom: 13px;
  color: #111;
  font-size: 28px;
  /* px */
  white-space: nowrap;
}

.gift__list .gift__name .gift__title {
  padding-left: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gift__list .gift__name .gift--type1 {
  padding: 4px;
  font-size: 20px;
  /* px */
  color: #02be44;
  border-radius: 6px;
  border: 1px solid #02be44; /* no */
}

.gift__list .gift__name .gift--type2 {
  padding: 4px;
  font-size: 20px;
  /* px */
  color: #00cfdc;
  border-radius: 6px;
  border: 1px solid #00cfdc; /* no */
}

.gift__list .gift__desc {
  color: #999;
  font-size: 24px;
  /* px */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.btn--more {
  padding: 32px 0;
  color: #999;
  font-size: 24px;
  /* px */
  text-align: center;
  border-bottom: 2px solid #f0f0f0; /* px */
}

.btn--more .arrow--bottom {
  padding-left: 19px;
  width: 36px;
  height: auto;
}


/* btn */

.btn__group {
  padding: 25px 40px;
}

.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
</style>
