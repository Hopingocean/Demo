<script setup lang="ts">
import SideMenu from "@/pages/home/menu.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header> header </el-header>
      <el-container>
        <el-aside width="200px">
          <SideMenu></SideMenu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer> footer </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
