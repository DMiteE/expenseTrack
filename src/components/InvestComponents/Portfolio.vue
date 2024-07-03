<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { getCrypto, getCryptoPrice } from "@/service/firebaseService";
import axios from 'axios';
const userStore = useUserStore();
const cryptoCurrencies = ref([]);
onMounted(async () => {
  getCryptoInfo();
  //Апи не дает получить актуальную цену криптовалюты, слишком много запросов
  // setInterval(getCryptoInfo, 5000);
})

defineProps({
  cryptoCount: {
    type: Number,
    required: true,
  },
});

const getCryptoInfo = async () => {
  cryptoCurrencies.value = await getCrypto(userStore.userId);
  cryptoCurrencies.value.forEach((crypto) => {
    getCryptoPrice(crypto.id)
      .then(result => {
        crypto.price = result;
        crypto.userPrice = result * crypto.count;
      })
      .catch(error => {
        console.error(error);
      });
  });
};

</script>

<template>
  <div class="items-end">
    <div>
      <div class="bg-white">
            <div class="p-10 sm:p-10 lg:p-10">
                <ul role="list" class="divide-y divide-gray-100">
                    <li v-for="crypto in cryptoCurrencies" :key="crypto.id" class="flex justify-between gap-x-6 py-5">
                      <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                          <p class="text-sm font-semibold leading-6 text-gray-900">{{ crypto.id }}</p>
                          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ crypto.price }} USD</p>
                        </div>
                      </div>
                      <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm leading-6 text-gray-900">{{ crypto.userPrice  }} USD</p>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                        {{ crypto.count }}x
                        </p>
                      </div>
                    </li>
                  </ul>
            </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
