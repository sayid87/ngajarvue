import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeLoginVue from '@/views/HomeLogin.vue'
import UbahVue from '@/views/UbahView.vue'
import { useLoginStore } from '@/stores/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Beranda' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue,
      meta: { title: 'Login' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViewVue,
      meta: { title: 'Registrasi' }
    },
    {
      path: '/home',
      name: 'homelogin',
      component: HomeLoginVue,
      meta: { title: 'List Member' }
    },
    {
      path: '/ubah/:id',
      name: 'ubah',
      component: UbahVue,
      meta: { title: 'Ubah Member' }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundView,
      meta: { title: 'Halaman Tidak Ditemukan' }
    }
  ]
})

const DEFAULT_TITLE = 'Belajar VueJS';
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  document.title = to.meta.title + " | " + DEFAULT_TITLE || DEFAULT_TITLE;
});

router.beforeEach(async (to) => {

  const loginStore = useLoginStore()

  if (localStorage.getItem("loginUser")) {
    const dataUser = JSON.parse(localStorage.getItem("loginUser"))
    loginStore.setLoginUser(dataUser)
  }
  const publicPages = [
    '/login',
    '/register',
    '/',
    // '/produk/' + to.params.id,
    // '/produk/cari',
    // '/kategori/' + to.params.id,
  ];
  const authRequired = !publicPages.includes(to.path);
  //console.log(to.params)

  if (authRequired && loginStore.dataUser.value == undefined) {

    loginStore.returnUrl = to.fullPath;
    return '/';
  }


})

export default router
