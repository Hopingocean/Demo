<template>
  <div class="header" :data-behavior="behavior">
    <span @click="showSidebar">
      <svg class="icon icon-menu" aria-hidden="true">
        <use xlink:href="#icon-menu"></use>
      </svg>
    </span>
    <p class="font--name">Lee's blog</p>
    <a class="avator" @click="toggleAbout">
      <img src="@/assets/img/avatar.jpg" alt="lf">
    </a>
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['behavior'])
  },
  methods: {
    ...mapActions(['toggleAbout', 'showSidebar'])
  }
}
</script>

<style scoped>
.header {
  position: relative;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid #999;
}
.header a {
  text-decoration: none;
  color: #ebebeb;
  font-size: 18px;
  line-height: 100px;
}
.header .icon-menu {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 20px;
  margin-top: -15px;
}
.header .font--name {
  text-align: center;
  color: #88909a;
  font-weight: 400;
  line-height: 60px;
}
.header .avator img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -15px;
  border-radius: 50%;
}
</style>