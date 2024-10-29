import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../views/Login.vue";
import HomePage from "../views/Home.vue";
// import Exchange from "../views/Exchange.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Home",
    name: "Home",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "HomePage",
        component: HomePage,
      },
      // {
      //   path: "Exchange",
      //   name: "Exchange",
      //   component: Exchange,
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
