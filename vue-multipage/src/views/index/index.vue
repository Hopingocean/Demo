<template>
  <div id="app">
    <!-- components -->
    <menu-bar :current-menu="currentMenu"></menu-bar>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'

export default {
  name: 'Index',
  components: { MenuBar },
  data() {
    return {
      
    }
  },
  created() {},
  methods: {},
  mounted() {}
}
</script>

<style scoped>

</style>
