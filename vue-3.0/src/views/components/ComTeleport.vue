<template>
  <!-- 只改变渲染的DOM结构，不影响组件间的逻辑关系 -->
  <div class="teleport">
    <Teleport to="#app">
      <p>A</p>
    </Teleport>
    <Teleport to="#app" disabled>
      <p>B</p>
    </Teleport>
    <Teleport to="body">
      <p>C</p>
    </Teleport>
  </div>
</template>