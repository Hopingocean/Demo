<script setup lang="ts">
// import request from "@/utils/request";
import { onMounted, ref } from "vue";
import { getHospitalList } from "@/api/";
import type { HosResponseData, HosContent } from "@/api/type";
let pageNum = ref<number>(1);
let pageSize = ref<number>(10);
let hosList = ref<HosContent>([]);
onMounted(() => {
  // request.get("/hosp/hospital/1/10").then((res) => {
  //   console.log(res);
  // });
  hospitalList({ page: pageNum.value, limit: pageSize.value });
});
const hospitalList = async (obj: { page: number; limit: number }) => {
  const res: HosResponseData = await getHospitalList(obj);
  console.log(res);
  hosList.value = res.data.content || [];
};
</script>

<template>
  <div class="home">
    <!-- <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
    <div class="container">
      <ul>
        <li v-for="item in hosList" :key="item.id">
          <p>{{ item.hosname }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
