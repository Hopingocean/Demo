<script setup lang="ts">
// import request from "@/utils/request";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { getHospitalList } from "@/api/";
import type { HosResponseData, HosContent } from "@/api/type";
import { useStore } from "@/store/";

import ChildOne from "@/components/home/ChildOne.vue";
import Child2 from "@/components/home/Child2.vue";
let pageNum = ref<number>(1);
let pageSize = ref<number>(10);
let hosList = ref<HosContent>([]);
// const homeStore = useHomeStore();
// const testStore = useTestStore();
const { homeStore, testStore } = useStore();
const { count, dobuleCount } = storeToRefs(testStore);
const hosStateList = homeStore.hosList;
onMounted(() => {
  // request.get("/hosp/hospital/1/10").then((res) => {
  //   console.log(res);
  // });
  homeStore.getHosStateList();
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
    <button @click="testStore.increment">{{ count }}</button>
    <ChildOne></ChildOne>
    <Child2></Child2>
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
