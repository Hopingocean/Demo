<template>
  <div class="qrcode">
    <img src="../../assets/images/pc/qrCode.jpg" alt="二维码">
    <p>微信扫一扫 关注集结号微游</p>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {}
  }
}
</script>

<style scoped>
.qrcode {
  padding-bottom: 120px;
  text-align: center;
}
.qrcode img {
  width: 300px;
  height: auto;
}
</style>