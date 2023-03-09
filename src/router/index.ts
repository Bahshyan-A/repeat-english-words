import { createWebHistory, createRouter } from "vue-router";
import Main from '../pages/Main.vue';
import Quiz from "../pages/Quiz.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;