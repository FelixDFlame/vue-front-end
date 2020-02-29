import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routesWithPrefix = (prefix: any, routes: any) => {
  //grouping routes pada vue js
  return routes.map((route: any) => {
    route.path = `${prefix}${route.path}`
    return route
  })
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
    meta: { requiredAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
    meta: { requiredAuth: true }
  },
  {
    path: '/testing',
    name: 'testing',
    component: () => import(/* webpackChunkName: "testing" */ '../views/TestingVue/Testing.vue')
  },
  {
    //testing dynamic Routing
    path: '/dynamicTesting/destinations/:destinationName',
    name: 'dynamicTesting',
    component: () => import(/* webpackChunkName: "dynamicTesting" */ '../views/TestingVue/DynamicTesting.vue'),
    meta: { requiredAuth: true },
    props: true,
    children: [
      {
        path: ":landmarkName",
        name: "landmark",
        props: true,
        component: () =>
          import(/*webpackChunkName: "DynamicTestingLandmark"*/ '../views/TestingVue/DynamicTestingLandmark.vue')
      }
    ]
  },
  {
    path: '/TestingVuex',
    name: 'VuexTesting',
    component: () => import(/* webpackChunkName: "VuexTesting" */ '../views/TestingVue/TestingVuex.vue')
  },
  ...routesWithPrefix('/Movies', [
    {
      path: '',
      name: 'movie',
      component: () => import(/* webpackChunkName: "MovieListPage" */ '../views/Movie/MoviePage.vue'),
      props: true
    },
    {
      path: "/:videoId",
      name: "video",
      props: true,
      component: () =>
        import(/*webpackChunkName: "MoviePageVideo"*/ '../views/Movie/MoviePageVideo.vue')
    }
  ]),
  {
    //usahakan letakkan di paling bawah 
    //cara baca route jika telah ditemukan all yaitu * maka yang
    //dibwh tidak di jlnkan lagi * penanda all selain yang ada di route
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// //add authorization
// //using Navigation Guards
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiredAuth) {
//     console.log("Ola")
//     //check token user
//     // console.log(store.state.token)
//     if (!store.state.token) {
//       //need login 
//       alert("You have to login");
//       next({
//         name: "login"
//       })
//     }
//     else {
//       //cek permission
//       // alert("You don't have permission");
//       // next({
//       //   name: "login"
//       // })
//     }
//   } else {
//     next()
//   }
// })

export default router