import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateArticleView from "../views/CreateArticleView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CreateVideoView from "@/views/CreateVideoView.vue";
import DetailView from "@/views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create/article",
      name: "create-article",
      component: CreateArticleView,
    },
    {
      path: "/create/video",
      name: "create-video",
      component: CreateVideoView,
    },
    {
      path: "/details/:id",
      name: "details",
      component: DetailView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
  ],
});

export default router;
