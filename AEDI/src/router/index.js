import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("./../pages/MainPage.vue"),
  },
  {
    path: "/login",
    name: "로그인",
    component: () => import("./../pages/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "회원가입",
    component: () => import("./../pages/SignupPage.vue"),
  },
  {
    path: "/contest",
    name: "공모전",
    component: () => import("./../pages/ContestListPage.vue"),
  },
  {
    path: "/graduation",
    name: "졸업작품",
    component: () => import("./../pages/GraduationListPage.vue"),
  },
  {
    path: "/notice",
    name: "공지사항",
    component: () => import("./../pages/NocticeListPage.vue"),
  },
  {
    path: "/event",
    name: "이벤트",
    component: () => import("./../pages/EventListPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
