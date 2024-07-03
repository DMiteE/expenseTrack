<script setup>
import { ref, onMounted, watch } from "vue";
import GraphBar from "./GraphBar.vue";
import MixedGraph from "./MixedGraph.vue";
import AddOperationModal from "../modal/AddOperationModal.vue";
import AddNewGoalModal from "../modal/AddNewGoalModal.vue";
import CircleProgressBar from "./CircleProgressBar.vue";
import { useOperationStore } from "@/stores/operations";
import { useGoalStore } from "@/stores/goal";
import axios from "axios";

const operationStore = useOperationStore();
const goalStore = useGoalStore();
const lastFiveOperations = ref([]);
onMounted(() => {
  operationStore.fetchOperationsByMonth();
  goalStore.fetchGoals();
  updatelastFiveOperations();
  //getPrice();
});
watch(operationStore, () => {
  updatelastFiveOperations();
});
const balance = ref(0);
const isOpenOperation = ref(false);
const isOpenGoal = ref(false);
function updatelastFiveOperations() {
  lastFiveOperations.value = operationStore.operations
    .sort((a, b) => a.date - b.date)
    .slice(-5)
    .reverse();
}

async function getPrice() {
  const API_URL = "https://api.coingecko.com/api/v3/simple/price";
  const BITCOIN_ID = "bitcoin";
  axios
    .get(API_URL, {
      params: {
        ids: BITCOIN_ID,
        vs_currencies: "usd",
      },
    })
    .then((response) => {
      const bitcoinPrice = response.data[BITCOIN_ID].usd;
      console.log(bitcoinPrice);
    })
    .catch((error) => {
      console.error(error);
    });
}

function closeModal() {
  isOpenOperation.value = false;
  isOpenGoal.value = false;
}
const newTimeStemp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day
    .toString()
    .padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return formattedDate;
};
</script>

<template>
  <div class="items-end">
    <div>
      <div class="bg-white">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            class="mx-auto mt-8 w-100px max-w-8xl rounded-3xl ring-1 ring-gray-200 sm:mt-12 lg:mx-0 lg:flex lg:max-w-none"
          >
            <div
              class="flex flex-wrap items-center justify-around p-6 sm:p-8 lg:flex-auto"
            >
              <div>
                <h3 class="text-2xl font-bold tracking-tight text-gray-900">
                  Баланс
                </h3>
                <p class="mt-5 text-base leading-7 text-gray-800">
                  Всего:{{ operationStore.operationsSumm }}
                </p>
                <div class="mt-5 flex items-center gap-x-4">
                  <h4
                    class="flex-none text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Управление
                  </h4>
                  <div class="h-px flex-auto bg-gray-100" />
                </div>
                <div class="flex">
                  <div class="flex items-center mr-10">
                    <img
                      class="w-5 h-5"
                      src="/src/assets/up-arrow-ui-svgrepo-com.svg"
                      alt=""
                    />
                    <p>Доход:{{ operationStore.incomeOperationsSumm }}</p>
                    <img src="" alt="" />
                    <!-- <button class="w-5 h-5 rounded-md">
                    <img src="/src/assets/plus-circle-svgrepo-com.svg" alt="" />
                  </button> -->
                  </div>
                  <div class="flex items-center">
                    <img
                      class="w-5 h-5"
                      src="/src/assets/down-arrow-ui-svgrepo-com.svg"
                      alt=""
                    />
                    <p>Расход:{{ operationStore.lossOperationsSumm }}</p>
                  </div>
                </div>

                <div class="flex mt-10 items-center justify-center">
                  <button
                    type="button"
                    @click="isOpenOperation = true"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
                  >
                    Добавить
                  </button>
                </div>
              </div>
              <div v-if="!goalStore.goals[0]">
                <button
                  @click="isOpenGoal = true"
                  class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
                >
                  Добавить цель
                </button>
              </div>
              <div v-else class="flex flex-col items-center">
                <h1
                  class="text-2xl mb-1 font-bold tracking-tight text-gray-900"
                  @click="console.log(goalStore.goals)"
                >
                  Цель:{{ goalStore.goals[0].name }}
                </h1>
                <h4 class="font-bold text-base">
                  {{ goalStore.goals[0].summ }}/{{
                    goalStore.goals[0].goalSumm
                  }}
                </h4>
                <CircleProgressBar></CircleProgressBar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="bg-white">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            class="mx-auto mt-8 w-100px max-w-8xl p-10 justify-around rounded-3xl ring-1 ring-gray-200 sm:mt-12 lg:mx-0 flex flex-wrap"
          >
            <GraphBar chart-type="CircleGraph"></GraphBar>
            <GraphBar chart-type="PolarAreaBar"></GraphBar>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class="mx-auto mt-8 w-100px max-w-8xl rounded-3xl ring-1 ring-gray-200 sm:mt-12 lg:mx-0 lg:flex lg:max-w-none"
          >
            <div
              class="flex flex-wrap flex-row items-center p-6 sm:p-5 lg:flex-auto"
            >
              <div class="mr-8 w-full">
                <h3 class="text-2xl font-bold tracking-tight text-gray-900">
                  Последние операции
                </h3>
                <div class="mt-5 flex items-center gap-x-4">
                  <div class="h-px flex-auto bg-gray-100" />
                </div>
                <ul class="mt-10 divide-y divide-gray-200">
                  <li
                    v-for="(operation, index) in lastFiveOperations"
                    :key="index"
                    class="flex flex-wrap items-center justify-between py-4"
                  >
                    <div
                      class="flex flex-wrap flex-col items-start space-x-4 sm:flex-row sm:items-center"
                    >
                      <div class="text-sm font-medium text-gray-900">
                        {{ newTimeStemp(operation.date) }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ operation.name }}
                      </div>
                    </div>
                    <div
                      class="flex flex-wrap flex-col items-end space-x-4 sm:flex-row sm:items-center"
                    >
                      <div class="text-sm text-gray-500">
                        {{ operation.category.label }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ operation.type.label }}
                      </div>
                      <div
                        :class="
                          operation.type.label === 'Расход'
                            ? 'text-red-500'
                            : 'text-green-500'
                        "
                        class="text-sm font-medium"
                      >
                        {{ operation.summ }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="bg-white">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div
              class="mx-auto justify-center mt-8 w-100px max-w-8xl rounded-3xl ring-1 ring-gray-200 sm:mt-12 lg:mx-0 lg:flex lg:max-w-none"
            >
              <div
                class="flex flex-wrap items-center p-6 justify-center sm:p-8 lg:flex-auto"
              >
                <div class="mr-20 flex justify-center w-full">
                  <MixedGraph></MixedGraph>
                </div>
              </div>
            </div>
            <AddOperationModal
              :ViewOpetaionModal="isOpenOperation"
              @isOpen="closeModal()"
            ></AddOperationModal>
            <AddNewGoalModal
              :ViewGoalModal="isOpenGoal"
              @isOpenModal="closeModal()"
            ></AddNewGoalModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
