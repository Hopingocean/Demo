<template>
  <div id="app" class="user">
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
            <div class="personal scroll">
                <!-- 已登陆 -->
                <div v-if="loginStatus" class="user__info flex flex-y-center">
                    <div class="icon">
                        <img :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="头像">
                    </div>
                    <div class="userinfo flex flex-v flex-list">
                        <span class="username">{{ userinfo.nickname ? userinfo.nickname : userinfo.username }}</span>
                        <span class="userId">UID:{{ userinfo.uid }}</span>
                    </div>
                    <!-- <div class="flex flex-v">
                        <p class="balance">余额</p>
                        <p class="money">{{ userinfo.money? userinfo.money : 0 }}</p>
                    </div> -->
                </div>
                <!-- 未登录 -->
                <div v-if="!loginStatus" class="user__info flex flex-y-center" @click="showDialog('dialog__login')">
                    <div class="icon">
                        <img :src="iconUser" alt="头像">
                    </div>
                    <div class="userinfo flex flex-v flex-list">
                        <span class="username">登录</span>
                        <span class="userId">游客状态</span>
                    </div>
                </div>
                <div class="setting">
                    <ul>
                        <!-- <li @click="showDialog('recharge__money')">
                            <a href="#active" class="flex flex-y-center">
                                <img class="icon__title" :src="iconPay" alt="icon">
                                <div class="font--points flex-list">充值中心</div>
                                <img class="arrow--right" :src="iconArrowRight" alt="icon">
                            </a>
                        </li> -->
                        <li class="flex flex-y-center" @click="openQq">
                            <img class="icon__title" :src="iconCustom" alt="icon">
                            <div class="font--sign flex-list">联系客服</div>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                    </ul>
                </div>
                <div class="setting">
                    <ul>
                        <li class="flex flex-y-center" @click="userinfo.idcard_status ? '' : showDialog('certification')">
                            <img class="icon__title" :src="iconName" alt="icon">
                            <div class="font--name flex-list">实名认证</div>
                            <span class="status">{{ userinfo.idcard_status ? '已认证' : '未认证' }}</span>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                        <li class="flex flex-y-center" @click="showDialog('bindPhone')">
                            <img class="icon__title" :src="iconMobile" alt="icon">
                            <div class="font--mobile flex-list">手机绑定</div>
                            <span class="mobile">{{ phone }}</span>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                    </ul>
                </div>
                <div class="setting">
                    <ul>
                        <li class="flex flex-y-center" @click="showDialog('accountManage')">
                            <img class="icon__title" :src="iconAccount" alt="icon">
                            <div class="font--protocol flex-list">账号管理</div>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                        <li class="flex flex-y-center" @click="showDialog('userAgree')">
                            <img class="icon__title" :src="iconRules" alt="icon">
                            <div class="font--protocol flex-list">用户条例</div>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                    </ul>
                </div>
                <!-- <div class="setting">
                    <ul>
                        <li class="flex flex-y-center">
                            <img class="icon__title" :src="iconDownload" alt="icon">
                            <div class="font--protocol flex-list">APP下载</div>
                            <img class="arrow--right" :src="iconArrowRight" alt="icon">
                        </li>
                    </ul>
                </div> -->
                <div class="logout">
                    <a class="btn btn--logout" v-if="loginStatus" @click="logout">退出登陆</a>
                    <a class="btn btn--login" v-if="!loginStatus" @click="showDialog('dialog__login')">登陆</a>
                </div>
            </div>
            <!-- components -->
            <recharge :userinfo="userinfo"></recharge>
            <bind-phone :userinfo="userinfo" :refresh-bind-code="refreshBindCode"></bind-phone>
            <certification :userinfo="userinfo"></certification>
            <account-manage :userinfo="userinfo"></account-manage>
            <user-agree></user-agree>
            <dialog-tip class="user__tip" :tip="tip"></dialog-tip>
            <menu-bar :current-menu="currentMenu"></menu-bar>
        </div>
    </div>
    <login></login>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'
import BindPhone from '@/components/user/BindPhone'
import Recharge from '@/components/user/Recharge'
import Certification from '@/components/user/Certification'
import AccountManage from '@/components/user/AccountManage'
import UserAgree from '@/components/user/UserAgree'
import DialogTip from '@/components/tips/DialogTip'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'
import wxApi from '@/assets/js/wxApi'

import iconUser from '@/assets/images/common/icon_user_1.png'
import iconPay from '@/assets/images/user/icon_pay.png'
import iconCustom from '@/assets/images/user/icon_custom.png'
import iconName from '@/assets/images/user/icon_name.png'
import iconMobile from '@/assets/images/user/icon_mobile.png'
import iconAccount from '@/assets/images/user/icon_account.png'
import iconRules from '@/assets/images/user/icon_rules.png'
import iconDownload from '@/assets/images/user/icon_download.png'

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

import iconArrowRight from '@/assets/images/common/icon_arrow_right.png'
export default {
    name: 'User',
    components: { MenuBar, Login, BindPhone, Recharge, Certification, AccountManage, UserAgree, DialogTip },
    data() {
        return {
            agentId: '',
            userinfo: {},
            currentMenu: 5,
            loginStatus: false,
            phone: '',
            tip: '',
            refreshBindCode: false, // 通知绑定手机号组件请求图片验证码
            // icon
            iconUser: iconUser,
            iconPay: iconPay,
            iconCustom: iconCustom,
            iconName: iconName,
            iconMobile: iconMobile,
            iconAccount: iconAccount,
            iconRules: iconRules,
            iconDownload: iconDownload,
            iconArrowRight: iconArrowRight,
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
    methods: {
        // 登出
        logout() {
            const that = this;
            const options = {
                type: 'get',
                url: Request.url.logout,
                data: {},
                success: function (data) {
                    if (data.code == 'success') {
                        window.location.href = 'index.html?agentId=' + that.agentId;
                    } else {
                        that.tip = data.msg;
                        that.showDialogTip('user__tip');
                    }
                },
                error: function (error) {
                    that.tip = '退出失败，请稍后重试';
                    that.showDialogTip('user__tip');
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
                        that.loginStatus = true;
                        that.userinfo = data.data;
                        that.phone = that.userinfo.mobile.substr(0, 3) + '****' + that.userinfo.mobile.substr(7);
                    }
                },
                error: function (error) {}
            }
            Request.ajax(options);
        },
        showDialog(el) {
            if (this.loginStatus) {
                if (el == 'bindPhone') {
                    this.refreshBindCode = true;
                }
                if (el == 'accountManage' || el == 'userAgree') {
                    this.hideDialog('personal');
                }
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
            } else if (el == 'recharge__money' || el == 'bindPhone' || el == 'certification' || el == 'accountManage') {
                this.showDialog('dialog__login');
            } else if (el == 'userAgree') {
                this.hideDialog('personal');
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
            } else {
                if (el == 'bindPhone') {
                    this.refreshBindCode = true;
                }
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
            }
        },
        hideDialog(el) {
            const dialog = document.getElementsByClassName(el)[0];
            dialog.style.display = 'none';
        },
        showDialogTip(el) {
            const dialog = document.getElementsByClassName(el)[0];
            dialog.style.display = 'block';
        },
        // 跳转qq聊天
        openQq() {
            // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.qq + '&site=qq&menu=yes', '_brank');
            window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMTU4MF80NTIzMTZfODAwODAxNTgwXzJf', '_blank');
        }
    },
    created: function () {
        this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
        this.contactQq = 'mqqwpa://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web&web_src=oicqzone.com';
    },
    mounted() {
        this.getUserinfo();
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
    }
}
</script>

<style scoped>
.user {
    min-height: 100%;
    background-color: #f0f0f0;
}
.user__tip {
  display: none;
}
.user .personal {
    background-color: #f0f0f0;
    padding-top: 20px;
    padding-bottom: 120px;
}
.user .user__info {
    box-sizing: border-box;
    padding: 16px 40px;
    background-color: #fff;
    margin-bottom: 20px;
}
.user .userinfo {
    padding-left: 24px;
}
.user .user__info .username {
    padding: 8px 0;
    font-size: 32px; /* px */
    color: #111;
}
.user .user__info .userId {
    padding: 8px 0;
}
.user .user__info .balance {
    padding-bottom: 20px;
    font-size: 28px; /* px */
    color: #111;
    text-align: right;
}
.user .user__info .userId, .money {
    font-size: 28px; /* px */
    color: #999;
}
.user .user__info .icon {
    height: 128px;
}
.user .user__info img {
    width: 128px;
    height: 128px;
    text-align: center;
    border-radius: 50%;
}
.user .setting {
    margin-bottom: 20px;
    background-color: #fff;
}
.user .setting ul li {
    padding: 16px 40px;
    border-bottom: 2px solid #f0f0f0;
}
.user .setting .icon__title {
    width: 60px;
    height: auto;
}
.user .setting .arrow--right {
    width: 20px;
    height: auto;
}
.user .setting .mobile, .status {
    padding-right: 44px;
    font-size: 28px; /* px */
    color: #999;
}
.user .font--points, .font--sign, .font--name, .font--indulge, .font--mobile, .font--protocol {
    color: #111;
    font-size: 32px; /* px */
    padding-left: 40px;
}
.logout {
    padding: 20px 40px;
    text-align: center;
}
.btn--logout, .btn--login {
    width: 100%;
    line-height: 60px;
    border-radius: 8px;
    background-color: #ff9c00;
    color: #fff;
}
</style>

