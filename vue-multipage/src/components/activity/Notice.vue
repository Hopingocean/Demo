<template>
  <div id="notice" class="notice">
    <ul>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <span class="flex-list">【传奇世界之仗剑天涯H5】典藏新法宝</span>
        <span>2018-04/03</span>
      </li>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <span class="flex-list">【传奇世界之仗剑天涯H5】典藏新法宝</span>
        <span>2018-04/03</span>
      </li>
      <li class="flex flex-y-center">
        <a href="javascript:void(0);" class="btn">公告</a>
        <span class="flex-list">【传奇世界之仗剑天涯H5】典藏新法宝</span>
        <span>2018-04/03</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      title: '公告列表'
    }
  }
}
</script>

<style scoped>
.notice ul li {
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
.notice ul li span:first-child {
  font-size: 28px;
  color: #333;
}
.notice ul li span:last-child {
  font-size: 24px;
  color: #999;
}
</style>