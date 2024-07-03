<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useUserStore } from "@/stores/user";
import { useGoalStore } from "@/stores/goal";
const goalStore = useGoalStore();
const userStore = useUserStore();
const name = ref("");
const summ = ref(0);
const goalSumm = ref(0);
const message = ref("Новая цель");
const props = defineProps({
  ViewGoalModal: {
    type: Boolean,
    default: false,
    required: true,
  },
  summType: {
    type: Number,
  },
});
const emit = defineEmits(["isOpen"]);
const closeModal = () => {
  emit("isOpenModal", false);
};
const updateGoalSumm = async () => {
  const goalRef = doc(
    getFirestore(),
    `users/${userStore.userId}/goal`,
    goalStore.goals[0].id
  );
  const goalSnapshot = await getDoc(goalRef);
  if (goalSnapshot.exists()) {
    const goalData = goalSnapshot.data();
    console.log(props.summType);
    if (props.summType == 0 && goalSumm.value > 0) {
      goalData.summ -= goalSumm.value;
    } else {
      goalData.summ += goalSumm.value;
    }
    if (goalData.summ > 0) {
      await updateDoc(goalRef, goalData);
      goalStore.fetchGoals();
    }
  } else {
    console.log("Цель не найдена");
  }

  closeModal();
};
</script>

<template>
  <div
    v-if="ViewGoalModal"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block p-5 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="flex justify-between items-center mb-10">
          <h1 class="font-bold text-base">{{ goalStore.goals[0].name }}</h1>
          <XMarkIcon @click="closeModal" class="w-8"></XMarkIcon>
        </div>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >{{
                summType == 0 ? "Убавить из суммы" : "Добавить к сумме"
              }}</label
            >
            <div class="mt-2.5">
              <input
                type="number"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="goalSumm"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button
            type="button"
            @click="updateGoalSumm()"
            class="text-white bg-gradient-to-r mt-10 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            {{ summType == 0 ? "Убавить" : "Добавить" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
