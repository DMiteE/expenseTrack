import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getAllOperationsByMonth,
  getAllOperationsAllMonth,
} from "@/service/firebaseService";
import { useUserStore } from "./user";

export const useOperationStore = defineStore("operationStore", () => {
  const operations = ref([]);
  const lossOperation = ref([]);
  const incomeOperation = ref([]);
  const operationsAllMonth = ref([]);
  const lossOperationAllMonth = ref([]);
  const incomeOperationAllMonth = ref([]);
  const error = ref(null);

  const fetchOperationsByMonth = async () => {
    error.value = null;
    const userStore = useUserStore();
    try {
      const operationsData = (await getAllOperationsByMonth(userStore.userId))
        .allOperationsData;
      const lossOperationsData = (
        await getAllOperationsByMonth(userStore.userId)
      ).lossOperationsData;
      const incomeOperationsData = (
        await getAllOperationsByMonth(userStore.userId)
      ).incomeOperationsData;
      operations.value = operationsData;
      lossOperation.value = lossOperationsData;
      incomeOperation.value = incomeOperationsData;
    } catch (err) {
      error.value = err;
    } finally {
    }
  };

  const fetchOperationsAllMonth = async () => {
    error.value = null;
    const userStore = useUserStore();
    try {
      const operationsData = (await getAllOperationsAllMonth(userStore.userId))
        .allOperationsData;
      const lossOperationsData = (
        await getAllOperationsAllMonth(userStore.userId)
      ).lossOperationsData;
      const incomeOperationsData = (
        await getAllOperationsAllMonth(userStore.userId)
      ).incomeOperationsData;
      operationsAllMonth.value = operationsData;
      lossOperationAllMonth.value = lossOperationsData;
      incomeOperationAllMonth.value = incomeOperationsData;
    } catch (err) {
      error.value = err;
    } finally {
    }
  };

  const operationsSumm = computed(() => {
    return operations.value.reduce((acc, curr) => {
      return acc + curr.summ;
    }, 0);
  });
  const lossOperationsSumm = computed(() => {
    return lossOperation.value.reduce((acc, curr) => {
      return acc + curr.summ;
    }, 0);
  });
  const incomeOperationsSumm = computed(() => {
    return incomeOperation.value.reduce((acc, curr) => {
      return acc + curr.summ;
    }, 0);
  });

  return {
    operations,
    lossOperation,
    incomeOperation,
    error,
    fetchOperationsByMonth,
    operationsSumm,
    lossOperationsSumm,
    incomeOperationsSumm,
    fetchOperationsAllMonth,
    operationsAllMonth,
    lossOperationAllMonth,
    incomeOperationAllMonth,
  };
});

export const useIncomeOperationStore = defineStore(
  "incomeOperationStore",
  () => {
    const operations = [];
    return { operations };
  }
);

export const useLossOperationStore = defineStore("losdOperationStore", () => {
  const operations = [];
  return { operations };
});
