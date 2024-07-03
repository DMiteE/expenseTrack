<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/stores/user";
import { useOperationStore } from "@/stores/operations";
import { getNowMonth } from "../../helpers/dateMonth";

const operationStore = useOperationStore();
const userStore = useUserStore();
const name = ref("");
const summ = ref(0);
const message = ref("");
const selectedType = ref("choose");
const selectedCategory = ref("");
const lossTypes = [
  { value: "product", label: "Продукты" },
  { value: "cafeRestaurant", label: "Кафе/Рестораны" },
  { value: "housing", label: "Жилье" },
  { value: "transport", label: "Транспорт" },
  { value: "health", label: "Здоровье" },
  { value: "education", label: "Образование" },
  { value: "entertainment", label: "Развлечения" },
  { value: "clothingShoes", label: "Одежда и обувь" },
  { value: "communication", label: "Связь" },
  { value: "giftsCharity", label: "Подарки и благотворительность" },
  { value: "beautyHealth", label: "Красота и здоровье" },
  { value: "travel", label: "Путешествия" },
  { value: "other", label: "Другие расходы" },
];

const incomeTypes = [
  { value: "work", label: "Работа" },
  { value: "invistions", label: "Инвестиции" },
  { value: "property", label: "Недвижимость" },
];

const addNewOperation = async () => {
  const now = new Date();
  const operation = {
    id: uuidv4(),
    name: name.value,
    summ: summ.value,
    message: message.value,
    type: {
      value: selectedType.value,
      label: selectedType.value === "income" ? "Доход" : "Расход",
    },
    category: {
      value: selectedCategory.value,
      label: categoryLabels[selectedType.value][selectedCategory.value],
    },
    date: now.getTime(),
    month: getNowMonth(),
  };
  if (summ.value > 0 && name.value != "") {
    await setDoc(
      doc(
        getFirestore(),
        `users/${userStore.userId}/${operation.type.value}_operation`,
        operation.id
      ),
      operation
    );
    operationStore.fetchOperationsByMonth();
    closeModal();
  }
};

const addNewGoal = async () => {
  const newGoal = {
    id: uuidv4(),
    name: name.value,
    summ: 0,
    goalSumm: summ.value,
    message: message.value,
    date: new Date().getTime(),
  };
  await setDoc(
    doc(getFirestore(), `users/${userStore.userId}/goal`, newGoal.id),
    newGoal
  );
  operationStore.fetchOperationsByMonth();
  closeModal();
};

const categoryLabels = {
  income: Object.fromEntries(
    incomeTypes.map((type) => [type.value, type.label])
  ),
  loss: Object.fromEntries(lossTypes.map((type) => [type.value, type.label])),
};

defineProps({
  ViewOpetaionModal: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emit = defineEmits(["isOpen"]);
const closeModal = () => {
  emit("isOpen", false);
};
</script>

<template>
  <div
    v-if="ViewOpetaionModal"
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
          <h1 class="font-bold text-base">Новая операция</h1>
          <XMarkIcon @click="closeModal" class="w-8"></XMarkIcon>
        </div>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Название</label
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
          <div class="flex items-end w-full">
            <select
              id="transaction-type"
              v-model="selectedType"
              class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="choose" selected>Выберите категорию</option>
              <option value="income">Доход</option>
              <option value="loss">Расход</option>
            </select>
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Сумма</label
            >
            <div class="mt-2.5">
              <input
                type="number"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="summ"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="flex items-end w-full">
            <select
              id="transaction-type"
              v-model="selectedCategory"
              class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <template v-if="selectedType == 'income'">
                <option selected disabled>Катеогрия дохода</option>
                <option
                  v-for="type in incomeTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </template>
              <template v-if="selectedType == 'loss'">
                <option selected disabled>Категория трат</option>
                <option
                  v-for="type in lossTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </template>
              <template v-if="selectedType == 'goal'"> </template>
            </select>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button
            type="button"
            @click="addNewOperation()"
            class="text-white bg-gradient-to-r mt-10 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
