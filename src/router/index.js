import Vue from "vue";
import VueRouter from "vue-router";
import Documents from "../views/Documents.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Documents",
    component: Documents,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
