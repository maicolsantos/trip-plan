import * as types from '../mutation-types'

const state = {
  trip: ['Teste'],
}

const getters = {
  trip: state => state.trip,
}

const actions = {
  addTrip ({ commit, state }, trip) {
    commit(types.ADD_TRIP, trip)
  },
}

const mutations = {
  [types.ADD_TRIP] (state, trip) {
    state.trip = trip
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
