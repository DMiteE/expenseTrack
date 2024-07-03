<script setup>
import { computed, ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";

const isLogin = ref(true);
const email = ref("");
const password = ref("");
const name = ref("");
const isLoading = ref(false);
const router = useRouter();
const errorMsg = ref("");

const subtitleText = computed({
  get: () => (isLogin.value ? "Регистрация" : "Вход"),
  set: (value) => (isLogin.value = value),
});
const subtitleTextBtn = computed({
  get: () => (isLogin.value ? "Регистрация" : "Вход"),
  set: (value) => (isLogin.value = value),
});

const subtitleTextOffer = computed({
  get: () => (isLogin.value ? "Уже есть аккаунт?" : "Еще нет аккаунта?"),
  set: (value) => (isLogin.value = !isLogin.value),
});

const subtitleTextOfferLink = computed({
  get: () => (isLogin.value ? "Войти" : "Зарегистрироваться"),
  set: (value) => (isLogin.value = !isLogin.value),
});

const signUp = async () => {
  isLoading.value = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name.value,
    });
    router.push("/finance");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        errorMsg.value = "Пользователь с таким email уже существует";
      } else if (
        error.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        errorMsg.value = "Пароль должен содержать не менее 6 символов";
      } else {
        errorMsg.value = error.message;
      }
    }
  } finally {
    isLoading.value = false;
  }
};

const signIn = async () => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    router.push("/finance");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "Firebase: Error (auth/invalid-credential).") {
        errorMsg.value = "Неверная почта или пароль";
      } else {
        errorMsg.value = error.message;
      }
    }
  } finally {
    isLoading.value = false;
  }
};
const submitForm = () => {
  if (isLogin.value) {
    console.log("reg");
    signUp();
  } else {
    console.log("login");
    signIn();
  }
};
</script>
<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="../assets/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ subtitleText }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div v-if="isLogin">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Имя</label
          >
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              name="name"
              type="name"
              autocomplete="name"
              required=""
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Пароль</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>
      <div>
        <p
          class="flex mt-2 w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-red-600"
        >
          {{ errorMsg }}
        </p>
        <button
          @click="submitForm"
          class="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ subtitleTextBtn }}
        </button>
      </div>
      <p class="mt-10 text-center text-sm text-gray-500">
        {{ subtitleTextOffer }}
        {{ " " }}
        <a
          @click="isLogin = !isLogin"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >{{ subtitleTextOfferLink }}</a
        >
      </p>
    </div>
  </div>
</template>
