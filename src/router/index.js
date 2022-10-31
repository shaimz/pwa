import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/LoginComponent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(onAuthRequired)

function onAuthRequired(from, to, next) {
  // Here we do a request to the /api/authentication_token endpoint with our email and password
  // Then we set the token in the localStorage // cookies
  let isAuthenticated = cookies.get('token');
  let requiresAuth = from.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth && !isAuthenticated) next()
  if (requiresAuth && isAuthenticated) next()
  if (!requiresAuth && isAuthenticated) next('/')
  if (requiresAuth && !isAuthenticated) next('/login')
  let user = localStorage.getItem('user')
  localStorage.setItem('user', user)
  next()
}


export default router;
