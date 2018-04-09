<template>
  <div id="app" class="dialog__login" v-show="!isHide" @click.self="hiddenLoginDialog">
      <div class="dialog__content">
          <input class="mobile" v-model="mobile" type="text" placeholder="输入手机号">
          <div class="code">
              <input class="" v-model="mobileCode" type="text" placeholder="输入验证码">
              <span class="getCode">获取验证码</span>
          </div>
          <input type="button" @click="login" value="登陆">
      </div>
  </div>
</template>

<script>
import Reports from '@/assets/js/api.js'
export default {
  name: 'Login',
  data() {
      return {
          mobile: '',
          mobileCode: ''
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
    }
    .dialog__content {
        position: absolute;
        width: 100%;
        padding: 0 20px;
        top: 50%;
        left: 0;
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
    .dialog__content .getCode {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0 20px;
        line-height: 72px;
    }
</style>
