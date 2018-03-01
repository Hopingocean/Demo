<template>
  <div class="page1">
    <div class="page__router">
      <router-link to="/page1/page01">Page1的第一个子页面{{ $route.params.id }}</router-link> |
      <router-link to="/page1/page02">Page1的第二个子页面</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .page__router a {
    /* font-size: 12px; */
    color: blueviolet;
    text-decoration: none;
  }
</style>


