<template>
  <div id="app">
    <button class="btn--logout" @click="logout">退出</button>
    <menu-bar 
      :current-menu="currentMenu" 
      :login-status="loginStatus"></menu-bar>
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
        }
    },
    methods: {
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
        }
    },
    created: function () {
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
    }
}
</script>

<style scoped>
.btn--logout {
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
}
</style>

