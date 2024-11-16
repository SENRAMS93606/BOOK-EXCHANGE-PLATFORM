import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../views/Login.vue";
import HomePage from "../views/Home.vue";
import ForgotPassword from "../components/Login/ForgotPassword.vue";
import ResetPassword from "../components/Login/ResetPassword.vue";
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
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
      {
        path: "/reset-password/:token",
        name: "ResetPassword",
        component: ResetPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
