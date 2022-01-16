<template>
  <div id="app">
    <Row type="flex">
      <Col>
          <Menu :open-names="['1']">
              <Submenu name="1">
                  <template slot="title">
                      <Icon type="ios-paper" />
                      App
                  </template>
                  <MenuItem name="1-1" to="app-vue">App Vue</MenuItem>
                  <MenuItem name="1-2">App React</MenuItem>
                  <MenuItem name="1-3">App Angular</MenuItem>
              </Submenu>
          </Menu>
      </Col>
      <Col flex="1">
          <router-view v-show="$route.name"></router-view>
          <div v-show="!$route.name" id="container"></div>
      </Col>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
