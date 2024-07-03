import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const checkAuth = (to, from, next) => {
  let isAuth = false;

  onAuthStateChanged(getAuth(), (user) => {
    if (user && !isAuth) {
      isAuth = true;
      next();
    } else if (!user && !isAuth) {
      isAuth = true;
      next("/auth");
    }
  });
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/AboutView.vue"),
    // beforeEnter: checkAuth
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/finance",
    name: "finance",
    component: () => import("../views/FinanceView.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/invests",
    name: "invests",
    component: () => import("../views/InvestView.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/advice",
    name: "advice",
    component: () => import("../views/AdviceView.vue"),
    beforeEnter: checkAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
