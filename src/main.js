import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO75mcqK9aqLkx2ZZorcTPeVnixp1MRPk",
  authDomain: "expensestat.firebaseapp.com",
  projectId: "expensestat",
  storageBucket: "expensestat.appspot.com",
  messagingSenderId: "851123002621",
  appId: "1:851123002621:web:a8ec1476ce18b8b4983294"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
