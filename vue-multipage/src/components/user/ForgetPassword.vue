<template>
  <div class="forgetPassword">
    <!-- 验证账号 -->
    <div class="dialog--checkAccount">
      <div class="inputBox account">
        <span class="font--title">账号</span>
        <input :class="iconStatus == 1 ? 'active' : ''" type="text" v-model="account" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入您的账号">
      </div>
      <div class="inputBox imgCode">
        <img :src="iconStatus == 2 ? iconCode1 : iconCode0" alt="icon">
        <input :class="iconStatus == 2 ? 'active' : ''" type="text" v-model="imgCode" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="请输入图片验证码">
        <img :src="imgCodeSrc" alt="code" @click="refreshCode">
      </div>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('dialogContent', 'forgetPassword')" class="btn--other btn--back">返回</a>
        <a href="javascript:void(0);" @click="checkAccount" class="btn--other btn--check flex-list">下一步</a>
      </div>
    </div>
    <!-- 验证手机号 -->
    <div class="dialog--checkPhone" v-show="false">
      <div class="inputBox phone">
        <img :src="iconStatus == 1 ? iconMobile1 : iconMobile0" alt="icon">
        <input :class="iconStatus == 1 ? 'active' : ''" type="tel" v-model="phone" disabled @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入手机号码">
      </div>
      <div class="inputBox imgCode">
        <img :src="iconStatus == 2 ? iconCode1 : iconCode0" alt="icon">
        <input :class="iconStatus == 2 ? 'active' : ''" type="text" v-model="imgCode" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="请输入图片验证码">
        <img :src="imgCodeSrc" @click="refreshCode" alt="code">
      </div>
      <div class="inputBox mobileCode">
        <img :src="iconStatus == 3 ? iconCode1 : iconCode0" alt="icon">
        <input :class="iconStatus == 3 ? 'active' : ''" type="text" v-model="mobileCode" @focus="iconStatus = 3" @blur="iconStatus = 0" placeholder="请输入手机验证码">
        <span class="btn--code" v-if="status == 1" @click="getMobileCode">获取验证码</span>
        <span class="countdown" v-if="status != 1">{{ countdown }}S</span>
      </div>
      <p class="tip">完成验证手机号码进行下一步操作</p>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('dialog--checkAccount', 'dialog--checkPhone')" class="btn--other btn--back">返回</a>
        <a href="javascript:void(0);" @click="checkPhone" class="btn--other btn--commit flex-list">下一步</a>
      </div>
    </div>
    <!-- 重置密码 -->
    <div class="dialog--resetPassword" v-show="false">
      <div class="inputBox password">
        <span class="font--title">新密码</span>
        <input :class="iconStatus == 1 ? 'active' : ''" type="password" v-model="newPassword" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="6-11位字母或数字">
        <img :src="iconHide" alt="icon">
      </div>
      <div class="inputBox account">
        <span class="font--title">确认密码</span>
        <input :class="iconStatus == 2 ? 'active' : ''" type="password" v-model="confirmPassword" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="6-11位字母或数字">
        <img :src="iconHide" alt="icon">
      </div>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('dialog--checkPhone', 'dialog--resetPassword')" class="btn--other btn--back">返回</a>
        <a href="javascript:void(0);" @click="resetPassword" class="btn--other btn--commit flex-list">完成修改</a>
      </div>
    </div>
    <!-- components -->
    <dialog-tip class="forgetPassword__tip" :tip="tip"></dialog-tip>
  </div>
</template>

<script>
import DialogTip from '@/components/tips/DialogTip'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconMobile0 from '@/assets/images/login/icon_mobile_0.png'
import iconMobile1 from '@/assets/images/login/icon_mobile_1.png'
import iconPassword0 from '@/assets/images/login/icon_password_0.png'
import iconPassword1 from '@/assets/images/login/icon_password_1.png'
import iconCode0 from '@/assets/images/login/icon_code_0.png'
import iconCode1 from '@/assets/images/login/icon_code_1.png'
import iconHide from '@/assets/images/user/icon_hide.png'

export default {
  name: 'ForgetPassword',
  components: { DialogTip },
  data() {
    return {
      agentId: '',
      // icon
      iconStatus: 1, // 1,2,3,4分别表示几个图标
      iconMobile0: iconMobile0,
      iconMobile1: iconMobile1,
      iconPassword0: iconPassword0,
      iconPassword1: iconPassword1,
      iconCode0: iconCode0,
      iconCode1: iconCode1,
      iconHide: iconHide,
      phone: '',
      mobileCode: '',
      status: 1, // 手机验证码
      countdown: 60,
      account: '',
      newPassword: '',
      confirmPassword: '',
      imgCode: '',
      imgCodeSrc: '', // 图片验证码
      tip: '',
    }
  },
  props: {
    refreshForgetCode: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    refreshForgetCode(newVal, oldVal) {
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
      if (el == 'dialog--resetPassword' || el == 'dialog--checkPhone' || el == 'dialog--checkAccount') {
        this.refreshCode();
      }
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
      this.showDialog(el2);
      this.hideDialog(el1);
    },
    // 验证账号有效性
    checkAccount() {
      const that = this;
      if (!that.account) {
        that.tip = '请输入账号';
        that.showDialog('forgetPassword__tip');
        return;
      }
      if (!that.imgCode) {
        that.tip = '请输入图片验证码';
        that.showDialog('forgetPassword__tip');
        return;
      }
      const option = {
        url: Request.url.checkAccount,
        type: 'GET',
        data: {
          username: that.account,
          captcha: that.imgCode
        },
        success: function (data) {
          if (data.status) {
            if (data.data.mobile) {
              that.phone = data.data.mobile;
              that.imgCode = '';
              that.nextPage('dialog--checkAccount', 'dialog--checkPhone');
            } else {
              // 验证码只能使用一次
              that.refreshCode();
              that.tip = '您的账号未绑定手机，无法使用忘记密码功能，请联系客服';
              that.showDialog('forgetPassword__tip');
            }
          } else {
            that.tip = data.msg;
            that.showDialog('forgetPassword__tip');
          }
        },
        error: function (err) {
          that.tip = '验证失败，请稍后重试';
          that.showDialog('forgetPassword__tip');
        }
      };
      Request.ajax(option);
    },
    // 验证手机号有效性
    checkPhone() {
      const that = this;
      if (!that.phone || !CommonMethods.checkMobile(that.phone)) {
        that.tip = '请填写正确的手机号';
        that.showDialog('forgetPassword__tip');
        return;
      }
      if (!that.imgCode) {
        that.tip = '请填写图片验证码';
        that.showDialog('forgetPassword__tip');
        return;
      }
      if (!that.mobileCode) {
        that.tip = '请填写手机号验证码';
        that.showDialog('forgetPassword__tip');
        return;
      }
      that.nextPage('dialog--checkPhone', 'dialog--resetPassword');
    },
    // 重置密码
    resetPassword() {
      const that = this;
      if (that.newPassword.length < 6 || that.newPassword.length > 11) {
          that.tip = '密码不少于6位且不能超过11位';
          that.showDialog('forgetPassword__tip');
          return;
      }
      if (that.newPassword != that.confirmPassword) {
        that.tip = '密码不一致';
        that.showDialog('forgetPassword__tip');
        return;
      }
      const option = {
        url: Request.url.resetPassword,
        type: 'POST',
        data: {
          password: that.newPassword,
          mobile_code: that.mobileCode
        },
        success: function (data) {
          if (data.status) {
            that.tip = '密码重置成功，请重新登陆';
            that.showDialog('forgetPassword__tip');
            setTimeout(function () {
              window.location.reload();
            }, 1000)
          } else {
            that.tip = data.msg;
            that.showDialog('forgetPassword__tip');
          }
        },
        error: function (err) {
          that.tip = '密码找回失败，请稍后重试';
          that.showDialog('forgetPassword__tip');
        }
      };
      Request.ajax(option);
    },
    // 获取手机验证码
    getMobileCode() {
      const that = this;
      if (!that.phone || !CommonMethods.checkMobile(that.phone)) {
        that.tip = '请填写正确的手机号';
        that.showDialog('forgetPassword__tip');
        return;
      }
      if (!that.imgCode) {
        that.tip = '请填写图片验证码';
        that.showDialog('forgetPassword__tip');
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
            that.showDialog('forgetPassword__tip');
          }
        },
        error: function (err) {
          that.tip = '验证码发送失败，请稍后重试';
          that.showDialog('forgetPassword__tip');
        }
      }
      Request.ajax(options);
    },
    // 刷新图片验证码
    refreshCode() {
      const that = this;
      that.imgCodeSrc = Request.url.imgCode + '?v=' + Math.random() * 10;
    }
  }
}
</script>

<style scoped>
/* 提示框 */
.forgetPassword__tip {
  display: none;
}
.forgetPassword {
  /* position: relative;
  z-index: 9;
  display: none;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 120px 40px 128px 40px;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  background-color: #fff; */
  box-sizing: border-box;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 9;
  padding: 60px 40px;
  width: 80%;
  height: auto;
  max-width: 720px;
  background-color: #fff;
  border-radius: 20px;
}
/* input box */
.forgetPassword .inputBox {
  position: relative;
  padding-top: 30px;
}
.inputBox .font--title {
  position: absolute;
  left: 20px;
  bottom: 25px;
}
.inputBox img:first-child {
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 60px;
  height: auto;
}
.forgetPassword .imgCode img:last-child {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  width: 196px;
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
  background-color: #fff;
}
.inputBox input.active {
  border-bottom: 2px solid #ff9c00;
}
.mobileCode input {
  padding-right: 140px;
}
.mobileCode .btn--code {
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
.mobileCode .countdown {
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
/* 重置密码 */
.dialog--resetPassword .inputBox img {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  width: 40px;
  height: auto;
}
.forgetPassword .tip {
  padding: 20px 0 150px 0;
  font-size: 24px; /* px */
  color: #999;
  text-align: center;
}
/* btn */
.btn__group {
  padding-top: 40px;
}
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--commit, .btn--check {
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

textarea:-ms-input-placeholder {
    color: #e2e2e2;
}

textarea::-webkit-input-placeholder {
    color: #e2e2e2;
}
</style>

