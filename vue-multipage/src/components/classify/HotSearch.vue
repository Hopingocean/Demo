<template>
  <div class="hotSearch">
    <!-- 搜索页文字推荐位 -->
    <ul>
      <li v-for="ad in hotSearchList" :key="ad.id">
        <a v-if="ad.skip_type == 1" :href="ad.url">
          <span>{{ ad.title }}</span>
        </a>
        <a v-if="ad.skip_type == 2" :href="'gameDetail.html?gameId=' + ad.app_id + '&agentId=' + agentId">
          <span>{{ ad.title }}</span>
        </a>
        <a v-if="ad.skip_type == 3" href="javascript:void(0);">
          <span>{{ ad.title }}</span>
        </a>
      </li>
    </ul>
    <!-- 搜索页轮播图 -->
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="ad in swiperList" :key="ad.id">
          <a v-if="ad.skip_type == 1" :href="ad.url">
            <img class="swiper__banner swiper-lazy" :src="ad.image" alt="banner">
          </a>
          <a v-if="ad.skip_type == 2" :href="'gameDetail.html?gameId=' + ad.app_id + '&agentId=' + agentId">
            <img class="swiper__banner swiper-lazy" :src="ad.image" alt="banner">
          </a>
          <a v-if="ad.skip_type == 3" href="javascript:void(0);">
            <img class="swiper__banner swiper-lazy" :src="ad.image" alt="banner">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

import Request from '@/assets/js/api'
import CommonMethods from '@/assets/js/common'

export default {
  name: 'HotSearch',
  components: { swiper, swiperSlide },
  data() {
    return {
      agentId: '',
      hotSearchList: [],
      swiperList: [],
      // swiper
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        lazy: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
      },
    }
  },
  created() {
    this.agentId = CommonMethods.getUrlKey('agentId') ? CommonMethods.getUrlKey('agentId') : '';
  },
  watch: {},
  methods: {
    // 获取搜索页广告列表
    getHotSearchList() {
      const that = this;
      const option = {
        url: Request.url.adList,
        type: 'GET',
        data: {
          type: 2, // 1,首页轮播图；2,搜索页文字；3,搜索页轮播图；4,首页文字；5,游戏弹框
        },
        success: function (data) {
          if (data.status) {
            that.hotSearchList = data.data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(option);
    },
    // 获取搜索页轮播图
    getSwiperList () {
      const that = this;
      const options = {
        type: 'GET',
        url: Request.url.adList,
        data: {
          type: 3, // 1,首页轮播图；2,搜索页文字；3,搜索页轮播图；4,首页文字；5,游戏弹框
        },
        success: function (data) {
          if (data.status) {
            that.swiperList = data.data.data;
          }
        },
        error: function (error) {}
      }
      Request.ajax(options);
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getHotSearchList();
      this.getSwiperList();
    })
  }
}
</script>

<style scoped>
.hotSearch {
  box-sizing: border-box;
  padding: 40px 40px 120px 40px;
}
.hotSearch ul {
  margin-bottom: 30px;
}
.hotSearch ul li {
  display: inline-block;
  padding: 32px 44px;
  margin-right: 13px;
  margin-bottom: 13px;
  border: 1px solid #e2e2e2; /* no */
  border-radius: 12px;
  font-size: 24px; /* px */
}
.hotSearch img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
/* 轮播图 */
.swiper, .swiper-container {
  width: 100%;
  background-color: #fff;
}
</style>

