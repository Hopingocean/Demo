<template>
  <div class="userAgree">
    <!-- 菜单页 -->
    <div class="user__menu">
      <div class="flex flex-y-center" @click="nextPage('user__guide', 'user__menu')">
        <img :src="iconRules" alt="icon">
        <span class="flex-list">用户指引</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center" @click="nextPage('user__agree', 'user__menu')">
        <img :src="iconRules" alt="icon">
        <span class="flex-list">用户协议</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
      <div class="flex flex-y-center" @click="nextPage('user__handle', 'user__menu')">
        <img :src="iconSafe" alt="icon">
        <span class="flex-list">纠纷处理方式</span>
        <img :src="iconArrowRight" alt="icon">
      </div>
    </div>
    <!-- 用户指引 -->
    <div class="user__guide article">
      <h1>网络游戏用户指引和警示说明</h1>
      <div class="content">
        <p>集结号娱乐（以下称“集结号”）在此特别提醒用户注意：</p>
        <p>本网络游戏仅适合于年满18周岁以上的用户。如果您未满18周岁，不建议您注册并使用本网络游戏服务；如果您坚持使用，请您务必加入本网络游戏防沉迷系统进行实名注册，同时我们将会按照您法定监护人的需求提供您在本网络游戏中的信息。</p>
        <p>您在使用本网络游戏服务之前已经明确知晓网络游戏可能给您带来的一切潜在威胁，包括长时间游戏可能不利于您的身心健康等。为了您的健康请您合理的使用本网络游戏。</p>
      </div>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__guide')" class="btn btn--back">不同意</a>
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__guide')" class="btn btn--commit flex-list">同意并返回</a>
      </div>
    </div>
    <!-- 用户协议 -->
    <div class="user__agree article">
      <h1>用户服务协议</h1>
      <div class="content">
        <p>集结号娱乐（以下称“集结号”）在此特别提醒用户注意：</p>
        <p>本网络游戏仅适合于年满18周岁以上的用户。如果您未满18周岁，不建议您注册并使用本网络游戏服务；如果您坚持使用，请您务必加入本网络游戏防沉迷系统进行实名注册，同时我们将会按照您法定监护人的需求提供您在本网络游戏中的信息。</p>
        <p>您在使用本网络游戏服务之前已经明确知晓网络游戏可能给您带来的一切潜在威胁，包括长时间游戏可能不利于您的身心健康等。为了您的健康请您合理的使用本网络游戏。</p>
      </div>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__agree')" class="btn btn--back">不同意</a>
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__agree')" class="btn btn--commit flex-list">同意并返回</a>
      </div>
    </div>
    <!-- 纠纷处理方式 -->
    <div class="user__handle article">
      <h1>网络游戏纠纷处理方式</h1>
      <div class="content">
        <p>集结号娱乐（以下称“集结号”）在此特别提醒用户注意：</p>
        <p>本网络游戏仅适合于年满18周岁以上的用户。如果您未满18周岁，不建议您注册并使用本网络游戏服务；如果您坚持使用，请您务必加入本网络游戏防沉迷系统进行实名注册，同时我们将会按照您法定监护人的需求提供您在本网络游戏中的信息。</p>
        <p>您在使用本网络游戏服务之前已经明确知晓网络游戏可能给您带来的一切潜在威胁，包括长时间游戏可能不利于您的身心健康等。为了您的健康请您合理的使用本网络游戏。</p>
      </div>
      <!-- btn -->
      <div class="btn__group flex">
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__handle')" class="btn btn--back">不同意</a>
        <a href="javascript:void(0);" @click="prevPage('user__menu', 'user__handle')" class="btn btn--commit flex-list">同意并返回</a>
      </div>
    </div>
  </div>
</template>

<script>
import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common';

import iconArrowRight from '@/assets/images/common/icon_arrow_right.png'
import iconRules from '@/assets/images/user/icon_rules.png'
import iconSafe from '@/assets/images/user/icon_safe.png'
export default {
  name: 'UserAgree',
  data() {
    return {
      agentId: '',
      // icon
      iconArrowRight: iconArrowRight,
      iconRules: iconRules,
      iconSafe: iconSafe,
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
  },
}
</script>

<style scoped>
.userAgree {
  display: none;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  height: auto;
  max-width: 750px;
}
.user__menu {
  padding-top: 24px;
  background-color: #f0f0f0;
}
.user__menu div {
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.user__menu div img:first-child {
  width: 60px;
  height: auto;
  text-align: center;
}
.user__menu div span {
  padding-left: 20px;
  font-size: 28px; /* px */
  color: #111;
}
.user__menu div img:last-child {
  width: 20px;
  height: auto;
}
.user__guide, .user__agree, .user__handle {
  display: none;
}
/* article */
.article h1 {
  padding: 40px 0;
  font-size: 32px; /* px */
  color: #111;
  text-align: center;
  border-bottom: 2px solid #f0f0f0;
}
.article .content {
  padding: 0 40px;
  font-size: 24px; /* px */
  color: #999;
}
.article .content p {
  padding-top: 40px; 
  line-height: 36px;
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
</style>

