<template>
  <div id="app" class="app">
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<script>
  import Toolbar from './components/Toolbar';
  import NotesList from './components/NotesList';
  import Editor from './components/Editor';

  export default {
    name: 'app',
    components: {
      Toolbar,
      NotesList,
      Editor
    },
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
  }
  .app {
    display: flex;
    align-items: stretch;
    height: 100vh;
  }
</style>
