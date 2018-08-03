<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div class="menu--top">
      <div class="flex">
        <a href="javascript:void(0);" class="flex-list">
          <img class="icon__logo" :src="iconLogo" alt="icon">
        </a>
        <a href="javascript:void(0);" class="flex flex-y-center">
          <!-- <img :src="iconPhone" alt="icon" class="icon__phone">
          <span>下载App</span> -->
        </a>
        <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf" target="_blank" class="flex flex-y-center">
          <img :src="iconPcCustom" alt="icon" class="icon__custom">
          <span>客服</span>
        </a>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="tip--footer">
      <img :src="monster1" alt="icon1">
      <img :src="monster2" alt="icon1">
      <div class="content">
        <!-- <ul class="">
          <li class="">
            <a href="javascript:void(0);">家长监护 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">纠纷处理 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">关于我们 | </a>
          </li>
          <li class="">
            <a href="javascript:void(0);">开放平台</a>
          </li>
        </ul> -->
        <p>浙网文〔2016〕0261-131号 | 浙ICP备12003105号-1 | 浙B2-20120158-4 浙公网安备 33071802100104号</p>
        <p>Copyright2014-2018 All Rights Reserved</p>
        <p>抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
      </div>
      <img :src="monster3" alt="icon1">
      <img :src="monster4" alt="icon1">
    </div>
    <div class="wrap__box">
        <!-- pc端背景中的内容 -->
        <div class="bg__content">
            <!-- 点击即玩 -->
            <div class="tip--left">
                <img :src="iconTip1" alt="icon">
                <img :src="iconTip2" alt="icon">
            </div>
            <!-- phone -->
            <div class="flex flex-v leftBtn">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="flex flex-v topBtn">
                <i></i>
                <div class="flex">
                    <i></i>
                    <i></i>
                </div>
            </div>
            <div class="bottomBtn flex">
                <i></i>
            </div>
            <!-- 二维码 -->
            <div class="code">
                <img class="code--border" :src="codeBorder" alt="icon">
                <!-- 公众号 -->
                <img :src="qrCode" alt="二维码" class="qrCode">
            </div>
        </div>
        <div class="wrap">
            <div class="scroll">
                <div class="gameInfo flex">
                    <img v-if="activityDetail.app_id" :src="activityDetail.icon ? activityDetail.icon : activityDetail.image" alt="icon">
                    <div class="flex flex-v flex-list">
                        <p v-if="activityDetail.app_id">{{ activityDetail.app_name }}</p>
                        <p>{{ activityDetail.title }}</p>
                        <p>{{ activityDetail.create_time }}</p>
                    </div>
                </div>
                <!-- 活动内容 -->
                <div class="activity ql-editor" v-html="activityDetail.content"></div>
                <!-- btn -->
                <div id="bottomBtn" class="btn__group flex" v-if="activityDetail.app_id">
                    <a href="javascript:void(window.history.go(-1));" class="btn--other btn--back">返回</a>
                    <a :href=" 'game.html?gameId=' + activityDetail.app_id + '&agentId=' + agentId" class="btn--other btn--play flex-list">开始游戏</a>
                </div>
                <div id="bottomBtn" class="btn__group flex" v-else>
                    <a href="javascript:void(window.history.go(-1));" class="btn--other btn--back flex-list">返回</a>
                    <!-- <a href="javascript:void(0);" class="btn--other btn--forbidden flex-list">开始游戏</a> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import iconLogo from '@/assets/images/pc/icon_logo.png'
import iconPhone from '@/assets/images/pc/icon_phone.png'
import iconPcCustom from '@/assets/images/pc/icon_custom.png'
import iconTip1 from '@/assets/images/pc/icon_tip1.png'
import iconTip2 from '@/assets/images/pc/icon_tip2.png'
import codeBorder from '@/assets/images/pc/codeBorder.png'
import qrCode from '@/assets/images/pc/qrCode.jpg'
import monster1 from '@/assets/images/pc/monster1.png'
import monster2 from '@/assets/images/pc/monster2.png'
import monster3 from '@/assets/images/pc/monster3.png'
import monster4 from '@/assets/images/pc/monster4.png'

export default {
    name: 'ActivityDetail',
    data() {
        return {
            agentId: '',
            gameId: '',
            activityId: '',
            gameInfo: {
                gameId: 1,
                gameName: '集结号捕鱼',
                gameIcon: 'https://game.11h5.com/static/images/2017/0421/20170421094832825.gif',
            },
            activityDetail: {
                activityName: '心又开启',
                createTime: '2018/04/26',
                content: '活动内容'
            },
            iconLogo: iconLogo,
            iconPcCustom: iconPcCustom,
            iconPhone: iconPhone,
            iconTip1: iconTip1,
            iconTip2: iconTip2,
            qrCode: qrCode,
            codeBorder: codeBorder,
            monster1: monster1,
            monster2: monster2,
            monster3: monster3,
            monster4: monster4,
        }
    },
    created: function () {
        this.gameId = CommonMethods.getUrlKey('gameId');
        this.activityId = CommonMethods.getUrlKey('activityId');
        this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
    },
    methods: {
        // 获取活动详情
        getActivityDetail() {
            var that = this;
            var options = {
                type: 'get',
                url: Request.url.activityList,
                data: {
                    id: that.activityId,
                },
                success: function (data) {
                    if (data.status) {
                        that.activityDetail = data.data;
                    }
                },
                error: function (error) {
                }
            }
            Request.ajax(options);
        }
    },
    mounted() {
      // 初始化分享信息
      const shareInfo = {
        title: '集结号微游-游戏中心',
        desc: '无需下载，点击即玩！集结号微游-游戏中心，海量游戏在线玩！',
        imgUrl: 'https://static.12h5.com/120.png',
        link: location.origin
      }
      if (wxApi.isWeChat()) {
        wxApi.wxInit(shareInfo);
      }
      wxApi.qqShare(shareInfo);
      this.getActivityDetail();
    }
}
</script>

<style scoped>
.gameInfo {
    padding: 40px;
    line-height: 1;
    border-bottom: 2px solid #f0f0f0;
}
.gameInfo img {
    width: 128px;
    height: 128px;
    border-radius: 18px;
}
.gameInfo div {
    padding-left: 20px;
}
.gameInfo div p:first-child {
    padding: 8px 0;
    font-size: 32px; /* px */
    color: #111;
}
.gameInfo div p:nth-child(2) {
    padding: 8px 0;
    font-size: 24px; /* px */
    color: #111;
}
.gameInfo div p:last-child {
    padding: 8px 0;
    font-size: 24px; /* px */
    color: #999;
}
.activity {
    padding: 40px 40px 120px 40px;
    overflow: hidden;
}
/* btn */
.btn__group {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 25px 40px;
  background-color: #fff;
}
.btn__group .btn--back {
  margin-right: 10px;
  color: #ff9c00;
}
.btn__group .btn--play {
  color: #fff;
  background-color: #ff9c00;
}
</style>


