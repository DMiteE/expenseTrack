<script setup>
import { ref, defineProps } from "vue";
import AddCryptoInvestModal from "../modal/AddCryptoInvestModal.vue";

defineProps({
  headerTitle: {
    type: String,
    required: true,
  },
});

const isOpenCrypto = ref(false);
const isOpenshares = ref(false);

const emit = defineEmits(["isOpen"]);

const closeModal = () => {
  isOpenCrypto.value = false;
};

const openModal = (title) => {
  if (title == "Криптовалюта") {
    isOpenCrypto.value = true;
  } else {
    isOpenshares.value = true;
  }
};
</script>

<template>
  <div
    class="flex items-baseline justify-between border-b border-gray-200 pt-14 pr-10 pl-10 pb-5"
  >
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">
      {{ headerTitle }}
    </h1>
    <div class="flex items-center">
      <button
        type="button"
        class="-m-2 ml-4 p-2 text-4xl text-gray-400 hover:text-gray-500 sm:ml-6"
        @click="openModal(headerTitle)"
      >
        +
      </button>
    </div>
  </div>
  <AddCryptoInvestModal
    :ViewCryptoModal="isOpenCrypto"
    @isOpen="closeModal()"
  ></AddCryptoInvestModal>
</template>
