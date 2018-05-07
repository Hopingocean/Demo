<template>
  <div id="app" class="gameinfo">
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
        {{ gameInfo.desc ? gameInfo.desc : '暂无' }}
        <span class="btn--all" v-show="isShow" @click="showAllDesc($event)">...全文</span>
      </p>
    </div>
    <!-- 礼包信息 -->
    <!-- <div class="gift">
      <p class="font--gift">礼包<span>{{ gameInfo.gift.length }}个礼包未领取</span></p>
      <div class="gift__list">
        <ul>
          <li class="flex flex-y-center" v-for="(gift, j) in gameInfo.gift" v-if="j == 0" :key="gift.giftId">
            <div class="flex-list flex-v">
              <p class="gift__name">
                <span class="gift--type1">通服</span>
                {{ gift.giftName }}
              </p>
              <p class="gift__desc">{{ gift.giftDesc }}</p>
            </div>
            <a href="javascript:void(0);" class="btn" @click="getGift(gift.giftId)">领取</a>
          </li>
        </ul>
        <ul>
          <li class="flex flex-y-center" v-for="(gift, j) in gameInfo.gift" v-if="j > 0" :key="gift.giftId">
            <div class="flex-list flex-v">
              <p class="gift__name">
                <span class="gift--type2">普通</span>
                {{ gift.giftName }}
              </p>
              <p class="gift__desc">{{ gift.giftDesc }}</p>
            </div>
            <a href="javascript:void(0);" class="btn"  @click="getGift(gift.giftId)">领取</a>
          </li>
        </ul>
        <p class="btn--more" v-if="gameInfo.gift.length > 1" @click.self="loadMoreGift($event)">
          查看更多礼包({{ gameInfo.gift.length - 1 }})
          <img class="arrow--bottom" :src="iconArrowBottom" @click.self="loadMoreGift($event)" alt="icon">
        </p>
      </div>
    </div> -->
    <!-- 游戏信息 -->
    <div class="gameinfo__desc">
      <p class="font--desc">游戏信息</p>
      <p class="content--desc">
        {{ gameInfo.firm ? gameInfo.firm : '暂无' }}
      </p>
      <!-- <p class="content--desc">
        发行商：上海游光网络科技有限公司
      </p>
      <p class="content--desc">
        文网游备字：〔2017〕Ｍ-CSG 2002
      </p> -->
    </div>
    <!-- btn -->
    <div class="btn__group flex">
      <a href="javascript:void(window.history.go(-1));" class="btn btn--back">返回</a>
      <a :href=" 'game.html?gameId=' + gameId + '&agentId=' + agentId" class="btn btn--play flex-list">开始游戏</a>
    </div>
    <!-- components -->
    <login></login>
    <receive-gift :gift-info="giftInfo"></receive-gift>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'
import ReceiveGift from '@/components/gift/ReceiveGift'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconArrowBottom from '@/assets/images/common/icon_arrow_bottom.png'
export default {
  name: 'GameDetail',
  components: { Login, ReceiveGift },
  data() {
    return {
      agentId: '',
      loginStatus: false,
      gameId: '',
      gameInfo: {
        gameId: 1,
        gameName: '猫来了',
        gift: [
          {
            giftId: 1,
            giftName: '周年庆礼包',
            giftDesc: '宠物点化丹*1，宠物升级丹*20，绑定元宝*50'
          },
          {
            giftId: 2,
            giftName: '百元礼包',
            giftDesc: '宠物点化丹*10，宠物升级丹*200，绑定元宝*500'
          },
        ]
      },
      giftInfo: {
        gameId: '',
        status: 1,
        giftCode: '123456789'
      },
      iconArrowBottom: iconArrowBottom,
      isShow: false,
    }
  },
  created: function () {
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
        success: function (data) {
          if (data.status) {
            that.gameInfo = data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    getGift(giftId) {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.userinfo,
        data: {},
        success: function (data) {
          if (data.status) {
            that.loginStatus = true;
            that.receiveGift(giftId);
          } else {
            that.loginStatus = false;
            that.showDialog('dialog__login');
          }
        },
        error: function (error) {}
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
        type: 'get',
        url: Request.url.receiveGift,
        data: {
          gameId: that.gameId,
          giftId: giftId,
          agent_id: that.agentId
        },
        success: function (data) {
          if (data.status) {
            that.giftInfo = data.data.data;
            that.showDialog('dialog__gift');
          } else {
            that.giftInfo = data.data.data;
            that.showDialog('dialog__gift');
          }
        },
        error: function (error) {
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
          gameId: that.gameId
        },
        success: function (data) {
          if (data.status) {
            that.gameInfo = data.data.data;
          }
        },
        error: function (error) {}
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
      const height = document.getElementById('game--desc').offsetHeight;
      const lineHeight = document.getElementById('game--desc').style.lineHeight;
      document.getElementById('game--desc').style.height = 36 * 3 + 'px';
      if (height / 36 > 3) {
        this.isShow = true;
      }
      console.log(lineHeight);
    },
    showAllDesc(event) {
      event.target.parentNode.style.height = 'auto';
      this.isShow = false;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getGameDetail();
      this.getGameDescHeight();
      this.getGiftList();
    })
  }
}
</script>

<style scoped>
.gameinfo {
  background-color: #fff;
}
.gameinfo .gameinfo__banner {
  position: relative;

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
  padding: 40px;
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
  font-size: 32px; /* px */
  padding-bottom: 20px;
}
.gameinfo__name p:nth-child(2) {
  color: #fff;
  font-size: 24px; /* px */
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
  padding: 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.gameinfo__desc .font--desc {
  font-size: 32px; /* px */
  color: #111;
}
.gameinfo__desc .content--desc {
  position: relative;
  display: inline-block;
  padding-top: 20px;
  color: #999;
  font-size: 24px; /* px */
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
.gift .font--gift {
  padding: 40px 40px 0 40px;
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
    padding: 46px 40px;
    border-bottom: 2px solid #f0f0f0;
}
.gift__list ul li div {
  padding-right: 10px;
}
.gift__list .gift__name {
    padding-bottom: 13px;
    color: #111;
    font-size: 28px; /* px */
}
.gift__list .gift__name .gift--type1 {
    padding: 4px;
    font-size: 20px; /* px */
    color: #02be44;
    border-radius: 6px;
    border: 2px solid #02be44;
}
.gift__list .gift__name .gift--type2 {
    padding: 4px;
    font-size: 20px; /* px */
    color: #00cfdc;
    border-radius: 6px;
    border: 2px solid #00cfdc;
}
.gift__list .gift__desc {
    color: #999;
    font-size: 24px; /* px */
}
.btn--more {
    padding: 32px 0;
    color: #999;
    font-size: 24px; /* px */
    text-align: center;
    border-bottom: 2px solid #f0f0f0;
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
