import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'

import Homepage from '@/components/Homepage'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: `${process.env.path}/login`,
      name: 'login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: `${process.env.path}/`,
      name: 'homepage',
      component: Homepage,
      meta: { requireAuth: true },
    },
    { path: '*', redirect: `${process.env.path}/` }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.user()
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  const guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next(`${process.env.path}/login`)
  else if (guestOnly && currentUser) next(`${process.env.path}/`)
  else next()
})

export default router
