<template>
  <div class="home content" :data-behavior="behavior">
    <ul>
      <li v-for="(blog, i) in homeBlogList" :key="i">
        <div class="blog__icon">
          <img :src="blog.icon" :alt="blog.title">
        </div>
        <div class="blog__info">
          <p class="blog__info--title">{{blog.title}}</p>
          <p class="blog__info--date">{{blog.date}}</p>
          <p class="blog__info--desc">{{blog.desc}}</p>
          <a href="#" class="font--read">阅读全文</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      homeBlogList: [
        {
          icon: 'http://oak1q2h54.bkt.clouddn.com/blog/ljdzz_icon.png',
          title: 'cloc代码统计工具',
          desc: '项目地址：https://github.com/AlDanial/cloc',
          date: '2017年04月18日'
        }
      ]
    }
  },
  computed: {
    ...mapState(['behavior'])
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.home {
  margin: 0 auto;
}
.home ul {
  margin: 0 auto;
  max-width: 750px;
}
.home ul li {
  position: relative;
  border-bottom: 1px solid #cecece;
}
.home .blog__icon img {
  width: 100%;
  height: auto;
}
.home .blog__info .blog__info--title {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}
.home .blog__info .blog__info--date {
  font-size: 12px;
  color: #9a9a9a;
  padding: 10px 0 20px 0;
}
.home .blog__info .blog__info--desc {
  padding-bottom: 10px;
  font-size: 18px;
  color: #5e5e5e;
}
.home .blog__info .font--read {
  font-size: 16px;
  text-decoration: none;
  color: #e1e0a6;
}

@media screen and (min-width: 480px) {
  .home .blog__icon {
    display: inline-block;
    width: 160px;
    height: 160px;
    height: auto;
    overflow: hidden;
  }
  .home .blog__info {
    position: absolute;
    top: 50%;
    left: 180px;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
  }
}
@media screen and (max-width: 479px) {
  .home .blog__icon {
    display: none;
  }
  .home .blog__info {
    position: relative;
  }
}
</style>

