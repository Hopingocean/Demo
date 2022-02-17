<template>
  <div id="app">
    <app-watch></app-watch>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';
import AppWatch from './views/watch/AppWatch.vue'

export default {
  name: 'App',
  components: {
    AppWatch
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
