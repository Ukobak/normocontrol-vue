import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/HomePage.vue";
import About from "@/pages/AboutPage.vue";
import Works from "@/pages/WorksPage.vue";
import MyProfile from "@/pages/MyProfile.vue";
import AllWorks from "@/pages/AllWorksPage.vue";

import AdminUsers from "@/pages/admin/UsersPage.vue";
import AdminGroups from "@/pages/admin/GroupsPage.vue";
import AdminWorks from "@/pages/admin/WorksPage.vue";
import AdminSettings from "@/pages/admin/SettingsPage";
import AdminNormControllers from "@/pages/admin/NormControllersPage.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/works", name: "works", component: Works },
  { path: "/profile", name: "profile", component: MyProfile },
  { path: "/allWorks", name: "allWorks", component: AllWorks },
  { path: "/admin/users", name: "adminUsers", component: AdminUsers },
  { path: "/admin/works", name: "adminWorks", component: AdminWorks },
  { path: "/admin/groups", name: "adminGroups", component: AdminGroups },
  { path: "/admin/settings", name: "adminSettings", component: AdminSettings },
  {
    path: "/admin/normControllers",
    name: "adminNormControllers",
    component: AdminNormControllers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
