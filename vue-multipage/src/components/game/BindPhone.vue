<template>
  <div class="bindPhone">
    <div class="userinfo">
      <img class="avator" :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="icon">
    </div>
    <div class="inputBox phone">
      <img :src="iconStatus == 1 ? iconMobile1 : iconMobile0" alt="icon">
      <input :class="iconStatus == 1 ? 'active' : ''" type="tel" v-model="phone" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入手机号码">
    </div>
    <div class="inputBox imgCode">
      <img :src="iconStatus == 3 ? iconCode1 : iconCode0" alt="icon">
      <input :class="iconStatus == 3 ? 'active' : ''" type="text" v-model="imgCode" @focus="iconStatus = 3" @blur="iconStatus = 0" placeholder="请输入图片验证码">
      <img :src="imgCodeSrc" @click="refreshCode" alt="code">
    </div>
    <div class="inputBox mobileCode">
      <img :src="iconStatus == 4 ? iconCode1 : iconCode0" alt="icon">
      <input :class="iconStatus == 4 ? 'active' : ''" type="text" v-model="mobileCode" @focus="iconStatus = 4" @blur="iconStatus = 0" placeholder="请输入手机验证码">
      <span class="btn--code" v-if="status == 1" @click="getMobileCode">获取验证码</span>
      <span class="countdown" v-if="status != 1">{{ countdown }}S</span>
    </div>
    <p class="tip">完成手机绑定账号更安全</p>
    <!-- btn -->
    <div class="btn__group flex">
      <a href="javascript:void(0);" @click="hideDialog('bindPhone')" class="btn--other btn--back">返回</a>
      <a href="javascript:void(0);" @click="bindPhone" class="btn--other btn--commit flex-list">完成绑定</a>
    </div>
    <!-- components -->
    <dialog-tip class="bindPhone__tip" :tip="tip"></dialog-tip>
  </div>
</template>

<script>
import DialogTip from '@/components/tips/DialogTip'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common';

import iconUser from '@/assets/images/common/icon_user_1.png'
import iconMobile0 from '@/assets/images/login/icon_mobile_0.png'
import iconMobile1 from '@/assets/images/login/icon_mobile_1.png'
import iconPassword0 from '@/assets/images/login/icon_password_0.png'
import iconPassword1 from '@/assets/images/login/icon_password_1.png'
import iconCode0 from '@/assets/images/login/icon_code_0.png'
import iconCode1 from '@/assets/images/login/icon_code_1.png'
export default {
  name: 'BindPhone',
  components: { DialogTip },
  data() {
    return {
      agentId: '',
      phone: '',
      password: '',
      imgCode: '',
      mobileCode: '',
      countdown: 60,
      status: 1,
      tip: '',
      imgCodeSrc: '',
      // icon
      iconStatus: 1, // 1,2,3,4分别表示几个图标
      iconMobile0: iconMobile0,
      iconMobile1: iconMobile1,
      iconPassword0: iconPassword0,
      iconPassword1: iconPassword1,
      iconCode0: iconCode0,
      iconCode1: iconCode1,
      iconUser: iconUser,
    }
  },
  props: {
    userinfo: {
      type: Object
    },
    refreshBindCode: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    refreshBindCode(newVal, oldVal) {
      if (newVal) {
        this.refreshCode();
      }
    },
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
    bindPhone() {
      const that = this;
      if (!that.phone || !CommonMethods.checkMobile(that.phone)) {
        that.tip = '请填写正确的手机号';
        that.showDialog('bindPhone__tip');
        return;
      }
      if (!that.imgCode) {
        that.tip = '请填写图片验证码';
        that.showDialog('bindPhone__tip');
        return;
      }
      if (!that.mobileCode) {
        that.tip = '请填写手机号验证码';
        that.showDialog('bindPhone__tip');
        return;
      }
      const options = {
        url: Request.url.bindPhone,
        type: 'POST',
        data: {
          mobile_code: that.mobileCode
        },
        success: function (data) {
          if(data.status) {
            that.tip = '绑定成功';
            that.showDialog('bindPhone__tip');
            setTimeout(function () {
              window.location.reload();
            }, 1000)
          } else {
            that.tip = data.msg;
            that.showDialog('bindPhone__tip');
          }
        },
        error: function (err) {
          that.tip = '绑定失败，请稍后重试';
          that.showDialog('bindPhone__tip');
        }
      }
      Request.ajax(options);
    },
    getMobileCode() {
      const that = this;
      if (!that.phone || !CommonMethods.checkMobile(that.phone)) {
        that.tip = '请填写正确的手机号';
        that.showDialog('bindPhone__tip');
        return;
      }
      if (!that.imgCode) {
        that.tip = '请填写图片验证码';
        that.showDialog('bindPhone__tip');
        return;
      }
      const options = {
        url: Request.url.mobileCode,
        type: 'POST',
        data: {
          mobile: that.phone,
          captcha: that.imgCode
        },
        success: function (data) {
          if(data.status) {
            that.status = 0;
            const t = setInterval(function () {
              if (that.countdown > 0) {
                that.countdown--;
                return;
              }
              clearInterval(t);
              that.status = 1;
              that.countdown = 60;
            }, 1000)
          } else {
            that.tip = data.msg;
            that.showDialog('bindPhone__tip');
          }
        },
        error: function (err) {
          that.tip = '发送失败，请稍后重试';
          that.showDialog('bindPhone__tip');
        }
      }
      Request.ajax(options);
    },
    // 刷新图片验证码
    refreshCode() {
      const that = this;
      that.imgCodeSrc = Request.url.imgCode + '?v=' + Math.random() * 10;
    }
  },
  mounted() {}
}
</script>

<style scoped>
.bindPhone__tip {
  display: none;
}
.bindPhone {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: none;
  margin: 0 auto;
  padding: 120px 40px;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  background-color: #fff;
}
.userinfo {
  text-align: center;
}
.userinfo .avator {
  margin-bottom: 80px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
}
/* input box */
.bindPhone .inputBox {
  position: relative;
  padding-top: 30px;
}
.inputBox img:first-child {
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 60px;
  height: auto;
}
.inputBox input {
  box-sizing: border-box;
  padding: 20px 0 20px 100px;
  width: 100%;
  font-size: 28px; /* px */
  color: #999;
  border: none;
  border-bottom: 2px solid #f0f0f0;
}
.inputBox input.active {
  border-bottom: 2px solid #ff9c00;
}
.bindPhone .imgCode input {
  padding-right: 196px;
}
.bindPhone .imgCode img:last-child {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  width: 196px;
  height: auto;
}
.bindPhone .mobileCode input {
  padding-right: 140px;
}
.bindPhone .mobileCode .btn--code {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  padding: 10px 0;
  width: 140px;
  font-size: 24px; /* px */
  color: #ff9c00;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ff9c00; /* no */
}
.bindPhone .mobileCode .countdown {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  padding: 12px;
  width: 140px;
  font-size: 24px; /* px */
  color: #ff9c00;
  border-radius: 8px;
}
.bindPhone .tip {
  padding: 20px 0 69px 0;
  font-size: 24px; /* px */
  color: #999;
  text-align: center;
}
/* btn */
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--commit {
  color: #fff;
  background-color: #ff9c00;
}
input {
  border-radius: 0;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #e2e2e2;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #e2e2e2;
}
input:-ms-input-placeholder {
  color: #e2e2e2;
}

input::-webkit-input-placeholder {
  color: #e2e2e2;
}
</style>

