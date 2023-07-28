<template>
  <button v-bind="$attrs"></button>
  <div class="attrs">
    <h1>header</h1>
    <a v-bind="$attrs">content</a>
    <p>footer</p>
  </div>
</template>
<!-- 当一个组件以单个元素为根作渲染时，透传的attribute会自动添加到根元素上，如class,style,id -->

<script></script>
