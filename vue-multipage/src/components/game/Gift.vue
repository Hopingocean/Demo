<template>
  <div class="gift__list">
    <ul>
      <li class="flex flex-y-center" v-for="gift in giftList.gift" :key="gift.giftId">
          <div class="flex-list flex-v">
              <p class="gift__name">
                  <span class="gift--type1">通服</span>
                  {{ gift.giftName }}
              </p>
              <p class="gift__desc">{{ gift.giftDesc }}</p>
          </div>
          <a href="javascript:void(0);" class="btn" @click="getGift(gift.giftId)">领取</a>
      </li>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
        敬请期待...
        </span>
        <span slot="no-results">
        服务器开小差了...
        </span>
      </infinite-loading>
    </ul>
    <receive-gift :gift-info="giftInfo"></receive-gift>
  </div>
</template>

<script>
import ReceiveGift from '@/components/gift/ReceiveGift'

import InfiniteLoading from 'vue-infinite-loading';

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
  name: 'Gift',
  components: { InfiniteLoading, ReceiveGift },
  data() {
    return {
      agentId: '',
      giftList: {
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
        status: 1,
        giftCode: '123456789'
      },
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
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
    getGiftList($state) {
        $state.complete();
    },
    // 滚动加载
    infiniteHandler($state) {
        this.getGiftList($state);
    }
  },
}
</script>

<style scoped>
.gift__list {
  padding-bottom: 120px;
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
</style>