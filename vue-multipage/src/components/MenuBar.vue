<template>
  <div id="app" class="menubar">
      <ul class="pure-g">
          <li class="pure-u-1-4">
            <img :src="indexpng" v-if="currentMenu !== 1" @click="go(1)" alt="首页">
            <img :src="indexselectpng" v-if="currentMenu === 1" alt="首页">
          </li>
          <li class="pure-u-1-4">
            <img :src="rankingpng" v-if="currentMenu !== 2" @click="go(2)" alt="排行榜">
            <img :src="rankingselectpng" v-if="currentMenu === 2" alt="排行榜">
          </li>
          <li class="pure-u-1-4">
            <img :src="taskpng" v-if="currentMenu !== 3" @click="go(3)" alt="成就">
            <img :src="taskselectpng" v-if="currentMenu === 3" alt="成就">
          </li>
          <li class="pure-u-1-4">
            <img :src="homepng" v-if="currentMenu !== 4" @click="go(4)" alt="设置">
            <img :src="homeselectpng" v-if="currentMenu === 4" alt="设置">
          </li>
      </ul>
      <login
        :is-hide="isHide"
        @listen-hide-status="getHideStatus"
        ></login>
  </div>
</template>

<script>
import Login from '@/components/Login'

import Reports from '@/assets/js/api.js'

// 导入图片
import indexpng from '@/assets/images/common/index-normal.png'
import indexselectpng from '@/assets/images/common/index-select.png'
import rankingpng from '@/assets/images/common/ranking-normal.png'
import rankingselectpng from '@/assets/images/common/ranking-select.png'
import taskpng from '@/assets/images/common/task-normal.png'
import taskselectpng from '@/assets/images/common/task-select.png'
import homepng from '@/assets/images/common/home-normal.png'
import homeselectpng from '@/assets/images/common/home-select.png'
export default {
  name: 'MenuBar',
  components: { Login },
  data() {
      return {
          isHide: true,
          // 图片资源   
          indexpng: indexpng,
          indexselectpng: indexselectpng,
          rankingpng: rankingpng,
          rankingselectpng: rankingselectpng,
          taskpng: taskpng,
          taskselectpng: taskselectpng,
          homepng: homepng,
          homeselectpng: homeselectpng
      }
  },
  props: {
      currentMenu: {
          type: Number,
          default: 1
      },
      loginStatus: {
          type: Boolean,
          default: false
      }
  },
  created: function () {
  },
  methods: {
      go(n) {
          switch(n) {
            case 1:
                window.location.href = 'index.html';
                break;
            case 2:
                window.location.href = 'ranking.html';
                break;
            case 3:
                if (this.loginStatus) {
                    window.location.href = 'task.html';
                } else {
                    // 未登录，显示登陆页面
                    this.isHide = false;
                }
                break;
            case 4:
                if (this.loginStatus) {
                    window.location.href = 'setting.html';
                } else {
                    // 未登录，显示登陆页面
                    this.isHide = false;
                }
                break;
          }
      },
      getHideStatus(status) {
          this.isHide = status;
      }
  }
}
</script>

<style scoped>
    .menubar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #2b323d;
    }
    .menubar ul li {
        text-align: center;
    }
    .menubar ul li img {
        width: 120px;
        height: auto;
        text-align: center;
    }
</style>

