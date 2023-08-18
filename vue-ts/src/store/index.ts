import { useHomeStore } from "@/store/modules/home";
import { useTestStore } from "./modules/test";

export const useStore = () => {
  return {
    homeStore: useHomeStore(),
    testStore: useTestStore(),
  };
};
