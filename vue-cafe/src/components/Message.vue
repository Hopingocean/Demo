<template>
  <div>
    <h1>{{msg}}</h1><hr>
    <h2>{{$store.state.count}}--{{count}}</h2>
    <p>
      <button @click="$store.commit('add', 10)">+</button>
      <button @click="reduce">-</button>
    </p>
    <p>
      <button @click="addAction">+</button>
      <button @click="reduceAction">-</button>
    </p>
  </div>
</template>

<script>
import store from '@/vuex/'
// import mapState from 'vuex'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return {
      msg: 'Hello Vuex'
    }
  },
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   }
  // },

  // computed:mapState({
  //   count:state=>state.count
  // }),

  // computed:mapState(['count']),

  computed: {
    ...mapState({
      count:state=>state.count
    }),
    // ...mapGetters(['count'])
  },

  // methods:mapMutations(['add', 'reduce']),
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  },

  store
}
</script>

<style scoped>

</style>
