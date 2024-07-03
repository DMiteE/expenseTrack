import { defineStore } from "pinia";
import { getGoal } from "@/service/firebaseService";
import { ref } from "vue";
import { useUserStore } from "./user";

export const useGoalStore = defineStore("goalStore", () => {
  const goals = ref([]);
  const error = ref(null);
  const fetchGoals = async () => {
    const userStore = useUserStore();
    error.value = null;
    try {
      const goalData = await getGoal(userStore.userId);
      goals.value = goalData;
    } catch (err) {
      error.value = err;
    }
  };
  return { goals, error, fetchGoals };
});
