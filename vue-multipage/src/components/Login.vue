<template>
  <div id="dialog__login" class="dialog__login" v-if="!isHide" @click.self="hiddenLoginDialog($event)">
      <!-- 登陆和注册 -->
      <div class="dialog__content">
        <div class="dialog__register" v-show="toggle == 1">
            <input class="mobile" v-model="username" type="text" placeholder="请输入用户名">
            <input class="mobile" v-model="password" type="text" placeholder="请输入密码">
            <input class="mobile" v-model="passwordAgain" type="text" placeholder="请确认密码">
            <input type="button" @click="register" value="注册">
            <span class="toggleDialog" @click="toggleDialog(2)">登陆</span>
        </div>
        <div class="dialog__log" v-show="toggle == 2">
            <input class="mobile" v-model="username" type="text" placeholder="请输入用户名">
            <input class="mobile" v-model="password" type="text" placeholder="请输入密码">
            <input type="button" @click="login" value="登陆">
            <span class="toggleDialog" @click="toggleDialog(1)">注册</span>
        </div>
      </div>
      <!-- <div class="dialog__content">
          <input class="mobile" v-model="mobile" type="text" placeholder="请输入手机号码">
          <div class="code">
              <input class="" v-model="mobileCode" type="text" placeholder="请输入短信验证码">
              <span class="getCode" v-if="status == 1" @click="getMobileCode">获取验证码</span>
              <span class="countdown" v-if="status != 1">{{ countdown }}S</span>
          </div>
          <input type="button" @click="login" value="登陆">
      </div> -->
  </div>
</template>

<script>
import Reports from '@/assets/js/api.js';
import CommonMethods from '@/assets/js/common.js';

import { setInterval, clearTimeout } from 'timers';
export default {
  name: 'Login',
  data() {
      return {
          username: '',
          password: '',
          passwordAgain: '',
          mobile: '',
          mobileCode: '',
          countdown: 60, // 倒计时
          status: 1, // 显示文字或者倒计时
          toggle: 1, // 1显示注册窗口，2显示登陆窗口
      }
  },
  props: {
      isHide: {
        type: Boolean,
        default: true,
      },
      loginStatus: {
          type: Boolean,
          default: true
      }
  },
  methods: {
    hiddenLoginDialog(event) {
        this.isHide = true;
        this.$emit('listen-hide-status', this.isHide);
    },
    toggleDialog(i) {
        this.toggle = i;
    },
    register() {
        if (!this.username || !this.password) {
            alert('请输入用户名或密码');
            return;
        }
        if (this.password !== this.passwordAgain) {
            alert('请确认密码是否一致');
            return;
        }
        var options = {
            type: 'post',
            url: Reports.requestUrl.register,
            data: {
                username: this.username,
                password: this.password
            },
            success: function (data) {
                if (data.status) {
                    window.location.reload();
                } else {

                }
            },
            error: function (error) {
                
            }
        }
        Reports.ajax(options);
    },
    login() {
        if (!this.username || !this.password) {
            alert('请输入用户名或密码');
            return;
        }
        var options = {
            type: 'post',
            url: Reports.requestUrl.login,
            data: {
                username: this.username,
                password: this.password
            },
            success: function (data) {
                if (data.status) {
                    window.location.reload();
                } else {

                }
            },
            error: function (error) {
                
            }
        }
        Reports.ajax(options);
    },
    // 获取短信验证码
    getMobileCode() {
        var that = this;
        if (!CommonMethods.checkMobile(that.mobile)) {
            alert('请输入正确的手机号');
            return;
        }
        var options = {
            type: 'post',
            url: Reports.requestUrl.mobileCode,
            data: {
                mobile: that.mobile,
                identifyCode: that.identifyCode
            },
            success: function (data) {

            },
            error: function (error) {}
        }
        Reports.ajax(options);
        that.status =2;
        var t = setInterval(function () {
            if (that.countdown > 0) {
                that.countdown--;
                return;
            }
            that.status = 1;
            that.countdown = 60;
            clearInterval(t);
        }, 1000);
    }
  },
  watch: {
     
  },
  created: function () {
      
  },
  mounted: function() {
      
  }
}
</script>

<style scoped>
    .dialog__login {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
    }
    .dialog__content {
        position: absolute;
        width: 80%;
        max-width: 600px;
        padding: 20px;
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
    .dialog__content input {
        box-sizing: border-box;
        width: 100%;
        border: 2px solid #eee;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;
    }
    .dialog__content .code {
        position: relative;
    }
    .dialog__content .getCode, .countdown {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0 20px;
        line-height: 72px;
    }
    .dialog__content .toggleDialog {
        float: right;
        padding: 10px;
        border: 2px solid #eee;
        border-radius: 10px;
    }
</style>
