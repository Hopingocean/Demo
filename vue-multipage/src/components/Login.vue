<template>
  <div id="dialog" class="dialog__login" @click.self="isHide ? hideDialog('dialog__login') : ''">
      <!-- 登陆和注册 -->
      <div class="dialog__content dialogContent">
        <!-- 登陆 -->
        <div class="dialog--login">
            <!-- <p>登陆</p> -->
            <img class="icon--close" :src="iconClose" v-show="isHide" @click="hideDialog('dialog__login')" alt="icon">
            <div class="inputBox accountNumber">
                <img :src="iconStatus == 1 ? iconUser1 : iconUser0" alt="icon">
                <input :class="iconStatus == 1 ? 'active' : ''" type="text" v-model="accountNumber" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入账号">
            </div>
            <div class="inputBox password">
                <img :src="iconStatus == 2 ? iconPassword1 : iconPassword0" alt="icon">
                <input :class="iconStatus == 2 ? 'active' : ''" type="password" v-model="password" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="请输入密码">
            </div>
            <button class="btn--other btn--commit" @click="login">一键注册/登陆</button>
            <a class="btn--forgetPassword" href="javascript:void(0);" @click="nextPage('dialogContent', 'forgetPassword')">忘记密码?</a>
        </div> 
        <!-- 注册 -->
        <div class="dialog--register">
            <!-- <p>注册</p> -->
            <img class="icon--close" :src="iconClose" v-show="isHide" @click="hideDialog('dialog__login')" alt="icon">
            <div class="inputBox accountNumber">
                <img :src="iconStatus == 1 ? iconUser1 : iconUser0" alt="icon">
                <input :class="iconStatus == 1 ? 'active' : ''" type="text" v-model="accountNumber" @focus="iconStatus = 1" @blur="iconStatus = 0" placeholder="请输入账号">
            </div>
            <div class="inputBox password">
                <img :src="iconStatus == 2 ? iconPassword1 : iconPassword0" alt="icon">
                <input :class="iconStatus == 2 ? 'active' : ''" type="password" v-model="password" @focus="iconStatus = 2" @blur="iconStatus = 0" placeholder="请输入密码">
            </div>
            <div class="inputBox imgCode">
                <img :src="iconStatus == 3 ? iconCode1 : iconCode0" alt="icon">
                <input :class="iconStatus == 3 ? 'active' : ''" type="text" v-model="imgCode" @focus="iconStatus = 3" @blur="iconStatus = 0" placeholder="请输入图片验证码">
                <img :src="imgCodeSrc" alt="code" @click="refreshCode">
            </div>
            <button class="btn--other btn--commit" @click="register">一键注册</button>
        </div>
        <div class="login--third">
            <p>你也可以用以下方式登陆</p>
            <ul class="flex">
                <!-- <li class="flex flex-list flex-v">
                    <img :src="iconWeibo" alt="icon">
                    <span>微博</span>
                </li> -->
                <li class="flex flex-list flex-v">
                    <a :href="wxLogin">
                        <img :src="iconWechat" alt="icon">
                        <p>微信</p>
                    </a>
                </li>
                <li class="flex flex-list flex-v">
                    <a :href="qqLogin">
                        <img :src="iconQq" alt="icon">
                        <p>QQ</p>
                    </a>
                </li>
                <!-- <li class="flex flex-list flex-v">
                    <img :src="iconVisitor" alt="icon">
                    <span>游客</span>
                </li> -->
            </ul>
        </div>
      </div>
      <dialog-tip class="login__tip" :tip="tip"></dialog-tip>
      <forget-password :refresh-forget-code="refreshForgetCode"></forget-password>
  </div>
</template>

<script>
import DialogTip from '@/components/tips/DialogTip'
import ForgetPassword from '@/components/user/ForgetPassword'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common';

import { setInterval, clearTimeout } from 'timers';

import iconClose from '@/assets/images/common/icon_close.png'
import iconUser0 from '@/assets/images/common/icon_user_0.png'
import iconUser1 from '@/assets/images/common/icon_user_1.png'
import iconPassword0 from '@/assets/images/login/icon_password_0.png'
import iconPassword1 from '@/assets/images/login/icon_password_1.png'
import iconCode0 from '@/assets/images/login/icon_code_0.png'
import iconCode1 from '@/assets/images/login/icon_code_1.png'
// 第三方登陆图标
import iconQq from '@/assets/images/login/icon_qq.png'
import iconWechat from '@/assets/images/login/icon_wechat.png'
import iconWeibo from '@/assets/images/login/icon_weibo.png'
import iconVisitor from '@/assets/images/login/icon_visitor.png'

export default {
  name: 'Login',
  components: { DialogTip, ForgetPassword },
  data() {
      return {
        pUserId: '',
        agentId: '',
        gameId: '',
        accountNumber: '',
        password: '',
        imgCode: '',
        imgCodeSrc: '',
        tip: '',
        refreshForgetCode: false, // 通知忘记密码组件请求图片验证码
        // 第三方登陆
        wxLogin: '',
        qqLogin: '',
        isWeChat: true, // 判断移动端是否为微信浏览器
        // icon
        iconStatus: 1, // 1,2,3分别表示几个图标
        iconUser0: iconUser0,
        iconUser1: iconUser1,
        iconPassword0: iconPassword0,
        iconPassword1: iconPassword1,
        iconCode0: iconCode0,
        iconCode1: iconCode1,
        iconQq: iconQq,
        iconWechat: iconWechat,
        iconWeibo: iconWeibo,
        iconVisitor: iconVisitor,
        iconClose: iconClose
      }
  },
  props: {
    isHide: {
      type: Boolean,
      default: true
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
  methods: {
    showDialog(el) {
      if (el == 'forgetPassword') {
        this.refreshForgetCode = true;
      }
      if (el == 'dialog--register') {
          this.refreshCode();
      }
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'block';
    },
    hideDialog(el) {
      const dialog = document.getElementsByClassName(el)[0];
      dialog.style.display = 'none';
    },
    nextPage(el1, el2) {
        this.showDialog(el2);
        this.hideDialog(el1);
    },
    login() {
        const that = this;
        if (!that.accountNumber) {
            that.tip = '请输入用户名';
            that.showDialog('login__tip');
            return;
        }
        if (!that.password) {
            that.tip = '请输入密码';
            that.showDialog('login__tip');
            return;
        }
        var options = {
            type: 'post',
            url: Request.url.login,
            data: {
                username: that.accountNumber,
                password: that.password
            },
            success: function (data) {
                if (data.status) {
                    window.location.reload();
                } else if (data.code == 'password_error'){
                    that.tip = data.msg;
                    that.showDialog('login__tip');
                } else {
                    that.hideDialog('dialog--login');
                    that.showDialog('dialog--register');
                }
            },
            error: function (error) {}
        }
        Request.ajax(options);
    },
    register() {
        const that = this;
        const reg1 = /^[a-zA-Z]/;
        const reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]/;
        if (!(reg1.test(that.accountNumber) || reg2.test(that.accountNumber))) {
            that.tip = '用户名只限大小写字母或大小写字母和数字组合';
            that.showDialog('login__tip');
            return;
        }
        if (that.password.length < 6 || that.password.length > 11) {
            that.tip = '密码不少于6位且不能超过11位';
            that.showDialog('login__tip');
            return;
        }
        if (!that.imgCode) {
            that.tip = '请输入图片验证码';
            that.showDialog('login__tip');
            return;
        }
        var options = {
            type: 'post',
            url: Request.url.register,
            data: {
                username: that.accountNumber,
                password: that.password,
                captcha: that.imgCode,
                agent_id: that.agentId,
                app_id: that.gameId
            },
            success: function (data) {
                if (data.status) {
                    window.location.reload();
                } else {
                    that.tip = data.msg;
                    that.showDialog('login__tip');
                }
            },
            error: function (error) {
                that.tip = '服务器忙，请稍后重试';
                that.showDialog('login__tip');
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
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
    this.gameId = CommonMethods.getUrlKey('gameId') ? CommonMethods.getUrlKey('gameId') : '';
    this.pUserId = CommonMethods.getUrlKey('puid') ? CommonMethods.getUrlKey('puid') : '';
  },
  mounted() {
    // 判断是否为移动端微信浏览器
    if (CommonMethods.browser.mobile || CommonMethods.browser.android || CommonMethods.browser.ios || CommonMethods.browser.iPhone || CommonMethods.browser.iPad) {
        if (!CommonMethods.browser.weChat) {
            this.isWeChat = false;
        }
    }
    // this.imgCodeSrc = Request.url.imgCode + '?v=' + Math.random() * 10;
    // 微信登陆地址
    this.wxLogin = Request.url.wxLogin + '?agent_id=' + this.agentId + '&app_id=' + this.gameId + '&puid=' + this.pUserId;
    // QQ登陆地址
    this.qqLogin = Request.url.qqLogin + '?agent_id=' + this.agentId + '&app_id=' + this.gameId + '&puid=' + this.pUserId;
  }
}
</script>

<style scoped>
/* 提示框 */
.login__tip {
  display: none;
}
.dialog__login {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    /* max-width: 1024px; */
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}
.dialog__login .icon--close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: auto;
}
.dialog--register {
    display: none;
}
.dialog__content {
    position: absolute;
    width: 80%;
    max-width: 600px;
    padding: 40px;
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
    border-radius: 20px;
}
.dialog__content .dialog--login > p, .dialog--register > p {
    padding-bottom: 40px;
    font-size: 52px; /* px */
    color: #111;
    text-align: center;
}
/* input box */
.dialog__content .inputBox {
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
.dialog__content .imgCode input {
    padding-right: 196px;
}
.dialog__content .imgCode img:last-child {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    width: 196px;
    height: auto;
}
.dialog__content .btn--commit {
    margin: 80px 0 40px 0;
    width: 100%;
    font-size: 32px; /* px */
    color: #fff;
    background-color: #ff9c00;
}
/* 忘记密码 */
.btn--forgetPassword {
    display: block;
    padding: 0 0 40px 0;
    font-size: 24px; /* px */
    color: #111;
    text-align: center;
}
/* 第三方登陆 */
.login--third {
    margin: 0 auto;
    padding-top: 10px;
    width: 100%;
    text-align: center;
}
.login--third > p {
    font-size: 24px; /* px */
    color: #999;
    text-align: center;
    line-height: 1px; /* no */
    border-left: 70px solid #999;
    border-right: 70px solid #999;
}
.login--third ul {
    width: 80%;
    margin: 0 auto;
    padding-top: 36px;
}
.login--third ul li {
    box-sizing: border-box;
    padding: 0 20px;
}
.login--third ul li img {
    width: 66px;
    height: 66px;
}
.login--third ul li span {
    padding-top: 12px;
    font-size: 24px; /* px */
    color: #111;
}
</style>
