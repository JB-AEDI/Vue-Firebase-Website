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
    path: "/contest/page/:page_id",
    name: "공모전",
    component: () => import("./../pages/ContestListPage.vue"),
  },
  {
    path: "/contest/upload",
    name: "공모전 업로드",
    component: () => import("./../pages/ContestUploadPage.vue"),
  },
  {
    path: "/contest/info",
    name: "공모전 소개",
    component: () => import("./../pages/ContestInfoPage.vue"),
  },
  {
    path: "/contest/project/upload",
    name: "공모전 프로젝트 업로드",
    component: () => import("./../pages/ContestProjectUploadPage.vue"),
  },
  {
    path: "/contest/project",
    name: "공모전 프로젝트",
    component: () => import("./../pages/ContestProjectPage.vue"),
  },
  {
    path: "/graduation/page/:page_id",
    name: "졸업작품",
    component: () => import("./../pages/GraduationListPage.vue"),
  },
  {
    path: "/graduation/upload",
    name: "졸업작품 업로드",
    component: () => import("./../pages/GraduationUploadPage.vue"),
  },
  {
    path: "/graduation/info",
    name: "졸업작품 소개",
    component: () => import("./../pages/GraduationInfoPage.vue"),
  },
  {
    path: "/graduation/project/upload",
    name: "졸업작품 프로젝트 업로드",
    component: () => import("./../pages/GraduationProjectUploadPage.vue"),
  },
  {
    path: "/graduation/project",
    name: "졸업작품 프로젝트",
    component: () => import("./../pages/GraduationProjectPage.vue"),
  },
  {
    path: "/notice/page/:page_id",
    name: "공지사항",
    component: () => import("./../pages/NocticeListPage.vue"),
  },
  {
    path: "/notice/upload",
    name: "공지사항 업로드",
    component: () => import("./../pages/NoticeUploadPage.vue"),
  },
  {
    path: "/notice/post/:post_id",
    name: "공지사항 게시물",
    component: () => import("./../pages/NoticePostPage.vue"),
  },
  {
    path: "/event/page/:page_id",
    name: "이벤트",
    component: () => import("./../pages/EventListPage.vue"),
  },
  {
    path: "/event/upload",
    name: "이벤트 업로드",
    component: () => import("./../pages/EventUploadPage.vue"),
  },
  {
    path: "/event/post/:post_id",
    name: "이벤트 게시물",
    component: () => import("./../pages/EventPostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
