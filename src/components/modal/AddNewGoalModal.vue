<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/stores/user";
import { useGoalStore } from "@/stores/goal";
const goalStore = useGoalStore();
const userStore = useUserStore();
const name = ref("");
const summ = ref(0);
const goalSumm = ref(0);
const message = ref("Новая цель");
const addNewGoal = async () => {
  const newGoal = {
    id: uuidv4(),
    name: name.value,
    summ: summ.value,
    goalSumm: goalSumm.value,
    message: message.value,
    date: new Date().getTime(),
    dateEnd: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
  };
  if (goalSumm.value != 0 && name.value != "") {
    await setDoc(
      doc(getFirestore(), `users/${userStore.userId}/goal`, newGoal.id),
      newGoal
    );
    goalStore.fetchGoals();
    closeModal();
  }
};

defineProps({
  ViewGoalModal: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emit = defineEmits(["isOpen"]);
const closeModal = () => {
  emit("isOpenModal", false);
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
          <h1 class="font-bold text-base">Новая цель</h1>
          <XMarkIcon @click="closeModal" class="w-8"></XMarkIcon>
        </div>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Название цели</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="name"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Сумма сколько уже собрано</label
            >
            <div class="mt-2.5">
              <input
                type="number"
                name="summ"
                id="summ"
                v-model="summ"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Сумма сколько нужно собрать</label
            >
            <div class="mt-2.5">
              <input
                type="number"
                name="goalSumm"
                id="goalSumm"
                v-model="goalSumm"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button
            type="button"
            @click="addNewGoal()"
            class="text-white bg-gradient-to-r mt-10 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
