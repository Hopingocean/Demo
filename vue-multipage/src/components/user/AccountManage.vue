<template>
  <div class="accountManage">
    <div class="account__menu">
      <div class="flex flex-y-center" @click="nextPage('account__info', 'account__menu')">
        <img :src="iconUser" alt="icon">
        <span class="flex-list">用户资料</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center" @click="nextPage('account__password', 'account__menu')">
        <img :src="iconPassword" alt="icon">
        <span class="flex-list">修改密码</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
    </div>
    <!-- 账号信息 -->
    <div class="account__info">
      <div class="flex flex-y-center">
        <span>头像</span>
        <p class="icon flex-list">
          <img class="avator" :src="userinfo.head_img ? userinfo.head_img : headImage" alt="icon">
        </p>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center" @click="showDialog('account__nickname')">
        <span>昵称</span>
        <span class="flex-list">{{ nickname }}</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center" @click="showDialog('account__sex')">
        <span>性别</span>
        <span class="flex-list">{{ sex == 1 ? '男' : '女' }}</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center">
        <span>ID</span>
        <span class="flex-list">UID:{{ userinfo.uid }}</span>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="account__password">
      <ul>
        <li class="flex flex-y-center">
          <span>原密码</span>
          <input class="flex-list" type="text" v-model="oldPassword" placeholder="请输入您的原密码">
          <img :src="iconShow" alt="icon">
        </li>
        <li class="flex flex-y-center">
          <span>新密码</span>
          <input class="flex-list" type="text" v-model="newPassword" placeholder="6-15位字母或数字">
          <img :src="iconHide" alt="icon">
        </li>
        <li class="flex flex-y-center">
          <span>确认密码</span>
          <input class="flex-list" type="text" v-model="confirmPassword" placeholder="6-15位字母或数字">
          <img :src="iconHide" alt="icon">
        </li>
      </ul>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('account__menu', 'account__password')" class="btn btn--back">返回</a>
        <a href="javascript:void(0);" @click="modifyPassword" class="btn btn--commit flex-list">完成修改</a>
      </div>
    </div>
    <!-- 修改昵称 -->
    <div class="account__nickname">
      <div class="dialog__content">
        <p>修改昵称</p>
        <input type="text" v-model="nickname">
        <p>起个好名字，联系更方便</p>
        <!-- btn -->
        <div class="btn__group flex">
          <a href="javascript:void(0);" @click="hideDialog('account__nickname')" class="btn btn--back">取消</a>
          <a href="javascript:void(0);" @click="modifyUserinfo" class="btn btn--commit flex-list">确认修改</a>
        </div>
      </div>
    </div>
    <!-- 修改性别 -->
    <div class="account__sex" @click.self="hideDialog('account__sex')">
      <div class="dialog__content">
        <p>修改性别</p>
        <div class="flex flex-y-center">
          <span class="flex-list">男</span>
          <input type="radio" id="man" v-model="sex" value="1">
          <label for="man"></label>
        </div>
        <div class="flex flex-y-center">
          <span class="flex-list">女</span>
          <input type="radio" id="woman" v-model="sex" value="2">
          <label for="woman"></label>
        </div>
        <!-- btn -->
        <div class="btn__group flex">
          <a href="javascript:void(0);" @click="hideDialog('account__sex')" class="btn btn--back">取消</a>
          <a href="javascript:void(0);" @click="modifyUserinfo" class="btn btn--commit flex-list">确认修改</a>
        </div>
      </div>
    </div>
    <!-- components -->
    <dialog-tip class="accountManage__tip" :tip="tip"></dialog-tip>
  </div>
</template>

<script>
import DialogTip from '@/components/tips/DialogTip'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common';

import headImage from '@/assets/images/common/icon_user_1.png'
import iconUser from '@/assets/images/user/icon_user.png'
import iconPassword from '@/assets/images/user/icon_password.png'
import iconShow from '@/assets/images/user/icon_show.png'
import iconHide from '@/assets/images/user/icon_hide.png'
import iconArrowRight from '@/assets/images/common/icon_arrow_right.png'
export default {
  name: 'accountManage',
  components: { DialogTip },
  data() {
    return {
      agentId: '',
      // icon
      headImage: headImage,
      iconArrowRight: iconArrowRight,
      iconUser: iconUser,
      iconPassword: iconPassword,
      iconShow: iconShow,
      iconHide: iconHide,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      mobile: this.userinfo.mobile,
      nickname: this.userinfo.nickname,
      sex: this.userinfo.sex == 1 ? 1 : 2,
      tip: '',
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
    // 修改密码
    modifyPassword() {
      const that = this;
      if (!that.oldPassword) {
        that.tip = '请输入您的原密码';
        that.showDialog('accountManage__tip');
        return;
      }
      if (that.newPassword.length < 6 || that.newPassword.length > 11) {
        that.tip = '密码不少于6位且不能超过11位';
        that.showDialog('accountManage__tip');
        return;
      }
      if (that.newPassword != that.confirmPassword) {
        that.tip = '密码不一致';
        that.showDialog('accountManage__tip');
        return;
      }
      const options = {
        type: 'PUT',
        url: Request.url.modifyPassword,
        data: {
          new_password: that.newPassword,
          password: that.oldPassword
        },
        success: function (data) {
          if (data.status) {
            that.tip = '密码重置成功，请重新登陆';
            that.showDialog('accountManage__tip');
            setTimeout(function () {
              window.location.reload();
            }, 1000)
          } else {
            that.tip = '密码重置失败，请稍后尝试';
            that.showDialog('accountManage__tip');
          }
        },
        error: function (error) {
          that.tip = '密码重置失败，请稍后尝试';
          that.showDialog('accountManage__tip');
        }
      }
      Request.ajax(options);
    },
    // 获取用户信息
    getUserinfo() {
      const that = this;
      const options = {
        type: 'get',
        url: Request.url.userinfo,
        data: {},
        success: function (data) {
          if (data.status) {
            that.nickname = data.data.nickname;
            that.sex = data.data.sex;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
    // 修改个人信息
    modifyUserinfo() {
      const that = this;
      const options = {
        type: 'POST',
        url: Request.url.modifyUserinfo,
        data: {
          sex: that.sex,
          nickname: that.nickname
        },
        success: function (data) {
          if (data.status) {
            that.tip = '修改成功';
            that.getUserinfo();
            that.showDialog('accountManage__tip');
            that.hideDialog('account__nickname');
            that.hideDialog('account__sex');
          } else {
            that.tip = '修改失败，请稍后尝试';
            that.showDialog('accountManage__tip');
          }
        },
        error: function (error) {
          that.tip = '修改失败，请稍后尝试';
          that.showDialog('accountManage__tip');
        }
      }
      Request.ajax(options);
    },
  },
  mounted() {
    this.getUserinfo();
  }
}
</script>

<style scoped>
.accountManage__tip {
  display: none;
}
.accountManage {
  display: none;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 24px 0 0 0;
  width: 100%;
  height: auto;
  max-width: 750px;
  background-color: #f0f0f0;
}
.account__menu div {
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.account__menu div img:first-child {
  width: 60px;
  height: auto;
  text-align: center;
}
.account__menu div span {
  padding-left: 20px;
  font-size: 28px; /* px */
  color: #111;
}
.account__menu div img:last-child {
  width: 20px;
  height: auto;
}
/* 账号信息 */
.account__info {
  display: none;
}
.account__info div {
  padding: 30px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.account__info div:nth-child(1) {
  margin-bottom: 24px;
}
.account__info div span:nth-child(2) {
  padding-right: 20px;
  font-size: 24px; /* px */
  color: #999;
  text-align: right;
}
.account__info div p.icon {
  padding-right: 20px;
  text-align: right;
}
.account__info div p img.avator {
  width: 128px;
  height: 128px;
  border-radius: 50%;
}
.account__info div span:nth-child(1) {
  font-size: 28px; /* px */
  color: #111;
}
.account__info div img:last-child {
  width: 20px;
  height: auto;
}
/* 修改密码 */
.account__password {
  display: none;
  background-color: #fff;
}
.account__password ul {
  padding: 40px 40px 20px 40px;
  border-bottom: 2px solid #f0f0f0;
}
.account__password ul li {
  position: relative;
  padding: 40px 0 20px 0;
  font-size: 28px; /* px */
  color: #111;
  border-bottom: 2px solid #f0f0f0;
}
.account__password ul li:last-child {
  border-bottom: none;
}
.account__password ul li input {
  padding: 10px 40px;
  border: none;
}
.account__password ul li span {
  padding-left: 10px;
}
.account__password ul li img {
  width: 40px;
  height: auto;
  padding-right: 10px;
}
/* 修改昵称或性别 */
.account__nickname, .account__sex {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  max-width: 750px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
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
  text-align: center;
}
.dialog__content > p {
  padding-bottom: 80px;
  font-size: 52px; /* px */
  color: #111;
}
.dialog__content input[type='text'] {
  padding: 0 20px 20px 0;
  font-size: 28px; /* px */
  color: #111;
  border: none;
  border-bottom: 2px solid #ff9c00;
}
.dialog__content p:nth-child(3) {
  padding: 20px 0 80px 20px;
  font-size: 24px; /* px */
  color: #999;
}
.account__sex .dialog__content input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.account__sex .dialog__content div {
  position: relative;
  padding: 40px;
  border-bottom: 2px solid #f0f0f0;
}
.account__sex .dialog__content div:last-child {
  border-bottom: none;
}
.account__sex .dialog__content div span {
  font-size: 40px; /* px */
  color: #111;
  text-align: left;
}
.account__sex .dialog__content input[type='radio']  + label::before {
  content: "";  /*不换行空格*/
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #999;
}
.account__sex .dialog__content input[type='radio']:checked  + label::before {
  content: "";
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  border-radius: 50%;
  background-color: #ff9c00;
  border: 2px solid #ff9c00;
}
.account__sex .dialog__content input[type='radio']:checked  + label {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ff9c00;
  text-align: center;
}
/* btn */
.btn__group {
  padding: 40px 40px 20px 40px;
}
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


