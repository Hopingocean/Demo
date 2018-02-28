<template>
  <div class="content" :data-behavior="behavior">
    <div class="tag">
      <h3>搜索标签</h3>
      <div class="tag__list">
        <a v-for="(tag, i) in tagList" :href="tag.id" :key="i">{{ tag.name }}</a>
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
          id: '#html5',
          name: 'HTML5'
        },
        {
          id: '#ajax',
          name: 'ajax'
        },
        {
          id: '#vue',
          name: 'Vue'
        },
        {
          id: '#linux',
          name: 'linux'
        },
        {
          id: '#css3',
          name: 'css3'
        },
        {
          id: '#optimize',
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