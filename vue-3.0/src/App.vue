<template>
  <div id="app">
    <ComProps v-model.capitalize="myText"></ComProps>
    {{myText}}
    <ComSlot :items="items">
      <template v-slot:header>
        <h1>header</h1>
      </template>
      <template v-slot:default="slotProps">
        <p>{{slotProps.name}}</p>
      </template>
      <template v-slot:footer>
        <p>footer</p>
      </template>
    </ComSlot>
  </div>
</template>

<script>
import ComProps from '@/views/components/ComProps.vue'
import ComSlot from '@/views/components/ComSlot.vue'

export default {
  name: 'App',
  provide() {
    return {
      itemsLength: this.items.length
    }
  },
  components: {
    ComProps,
    ComSlot
  },
  data () {
    return {
      myText: '',
      items: [
        {
          id: 1,
          name: 'aaa'
        },
        {
          id: 2,
          name: 'bbb'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
