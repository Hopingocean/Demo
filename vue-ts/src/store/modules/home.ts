import { defineStore } from "pinia";
import { getHospitalList } from "@/api";
import type { HosResponseData, HosContent } from "@/api/type";

export const useHomeStore = defineStore("homeStore", {
  state: () => {
    return {
      hosList: [] as HosContent,
    };
  },
  getters: {
    hosListLength: (state) => {
      state.hosList.length;
    },
  },
  actions: {
    async getHosStateList() {
      const res: HosResponseData = await getHospitalList({ page: 1, limit: 10 });
      console.log("state", res);
      this.hosList = res.data.content || [];
    },
  },
});
