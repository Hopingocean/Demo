<template>
  <div class="gift__list">
    <ul>
      <li class="flex flex-y-center" v-for="gift in giftList" :key="gift.id">
          <div class="gift__info flex-list flex-v">
              <p class="gift__name flex flex-y-center">
                  <span :class="gift.type == 1 ? 'gift--type1' : 'gift--type2'">{{ gift.type_name }}</span>
                  <span class="gift__title">{{ gift.title }}</span>
              </p>
              <p class="gift__desc">{{ gift.content }}</p>
          </div>
          <a href="javascript:void(0);" class="btn" @click="getGift(gift.id)">领取</a>
      </li>
    </ul>
    <receive-gift :gift-info="giftInfo" :game-id="gameId"></receive-gift>
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
      gameId: '',
      giftList: [],
      giftInfo: {},
    }
  },
  created() {
    this.gameId = CommonMethods.getUrlKey('gameId');
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
    }
  },
  mounted() {
    this.getGiftList();
  },
}
</script>

<style scoped>
.gift__list {
  padding-bottom: 120px;
}
.gift__list .dialog__gift {
  border-radius: 0;
}
.gift__list ul:nth-child(2) {
  display: none;
}
.gift__list ul li {
  padding: 20px 40px;
  border-bottom: 1px solid #f0f0f0; /* no */
}
.gift__list ul li:last-child {
  border-bottom: none;
}
.gift__list ul li .gift__info {
  padding-right: 10px;
  overflow: hidden;
}
.gift__list .gift__name {
  padding: 8px 0;
  color: #111;
  font-size: 28px; /* px */
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
  font-size: 20px; /* px */
  color: #02be44;
  border-radius: 6px;
  border: 1px solid #02be44; /* no */
}
.gift__list .gift__name .gift--type2 {
  padding: 4px;
  font-size: 20px; /* px */
  color: #00cfdc;
  border-radius: 6px;
  border: 1px solid #00cfdc; /* no */
}
.gift__list .gift__desc {
  color: #999;
  font-size: 24px; /* px */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>