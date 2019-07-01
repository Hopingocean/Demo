<template>
  <div class="sidebar" :data-behavior="behavior">
    <div class="avator" @click="toggleAbout">
      <img src="@/assets/img/avatar.jpg" alt="lf">
      <p>Lee</p>
    </div>
    <ul>
      <li>
        <router-link to="/home">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home"></use>
          </svg>
          <span class="font--title">主页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/category">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon1"></use>
          </svg>
          <span class="font--title">分类</span>
        </router-link>
      </li>
      <li>
        <router-link to="/tags">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tag"></use>
          </svg>
          <span class="font--title">标签</span>
        </router-link>
      </li>
      <li>
        <a @click="toggleAbout">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanyu"></use>
          </svg>
          <span class="font--title">关于</span>
        </a>
      </li>
      <li>
        <a href="mailto:h_opingocean@outlook.com">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-email"></use>
          </svg>
          <span class="font--title">Email</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/Hopingocean">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github1"></use>
          </svg>
          <span class="font--title">GitHub</span>
        </a>
      </li>
    </ul>
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
    ...mapActions(['toggleAbout'])
  }
}
</script>

<style scoped>
.icon {
  width: 1.5em; 
  height: 1.5em;
  vertical-align: sub;
  fill: currentColor;
  overflow: hidden;
}
.sidebar {
  height: 100%;
  float: left;
  text-align: center;
  background-image: url('../../../static/img/666.jpg');
  background-repeat: no-repeat;
  /* background-size: 100% cover; */
  font-size: 16px;
  color: #ebebeb;
  animation: sidebarBg 15s ease-in forwards;
}
@keyframes sidebarBg {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 50%;
  }
}
@-moz-keyframes sidebarBg {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: 50%;
  }
}
.sidebar a {
  text-decoration: none;
  color: #ebebeb;
  font-size: 18px;
  line-height: 100px;
}
.sidebar a:hover {
  color: #fff;
}
.sidebar .avator {
  width: 100%;
  height: auto;
  padding-top: 20px;
}
.sidebar .avator img {
  width: 50%;
  max-width: 128px;
  height: auto;
  border-radius: 50%;
}
.sidebar ul li {
  height: 70px;
  list-style: none;
}
</style>
