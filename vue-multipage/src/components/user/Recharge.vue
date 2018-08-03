<template>
<div class="recharge">
  <div class="recharge__money">
    <div class="user__info flex flex-y-center">
      <div class="icon">
        <img :src="userinfo.icon" alt="头像">
      </div>
      <div class="userinfo flex flex-v flex-list">
        <span class="username">{{ userinfo.username }}</span>
        <span class="userId">UID:{{ userinfo.reg_time }}</span>
      </div>
      <div class="flex flex-v">
        <p class="balance">余额</p>
        <p class="money">123456</p>
      </div>
    </div>
    <!-- 充值金额 -->
    <div class="recharge__list">
      <div class="title flex flex-y-center">
        <img :src="iconMoney" alt="icon">
        <p class="flex-list">充值金额</p>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="list">
        <ul class="">
          <li class="active">
            <input type="radio" id="recharge_10" value="10元" v-model="money" @click="select($event)">
            <label for="recharge_10">10元</label>
          </li>
          <li class="">
            <input type="radio" id="recharge_20" value="20元" v-model="money" @click="select($event)">
            <label for="recharge_20">20元</label>
          </li>
          <li class="">
            <input type="radio" id="recharge_50" value="50元" v-model="money" @click="select($event)">
            <label for="recharge_50">50元</label>
          </li>
          <li class="">
            <input type="radio" id="recharge_100" value="100元" v-model="money" @click="select($event)">
            <label for="recharge_100">100元</label>
          </li>
          <li class="">
            <input type="radio" id="recharge_200" value="200元" v-model="money" @click="select($event)">
            <label for="recharge_200">200元</label>
          </li>
          <li class="">
            <input type="radio" id="recharge_500" value="500元" v-model="money" @click="select($event)">
            <label for="recharge_500">500元</label>
          </li>
        </ul>
        <p>您选择的充值金额为:</p>
        <p>{{ money }}</p>
        <!-- btn -->
        <div class="btn__group flex">
          <a href="javascript:void(0);" @click="prevPage('personal', 'recharge__money')" class="btn--other btn--back">返回</a>
          <a href="javascript:void(0);" @click="nextPage('recharge__mode', 'recharge__money')" class="btn--other btn--commit flex-list">立即充值</a>
        </div>
      </div>
    </div>
  </div>
  <!-- 订单 -->
  <div class="recharge__mode">
    <div class="title flex">
      <span>充值项目</span>
      <span class="flex-list">余额充值</span>
    </div>
    <div class="title flex">
      <span>商品名称</span>
      <span class="flex-list">余额</span>
    </div>
    <p class="font--choice">付款方式选择</p>
    <ul>
      <li class="flex flex-y-center">
        <img :src="iconWechat" alt="icon">
        <div class="flex flex-v flex-list">
          <p>微信支付</p>
          <p>微信安全支付</p>
        </div>
        <input type="radio" id="wechat" value="微信支付" v-model="rechargeMode">
        <label for="wechat"></label>
      </li>
      <li class="flex flex-y-center">
        <img :src="iconAlipay" alt="icon">
        <div class="flex flex-v flex-list">
          <p>支付宝支付</p>
          <p>支付宝安全支付</p>
        </div>
        <input type="radio" id="alipay" value="支付宝支付" v-model="rechargeMode">
        <label for="alipay"></label>
      </li>
      <li class="flex flex-y-center">
        <img :src="iconBalance" alt="icon">
        <div class="flex flex-v flex-list">
          <p>余额支付</p>
          <p>余额安全支付</p>
        </div>
        <input type="radio" id="balance" value="余额支付" v-model="rechargeMode">
        <label for="balance"></label>
      </li>
    </ul>
    <p class="font--money">您选择的充值金额为:</p>
    <p class="money">{{ money }}</p>
    <!-- btn -->
    <div class="btn__group flex">
      <a href="javascript:void(0);" @click="prevPage('recharge__money', 'recharge__mode')" class="btn--other btn--back">返回</a>
      <a href="javascript:void(0);" @click="pay" class="btn--other btn--commit flex-list">立即充值</a>
    </div>
    <!-- 客服电话 -->
    <div class="custom">
      <p>客服电话(工作日9:00-18:00)</p>
      <p><a href="tel:0571-8888888">0571-8888888</a></p>
    </div>
  </div>
</div>
</template>

<script>
import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common';

import iconSelect from '@/assets/images/user/icon_select.png'
import iconMoney from '@/assets/images/user/icon_money.png'
import iconWechat from '@/assets/images/user/icon_wechat.png'
import iconAlipay from '@/assets/images/user/icon_alipay.png'
import iconBalance from '@/assets/images/user/icon_balance.png'
import iconArrowRight from '@/assets/images/common/icon_arrow_right.png'
export default {
  name: 'Recharge',
  data() {
    return {
      agentId: '',
      money: '10元',
      rechargeMode: '微信支付',
      // icon
      iconSelect: iconSelect,
      iconMoney: iconMoney,
      iconWechat: iconWechat,
      iconAlipay: iconAlipay,
      iconBalance: iconBalance,
      iconArrowRight: iconArrowRight,
    }
  },
  props: {
    userinfo: {
      type: Object
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  methods: {
    showDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'block';
    },
    hideDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'none';
    },
    prevPage(el1, el2) {
      this.showDialog(el1);
      this.hideDialog(el2);
    },
    nextPage(el1, el2) {
      this.showDialog(el1);
      this.hideDialog(el2);
    },
    select(event) {
      const li = event.target.parentNode.parentNode.children;
      for (let i = 0; i < li.length; i++) {
        li[i].className = '';
      }
      event.target.parentNode.className = 'active';
    },
    pay() {
      const that = this;
      const option = {
        url: Request.url.pay,
        type: 'POST',
        data: {},
        success: function (data) {

        },
        error: function (err) {}
      }
      Request.ajax(options);
    }
  }
}
</script>

<style scoped>
.recharge__money {
  display: none;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 120px;
  background-color: #f0f0f0;
}
/* userinfo */
.recharge .user__info {
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: #fff;
  margin-bottom: 24px;
}
.recharge .userinfo {
  padding-left: 24px;
}
.recharge .user__info .username {
  padding-bottom: 20px;
  font-size: 32px; /* px */
  color: #111;
}
.recharge .user__info .balance {
  padding-bottom: 20px;
  font-size: 28px; /* px */
  color: #111;
  text-align: right;
}
.recharge .user__info .userId, .money {
  font-size: 28px; /* px */
  color: #999;
}
.recharge .user__info img {
  width: 128px;
  height: 128px;
  text-align: center;
  border-radius: 50%;
}
/* 充值 */
.recharge__list {
  background-color: #fff;
}
.recharge__list .title {
  padding: 20px 40px;
  border-bottom: 2px solid #f0f0f0;
}
.recharge__list .title > img {
  width: 60px;
  height: auto;
  text-align: center;
}
.recharge__list .title p {
  padding-left: 40px;
  font-size: 32px; /* px */
  color: #111;
}
.recharge__list .title img:last-child {
  width: 20px;
  height: auto;
}
/* 列表 */
.recharge__list .list {
  padding: 40px;
}
.recharge__list .list p {
  padding: 20px 0;
  font-size: 32px; /* px */
  color: #999;
  text-align: center;
}
.recharge__list .list p:last-child {
  font-size: 56px; /* px */
  color: #111;
  text-align: center;
}
.recharge__list ul {
  text-align: center;
}
.recharge__list ul li {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 45%;
  padding: 28px 0;
  margin: 10px;
  border: 1px solid #f0f0f0; /* no */
  border-radius: 12px;
  font-size: 32px; /* px */
  color: #111;
  text-align: center;
}
.recharge__list ul li.active {
  border: 1px solid #ff9c00; /* no */
  background-image: url('../../assets/images/user/icon_select.png');
  background-size: 42px;
  background-position: 0 0;
  background-repeat: no-repeat;
}
.recharge__list ul li input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
/* 充值方式 */
.recharge__mode {
  display: none;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 120px;
  background-color: #f0f0f0;
}
.recharge__mode .title {
  padding: 40px 30px;
  border-bottom: 2px solid #f0f0f0;
  background-color: #fff;
}
.recharge__mode .title span:first-child {
  font-size: 32px;
  color: #999;
}
.recharge__mode .title span:last-child {
  padding-left: 36px;
  font-size: 32px; /* px */
  color: #111;
}
.recharge__mode .font--choice {
  padding: 14px 40px;
  font-size: 28px; /* px */
  color: #999;
  background-color: #f0f0f0;
}
.recharge__mode ul {
  background-color: #fff;
}
.recharge__mode ul li {
  position: relative;
  padding: 26px 40px;
  border-bottom: 2px solid #f0f0f0;
}
.recharge__mode ul li div p:first-child {
  padding-left: 28px;
  padding-bottom: 20px;
  font-size: 32px; /* px */
  color: #111;
}
.recharge__mode ul li div p:last-child {
  padding-left: 28px;
  font-size: 24px; /* px */
  color: #999;
}
.recharge__mode ul li img {
  width: 128px;
  height: 128px;
}
.recharge__mode ul li input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.recharge__mode ul li input[type='radio']  + label::before {
  content: "";  /*不换行空格*/
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #999; /* no */
}
.recharge__mode ul li input[type='radio']:checked  + label::before {
  content: "";
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: #ff9c00;
  border: 1px solid #ff9c00; /* no */
}
.recharge__mode ul li input[type='radio']:checked  + label {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ff9c00; /* no */
  text-align: center;
}
.recharge__mode .font--money {
  padding: 56px 0 27px 0;
  font-size: 32px; /* px */
  color: #999;
  text-align: center;
  background-color: #fff;
}
.recharge__mode .money {
  padding-bottom: 30px;
  font-size: 56px; /* px */
  color: #111;
  text-align: center;
  background-color: #fff;
}
.recharge__mode .custom {
  padding: 20px 0;
  text-align: center;
  background-color: #f0f0f0;
}
.recharge__mode .custom p:first-child {
  padding-bottom: 16px;
  font-size: 24px;
  color: #999;
}
.recharge__mode .custom p:last-child {
  font-size: 32px;
  color: #111;
}
/* btn */
.btn__group {
  padding: 0 40px 20px 40px;
  background-color: #fff;
}
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--commit {
  color: #fff;
  background-color: #ff9c00;
}
</style>

