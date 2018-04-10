<template>
  <div id="app" class="dialog__login" v-show="!isHide" @click.self="hiddenLoginDialog">
      <div class="dialog__content">
          <input class="mobile" v-model="mobile" type="text" placeholder="输入手机号">
          <div class="code">
              <input class="" v-model="mobileCode" type="text" placeholder="输入验证码">
              <span class="getCode" v-if="status == 1" @click="getMobileCode">获取验证码</span>
              <span class="countdown" v-if="status != 1">{{ countdown }}S</span>
          </div>
          <input type="button" @click="login" value="登陆">
      </div>
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
          mobile: '',
          mobileCode: '',
          countdown: 60, // 倒计时
          status: 1, // 显示文字或者倒计时
      }
  },
  props: {
      isHide: {
        type: Boolean,
        default: true,
      }
  },
  methods: {
    hiddenLoginDialog() {
        this.isHide = !this.isHide;
        this.$emit('listen-hide-status', this.isHide);
    },
    login() {
        var options = {
            type: 'post',
            url: Reports.requestUrl.login,
            data: {
                username: this.mobile,
                password: this.mobileCode
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
        width: 100%;
        height: 100%;
        background-color: #2b323d;
        opacity: .8;
    }
    .dialog__content {
        position: absolute;
        width: 80%;
        max-width: 600px;
        padding: 0 20px;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        box-sizing: border-box;
        transform: translateY(-50%);
    }
    .dialog__content input {
        box-sizing: border-box;
        width: 100%;
        border: none;
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
</style>
