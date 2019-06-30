<template>
  <div class="content" :data-behavior="behavior">
    <div class="tag">
      <h3>搜索标签</h3>
      <div class="tag__list">
        <router-link v-for="(tag, i) in tagList" :to="tag.id" :key="i">{{ tag.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      tagList: [
        {
          id: '/',
          name: 'HTML5'
        },
        {
          id: '/',
          name: 'ajax'
        },
        {
          id: '/',
          name: 'Vue'
        },
        {
          id: '/',
          name: 'linux'
        },
        {
          id: '/',
          name: 'css3'
        },
        {
          id: '/',
          name: '优化'
        },
      ]
    }
  },
  computed: {
    ...mapState(['behavior'])
  }
}
</script>

<style scoped>
.content .tag {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
.tag .tag__list {
  margin-top: 20px;
}
.tag .tag__list a {
  display: inline-block;
  margin: 0 5px 5px 0;
  font-size: 16px;
  color: #6fb0be;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #6fb0be;
}
</style>