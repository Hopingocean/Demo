<template>
  <div id="app" class="game__container">
    <iframe class="game--url" :src="gameUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
import common from '@/assets/js/common.js'
export default {
  name: 'Game',
  data() {
    return{
      gameUrl: '',
      gameId: '',
    }
  },
  methods: {

  },
  mounted: function () {
    this.$nextTick(function () {
      this.gameId = common.getUrlKey('gameId');
      this.gameUrl = '/by/' + this.gameId;
    })
  }
}
</script>

<style scoped>
.game__container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
