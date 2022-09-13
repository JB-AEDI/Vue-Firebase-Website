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
    path: "/contest/page",
    name: "공모전",
    component: () => import("./../pages/ContestPages/ContestListPage.vue"),
  },
  {
    path: "/contest/upload",
    name: "공모전 업로드",
    component: () => import("./../pages/ContestPages/ContestUploadPage.vue"),
  },
  {
    path: "/contest/info",
    name: "공모전 소개",
    component: () => import("./../pages/ContestPages/ContestInfoPage.vue"),
  },
  {
    path: "/contest/project/upload",
    name: "공모전 프로젝트 업로드",
    component: () =>
      import("./../pages/ContestPages/ContestProjectUploadPage.vue"),
  },
  {
    path: "/contest/project",
    name: "공모전 프로젝트",
    component: () => import("./../pages/ContestPages/ContestProjectPage.vue"),
  },
  {
    path: "/graduation/page",
    name: "졸업작품",
    component: () =>
      import("./../pages/GraduationPages/GraduationListPage.vue"),
  },
  {
    path: "/graduation/upload",
    name: "졸업작품 업로드",
    component: () =>
      import("./../pages/GraduationPages/GraduationUploadPage.vue"),
  },
  {
    path: "/graduation/info/:post_id",
    name: "졸업작품 소개",
    component: () =>
      import("./../pages/GraduationPages/GraduationInfoPage.vue"),
  },
  {
    path: "/graduation/project/upload",
    name: "졸업작품 프로젝트 업로드",
    component: () =>
      import("./../pages/GraduationPages/GraduationProjectUploadPage.vue"),
  },
  {
    path: "/graduation/project",
    name: "졸업작품 프로젝트",
    component: () =>
      import("./../pages/GraduationPages/GraduationProjectPage.vue"),
  },
  {
    path: "/notice/page",
    name: "공지사항",
    component: () => import("./../pages/NoticePages/NocticeListPage.vue"),
  },
  {
    path: "/notice/upload",
    name: "공지사항 업로드",
    component: () => import("./../pages/NoticePages/NoticeUploadPage.vue"),
  },
  {
    path: "/notice/post/:post_id",
    name: "공지사항 게시물",
    component: () => import("./../pages/NoticePages/NoticePostPage.vue"),
  },
  {
    path: "/notice/post/:post_id/update",
    name: "공지사항 게시물 수정",
    component: () => import("./../pages/NoticePages/NoticeUpdatePage.vue"),
  },
  {
    path: "/event/page",
    name: "이벤트",
    component: () => import("./../pages/EventPages/EventListPage.vue"),
  },
  {
    path: "/event/upload",
    name: "이벤트 업로드",
    component: () => import("./../pages/EventPages/EventUploadPage.vue"),
  },
  {
    path: "/event/post/:post_id",
    name: "이벤트 게시물",
    component: () => import("./../pages/EventPages/EventPostPage.vue"),
  },
  {
    path: "/event/post/:post_id/update",
    name: "이벤트 게시물 수정",
    component: () => import("./../pages/EventPages/EventUpdatePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
