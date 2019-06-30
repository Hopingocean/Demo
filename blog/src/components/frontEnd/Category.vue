<template>
  <div class="content" :data-behavior="behavior">
    <div class="category">
      <h3>搜索分类</h3>
      <ul>
        <li v-for="(category, i) in categoryList" :key="i">
          <router-link :to="category.id">{{ category.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      categoryList: [
        {
          id: '/',
          name: '个人总结'
        },
        {
          id: '/',
          name: 'javaScript'
        },
        {
          id: '/',
          name: 'Vue'
        },
        {
          id: '/',
          name: 'Tips'
        },
        {
          id: '/',
          name: '生活'
        }
      ]
    }
  },
  computed: {
    ...mapState(['behavior'])
  }
}
</script>

<style scoped>
.content .category {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
.category ul li {
  padding: 10px 0;
}
.category ul li a {
  text-decoration: none;
  font-size: 16px;
  color: greenyellow;
}
</style>
