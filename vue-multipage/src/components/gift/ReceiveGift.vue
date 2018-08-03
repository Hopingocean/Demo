<template>
<div class="dialog__gift" @click.self="hideDialog('dialog__gift')">
  <div class="dialog__content">
    <img class="icon--close" :src="iconClose" @click="hideDialog('dialog__gift')" alt="icon">
    <!-- 领取成功 -->
    <div class="success" v-show="giftInfo.status">
      <p>恭喜你，领取成功</p>
      <p>{{ giftInfo.giftCode }}</p>
      <p>礼包卡号(长按礼包码复制)</p>
    </div>
    <!-- 库存不足/领取失败 -->
    <div class="error" v-show="!giftInfo.status">
      <p>领取失败</p>
      <p>{{ giftInfo.msg }}</p>
    </div>
    <!-- btn -->
    <div class="btn__group flex">
      <a href="javascript:void(0);" @click="hideDialog('dialog__gift')" class="btn--other btn--cancel">取消</a>
      <a :href="'game.html?gameId=' + gameId + '&agentId=' + agentId" class="btn--other btn--commit flex-list">进入游戏</a>
    </div>
  </div>
</div>
</template>

<script>
import Request from "@/assets/js/api";
import CommonMethods from "@/assets/js/common";

import iconClose from "@/assets/images/common/icon_close.png";

export default {
  name: "ReceiveGift",
  data() {
    return {
      agentId: "",
      // icon
      iconClose: iconClose
    };
  },
  props: {
    giftInfo: {
      type: Object
    },
    gameId: {}
  },
  methods: {
    hideDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = "none";
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey("agentId") ?
      CommonMethods.getUrlKey("agentId") :
      "";
  }
};
</script>

<style scoped>
.dialog__gift {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog__content {
  position: absolute;
  width: 65%;
  max-width: 600px;
  padding: 60px 40px 40px 40px;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-sizing: border-box;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  background-color: #fff;
  border-radius: 12px;
  text-align: center;
}

.dialog__content .icon--close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: auto;
}

.dialog__content .success p:first-child {
  font-size: 32px;
  /* px */
  color: #111;
}

.dialog__content .success p:nth-child(2) {
  padding: 80px 0 10px 0;
  font-size: 28px;
  /* px */
  color: #111;
  word-break: break-all;
  border-bottom: 2px solid #f0f0f0;
}

.dialog__content .success p:last-child {
  padding: 10px 0 80px 0;
  font-size: 24px;
  /* px */
  color: #999;
}

.dialog__content .error p:first-child {
  font-size: 28px;
  /* px */
  color: #111;
}

.dialog__content .error p:last-child {
  padding: 10px 0 200px 0;
  font-size: 28px;
  /* px */
  color: #111;
}


/* btn */

.btn__group .btn--cancel {
  margin-right: 10px;
  color: #ff9c00;
}

.btn__group .btn--commit {
  color: #fff;
  background-color: #ff9c00;
}
</style>


