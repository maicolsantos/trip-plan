// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import * as moment from 'moment'
import colors from 'vuetify/es5/util/colors'

import App from './App'
import router from './router'
import store from './store'
import auth from '@/auth'

Vue.config.productionTip = false

const optionsColors = {
  theme: {
    primary: colors.yellow.lighten1,
    secondary: colors.yellow.darken3,
    accent: colors.indigo.base
  }
}

Vue.use(Vuetify, optionsColors, Vuex)
moment.locale(process.env.locale)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    auth.init(this)
  },
  components: { App },
  template: '<App/>'
})
