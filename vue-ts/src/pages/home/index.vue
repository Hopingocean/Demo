<script setup lang="ts">
import request from "@/utils/request";
import { onMounted } from "vue";
onMounted(() => {
  request.get("/hosp/hospital/1/10").then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <div class="home">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped></style>
