<template>
  <div id="app" class="user">
    <div class="user__icon">
        <img src="https://img02.jjhgame.com/game1511/images/down/gicon-fish.jpg" alt="">
    </div>
    <div class="setting">
        <ul>
            <li class="flex flex-y-center">
                <i class="user__points iconfont">&#xe638;</i>
                <div class="font--points flex-list">我的积分</div>
                <span class="points">0</span>
            </li>
            <li class="flex flex-y-center">
                <i class="user__sign iconfont">&#xe641;</i>
                <div class="font--sign flex-list">签到</div>
                <span class="arrow--right iconfont">&#xe64a;</span>
            </li>
        </ul>
    </div>
    <div class="setting">
        <ul>
            <li class="flex flex-y-center">
                <i class="user__name iconfont">&#xe601;</i>
                <div class="font--name flex-list">实名认证</div>
                <span class="arrow--right iconfont">&#xe64a;</span>
            </li>
            <li class="flex flex-y-center">
                <i class="user__indulge iconfont">&#xe601;</i>
                <div class="font--indulge flex-list">防沉迷系统说明</div>
                <span class="arrow--right iconfont">&#xe64a;</span>
            </li>
            <li class="flex flex-y-center">
                <i class="user__mobile iconfont">&#xe6aa;</i>
                <div class="font--mobile flex-list">绑定手机</div>
                <span class="arrow--right iconfont">&#xe64a;</span>
            </li>
        </ul>
    </div>
    <div class="setting">
        <ul>
            <li class="flex flex-y-center">
                <i class="user__protocol iconfont">&#xe651;</i>
                <div class="font--protocol flex-list">用户条例</div>
                <span class="arrow--right iconfont">&#xe64a;</span>
            </li>
        </ul>
    </div>
    <div class="logout">
        <a class="btn btn--logout" v-if="loginStatus" @click="logout">退出</a>
        <a class="btn btn--logout" v-if="!loginStatus" @click="login">登陆</a>
    </div>
    <menu-bar 
      :current-menu="currentMenu" 
      :login-status="loginStatus"></menu-bar>
    <login
      @listen-hide-status="getHideStatus"
      :is-hide="isHide"></login>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import Login from '@/components/Login'

import Reports from '@/assets/js/api'
export default {
    name: 'User',
    components: { MenuBar, Login },
    data() {
        return {
            currentMenu: 5,
            loginStatus: false,
            isHide: true
        }
    },
    methods: {
        // 登出
        logout() {
            var that = this;
            var options = {
                type: 'get',
                url: Reports.requestUrl.logout,
                data: {},
                success: function (data) {
                    if (data.code == 'success') {
                        window.location.href = 'index.html';
                    } else {
                        that.loginStatus = true;
                    }
                },
                error: function (error) {
                    that.loginStatus = true;
                }
            }
            Reports.ajax(options);
        },
        // 登陆
        login() {
            this.isHide = false;
        },
        // 获取用户信息
        getUserinfo() {
            var that = this;
            var options = {
                type: 'get',
                url: Reports.requestUrl.userinfo,
                data: {},
                success: function (data) {
                    if (data.status) {
                        that.loginStatus = true;
                    } else {
                        that.loginStatus = false;
                    }
                },
                error: function (error) {
                    that.loginStatus = false;
                }
            }
            Reports.ajax(options);
        },
        getHideStatus(status) {
            this.isHide = status;
        }
    },
    created: function () {
        this.getUserinfo();
    }
}
</script>

<style scoped>
.user {
    background-color: #f5f5fa;
    padding-bottom: 110px;
}
.user .user__icon {
    box-sizing: border-box;
    padding: 20px 0;
    background-color: #fff;
    margin-bottom: 40px;
    text-align: center;
}
.user .user__icon img {
    width: 100px;
    height: 100px;
    text-align: center;
    border-radius: 50%;
}
.user .setting {
    margin-bottom: 40px;
    background-color: #fff;
}
.user .setting ul li {
    padding: 10px 20px;
    border-bottom: 1px solid rgb(245, 245, 250);
}
.user .user__points {
    font-size: 60px;
    color: red;
}
.user .user__sign {
    font-size: 60px;
    color: orange;
}
.user .font--points, .font--sign, .font--name, .font--indulge, .font--mobile, .font--protocol {
    color: #333;
    font-size: 16px;
    padding-left: 10px;
}
.user .user__name {
    color: greenyellow;
}
.user .user__indulge {
    color: cyan;
}
.user .user__mobile {
    color: blue;
}
.user .user__protocol {
    color: purple;
}
.arrow--right {
    color: #d6d6dd;
    font-size: 36px;
}
.points {
    color: #d6d6dd;
    font-size: 12px;
}
.logout {
    text-align: center;
}
.btn--logout {
    width: 90%;
    line-height: 60px;
    border-radius: 30px;
    background-color: #1381f1;
    color: #fff;
}
</style>

