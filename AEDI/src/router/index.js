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
    path: "/contest/info",
    name: "공모전 소개",
    component: () => import("./../pages/ContestInfoPage.vue"),
  },
  {
    path: "/contest/upload",
    name: "공모전 프로젝트 업로드",
    component: () => import("./../pages/ContestProjectUploadPage.vue"),
  },
  {
    path: "/contest/project",
    name: "공모전 프로젝트",
    component: () => import("./../pages/ContestProjectPage.vue"),
  },
  {
    path: "/graduation",
    name: "졸업작품",
    component: () => import("./../pages/GraduationListPage.vue"),
  },
  {
    path: "/graduation/info",
    name: "졸업작품 소개",
    component: () => import("./../pages/GraduationInfoPage.vue"),
  },
  {
    path: "/graduation/upload",
    name: "졸업작품 프로젝트 업로드",
    component: () => import("./../pages/GraduationProjectUploadPage.vue"),
  },
  {
    path: "/graduation/project",
    name: "졸업작품 프로젝트",
    component: () => import("./../pages/GraduationProjectPage.vue"),
  },
  {
    path: "/notice",
    name: "공지사항",
    component: () => import("./../pages/NocticeListPage.vue"),
  },
  {
    path: "/notice/post",
    name: "공지사항 게시물",
    component: () => import("./../pages/NoticePostPage.vue"),
  },
  {
    path: "/event",
    name: "이벤트",
    component: () => import("./../pages/EventListPage.vue"),
  },
  {
    path: "/event/post",
    name: "이벤트 게시물",
    component: () => import("./../pages/EventPostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
