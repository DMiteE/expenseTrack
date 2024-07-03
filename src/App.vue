<script setup>
import { RouterView, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userStore.userId = user.uid;
      userStore.userName = user.displayName;
    } else {
      userStore.userId = "";
    }
  });
});
</script>

<template>
  <RouterView />
</template>

