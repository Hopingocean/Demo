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
    <AsyncComp>
      <template v-slot:header>
        <h2>header2</h2>
      </template>
    </AsyncComp>
    <ComSetup></ComSetup>
    <ComWatch></ComWatch>
  </div>
</template>

<script>
import {defineAsyncComponent, inject} from 'vue';
import ComProps from '@/views/components/ComProps.vue'
import ComSlot from '@/views/components/ComSlot.vue'
import ComSetup from '@/views/components/ComSetup.vue'
import ComWatch from '@/views/components/ComWatch.vue'

export default {
  name: 'App',
  provide() {
    return {
      itemsLength: this.items.length
    }
  },
  setup () {
    const userLocation = inject('location');
    const userGeolocation = inject('geolocation');
    const updateGeolocation = inject('updateGeolocation');
    console.log(userLocation, userGeolocation);
    return {
      userLocation,
      userGeolocation,
      updateGeolocation
    }
  },
  components: {
    ComProps,
    ComSlot,
    ComSetup,
    ComWatch,
    AsyncComp: defineAsyncComponent(() => import('@/views/components/ComSlot.vue'))
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
