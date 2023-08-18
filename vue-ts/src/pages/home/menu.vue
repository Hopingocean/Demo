<script setup lang="ts">
import { ref, reactive } from "vue";
const activeIndex = ref("1");
const menuList = [
  {
    id: 1,
    name: "home",
    title: "Home",
  },
  {
    id: 2,
    title: "Menu",
    children: [
      {
        id: 21,
        name: "menu1",
        title: "Menu-1",
      },
      {
        id: 22,
        name: "menu2",
        title: "Menu-2",
      },
    ],
  },
];
</script>

<template>
  <el-menu :default-active="activeIndex" router>
    <div v-for="menu in menuList" :key="menu.id">
      <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.name">
        <template #title>
          {{ menu.title }}
        </template>
        <el-menu-item
          v-if="menu.children && menu.children.length"
          v-for="menuChild in menu.children"
          :key="menuChild.id"
          :index="menuChild.name"
          >{{ menu.title }}</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item v-else :index="menu.name">{{ menu.title }}</el-menu-item>
    </div>
  </el-menu>
</template>
