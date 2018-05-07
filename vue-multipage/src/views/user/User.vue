<template>
  <div id="app" class="user">
    <div class="personal">
        <!-- 已登陆 -->
        <div v-if="loginStatus" class="user__info flex flex-y-center">
            <div class="icon">
                <img :src="userinfo.head_img ? userinfo.head_img : iconUser" alt="头像">
            </div>
            <div class="userinfo flex flex-v flex-list">
                <span class="username">{{ userinfo.username }}</span>
                <span class="userId">UID:{{ userinfo.uid }}</span>
            </div>
            <!-- <div class="flex flex-v">
                <p class="balance">余额</p>
                <p class="money">{{ userinfo.money? userinfo.money : 0 }}</p>
            </div> -->
        </div>
        <!-- 未登录 -->
        <div v-if="!loginStatus" class="user__info flex flex-y-center">
            <div class="icon">
                <img :src="iconUser" alt="头像">
            </div>
            <div class="userinfo flex flex-v flex-list">
                <span class="username">未登录</span>
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
                    <span class="mobile">{{ userinfo.mobile }}</span>
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
                <!-- <li class="flex flex-y-center" @click="showDialog('userAgree')">
                    <img class="icon__title" :src="iconRules" alt="icon">
                    <div class="font--protocol flex-list">用户条例</div>
                    <img class="arrow--right" :src="iconArrowRight" alt="icon">
                </li> -->
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
    <menu-bar :current-menu="currentMenu"></menu-bar>
    <login></login>
    <recharge :userinfo="userinfo"></recharge>
    <bind-phone :userinfo="userinfo"></bind-phone>
    <certification :userinfo="userinfo"></certification>
    <account-manage :userinfo="userinfo"></account-manage>
    <user-agree></user-agree>
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

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

import iconUser from '@/assets/images/common/icon_user_1.png'
import iconPay from '@/assets/images/user/icon_pay.png'
import iconCustom from '@/assets/images/user/icon_custom.png'
import iconName from '@/assets/images/user/icon_name.png'
import iconMobile from '@/assets/images/user/icon_mobile.png'
import iconAccount from '@/assets/images/user/icon_account.png'
import iconRules from '@/assets/images/user/icon_rules.png'
import iconDownload from '@/assets/images/user/icon_download.png'

import iconArrowRight from '@/assets/images/common/icon_arrow_right.png'
export default {
    name: 'User',
    components: { MenuBar, Login, BindPhone, Recharge, Certification, AccountManage, UserAgree },
    data() {
        return {
            agentId: '',
            userinfo: {},
            currentMenu: 5,
            loginStatus: false,
            qq: '1258963839',
            // icon
            iconUser: iconUser,
            iconPay: iconPay,
            iconCustom: iconCustom,
            iconName: iconName,
            iconMobile: iconMobile,
            iconAccount: iconAccount,
            iconRules: iconRules,
            iconDownload: iconDownload,
            iconArrowRight: iconArrowRight
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
                    }
                },
                error: function (error) {}
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
                        that.userinfo.mobile = that.userinfo.mobile.substr(0, 3) + '****' + that.userinfo.mobile.substr(7);
                        console.log(this.loginStatus);
                    }
                },
                error: function (error) {}
            }
            Request.ajax(options);
        },
        showDialog(el) {
            if (this.loginStatus) {
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
                this.hideDialog('personal');
            } else if (el == 'recharge__money' || el == 'bindPhone' || el == 'certification' || el == 'accountManage') {
                this.showDialog('dialog__login');
            } else if (el == 'userAgree') {
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
                this.hideDialog('personal');
            } else {
                const dialog = document.getElementsByClassName(el)[0];
                dialog.style.display = 'block';
            }
        },
        hideDialog(el) {
            const dialog = document.getElementsByClassName(el)[0];
            dialog.style.display = 'none';
        },
        // 跳转qq聊天
        openQq() {
            window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.qq + '&site=qq&menu=yes', '_brank');
        }
    },
    created: function () {
        this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
        this.contactQq = 'mqqwpa://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web&web_src=oicqzone.com';
    },
    mounted() {
        this.getUserinfo();
    }
}
</script>

<style scoped>
.user .personal {
    background-color: #f0f0f0;
    padding-top: 24px;
    margin-bottom: 128px;
}
.user .user__info {
    box-sizing: border-box;
    padding: 20px 40px;
    background-color: #fff;
    margin-bottom: 24px;
}
.user .userinfo {
    padding-left: 24px;
}
.user .user__info .username {
    padding-bottom: 20px;
    font-size: 32px; /* px */
    color: #111;
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
.user .user__info img {
    width: 128px;
    height: 128px;
    text-align: center;
    border-radius: 50%;
}
.user .setting {
    margin-bottom: 24px;
    background-color: #fff;
}
.user .setting ul li {
    padding: 26px 40px;
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
    padding: 24px 40px;
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

