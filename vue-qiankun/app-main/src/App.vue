<template>
  <div id="app">
    <Row type="flex">
      <div id="menu">
        <Menu>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />
              App
            </template>
            <MenuItem name="1-1" to="app-vue">App Vue</MenuItem>
            <MenuItem name="1-2" to="ebr">工作站</MenuItem>
            <MenuItem name="1-3" to="visual">可视化</MenuItem>
          </Submenu>
        </Menu>
      </div>
      <div>
          <router-view v-show="$route.name"></router-view>
          <div v-show="!$route.name" id="container"></div>
      </div>
  </Row>
  </div>
</template>

<script>
import AppMain from '@/view/AppMain.vue'

export default {
  name: 'App',
  components: {
    AppMain
  }
}
</script>

<style>
#app {
  position: relative
}
#menu {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
