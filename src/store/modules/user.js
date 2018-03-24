import auth from '@/auth'
import * as types from '../mutation-types'

const state = {
  user: null,
}

const getters = {
  user: state => state.user,
  isLogged: state => (state.user !== null),
}

const actions = {
  addUser ({ commit }) {
    const currentUser = {
      name: auth.user().displayName,
      email: auth.user().email,
      emailVerified: auth.user().emailVerified,
      avatar: auth.user().photoURL,
    }
    commit(types.ADD_USER, currentUser)
  },
}

const mutations = {
  [types.ADD_USER] (state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
