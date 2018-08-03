<template>
  <div class="dialog__tip">
    <div class="dialog__content">
      <p>{{ tip }}</p>
      <button class="btn--other btn--ok" @click="hideDialog($event)">好的</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogTip',
  props: {
    tip: {
      type: String
    }
  },
  methods: {
    hideDialog(event) {
      const dialog = event.target.parentNode.parentNode;
      dialog.style.display = 'none';
    },
  }
}
</script>

<style scoped>
.dialog__tip {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}
.dialog__content {
    position: absolute;
    width: 80%;
    max-width: 600px;
    padding: 40px;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-sizing: border-box;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
}
.dialog__content > p {
    padding-bottom: 80px;
    font-size: 28px; /* px */
    color: #111;
}
.btn--ok {
  width: 240px;
  color: #fff;
  background-color: #ff9c00;
}
</style>

