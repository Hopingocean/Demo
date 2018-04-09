<template>
  <div id="app">
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
  name: 'ranking',
  components: { MenuBar, Login },
  data() {
    return {
      loginStatus: true,
      currentMenu: 2,
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
  },
}
</script>

<style scoped>

</style>
