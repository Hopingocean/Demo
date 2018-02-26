<template>
  <div class="toolbar">
    <i class="glyphicon logo" @click="toggleList"><img src="../assets/logo.png" width="30" height="30" alt="vue"></i>
    <i class="glyphicon glyphicon-plus" @click="newNote"></i>
    <i class="glyphicon glyphicon-star" @click="toggleFavorite" :class="{starred: activeNote.favorite}"></i>
    <i class="glyphicon glyphicon-remove" @click="deleteNote"></i>
  </div>
</template>

<script>
  import { mapActions, mapState} from 'vuex';

  export default {
    name: 'Toolbar',
    methods: mapActions([
      'newNote',
      'toggleFavorite',
      'deleteNote',
      'toggleList'
    ]),
    computed: mapState([
      'activeNote',
      'toggle'
    ])
  }
</script>

<style scoped>
  .toolbar {
    float: left;
    width: auto;
    height: 100%;
    background-color: #30414D;
    color: #767676;
    padding: 35px 20px 20px 20px;
  }
  .toolbar .starred {
    color: #f7ae4f;
  }
  .toolbar i {
    display: block;
    font-size: 30px;
    margin-bottom: 35px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.5s ease;
    text-align: center;
  }
  .toolbar i:hover {
    opacity: 1.0;
  }
</style>

