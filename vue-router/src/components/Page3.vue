<template>
  <div class="page3">
    <p>{{ $route.params.userId }}--{{ $route.params.userName }}</p>
  </div>
</template>

<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    // 准备进入路由
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    // 准备离开路由
    next()
  }
}
</script>

<style scoped>

</style>
