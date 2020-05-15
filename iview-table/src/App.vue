<template>
  <div id="app">
    <!-- <ul>
      <li>
        <router-link to="/tab1">tab1</router-link>
      </li>
      <li>
        <router-link to="/tab2">tab2</router-link>
      </li>
    </ul> -->
    <Row>
      <Col span="4">
        <Menu :theme="theme2">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />内容管理
            </template>
            <MenuItem name="tab1" to="tab1">文章管理</MenuItem>
            <MenuItem name="tab2" to="tab2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats" />统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Col>
      <Col span="20">
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive>-->
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      theme2: 'light'
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
