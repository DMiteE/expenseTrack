<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const count = ref(0);
const selectedCrypto = ref("choose");
const cryptoCurrencies = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "binancecoin", name: "Binance Coin" },
  { id: "cardano", name: "Cardano" },
  { id: "tether", name: "Tether" },
  { id: "solana", name: "Solana" },
  { id: "polkadot", name: "Polkadot" },
  { id: "XRP", name: "XRP" },
  { id: "dogecoin", name: "Dogecoin" },
  { id: "avalanche-2", name: "Avalanche" },
  { id: "terra-luna", name: "Terra" },
  { id: "shiba-inu", name: "Shiba Inu" },
  { id: "polygon", name: "Polygon" },
  { id: "chainlink", name: "Chainlink" },
  { id: "litecoin", name: "Litecoin" },
  { id: "uniswap", name: "Uniswap" },
  { id: "cosmos", name: "Cosmos" },
  { id: "vechain", name: "VeChain" },
  { id: "internet-computer", name: "Internet Computer" },
  { id: "algorand", name: "Algorand" },
  { id: "toncoin", name: "Ton" },
];

const addNewCrypto = async () => {
  const newCrypto = {
    id: selectedCrypto.value,
    name: selectedCrypto.value,
    count: count.value,
  };
  await setDoc(
    doc(
      getFirestore(),
      `users/${userStore.userId}/crypto`,
      selectedCrypto.value
    ),
    newCrypto
  );
  closeModal();
};

defineProps({
  ViewCryptoModal: {
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
    v-if="ViewCryptoModal"
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
          <h1 class="font-bold text-base">Добавление новой монеты</h1>
          <XMarkIcon @click="closeModal" class="w-8"></XMarkIcon>
        </div>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Колличество</label
            >
            <div class="mt-2.5">
              <input
                type="number"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="count"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="flex items-end w-full">
            <select
              id="transaction-type"
              v-model="selectedCrypto"
              class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>Выберите монету</option>
              <option
                v-for="type in cryptoCurrencies"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button
            type="button"
            @click="addNewCrypto()"
            class="text-white bg-gradient-to-r mt-10 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
